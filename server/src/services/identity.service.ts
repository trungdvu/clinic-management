import { hash } from "bcrypt";
import { GENERATE_SALT } from "../constants";
import { SignInDto, SignInResponse, SignUpDto, UserResponse } from "../dtos";
import { AccessToken } from "../dtos/token/access-token";
import { Identity } from "../models";
import { IdentityRepository } from "../repositories";
import {
  BadRequestError,
  Checker,
  CheckerCollection,
  ErrorHandler,
  NotFoundError,
} from "../shared";
import { comparePassword } from "../utils";
import { TokenService } from "./token.service";

export class IdentityService {
  static async signIn(dto: SignInDto): Promise<SignInResponse> {
    try {
      const { email, password } = dto;

      const emailCheckResult = Checker.isEmptyStringOrUndefined(email);
      if (!emailCheckResult.succeed) {
        throw new BadRequestError("Email cannot be empty");
      }

      const passwordCheckResult = Checker.isEmptyStringOrUndefined(password);
      if (!passwordCheckResult.succeed) {
        throw new BadRequestError("Password cannot be empty");
      }

      const userModel: Identity = await IdentityRepository.findByEmail(email);
      if (!userModel) {
        throw new BadRequestError("User Not Found!!!");
      }

      const isPasswordMatched = await comparePassword(
        password,
        userModel.password
      );
      if (!isPasswordMatched) {
        throw new BadRequestError("Incorrect Password!!");
      }

      const tokenGenerated = await TokenService.createToken({
        userId: userModel.id,
        email,
      } as AccessToken);

      const signInResponse: SignInResponse = {
        accessToken: tokenGenerated,
        profile: {
          id: userModel.id,
          firstName: userModel.firstName,
          lastName: userModel.lastName,
          username: userModel.username,
          phoneNumber: userModel.phoneNumber,
        } as UserResponse,
      };

      await IdentityRepository.update(userModel.id, userModel);

      return signInResponse;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async signUp(dto: SignUpDto): Promise<void> {
    try {
      const {
        email,
        password,
        passwordConfirm,
        firstName,
        username,
        lastName,
        phoneNumber,
      } = dto;

      const checkerCollections: CheckerCollection[] = [
        {
          argument: email,
          argumentName: "Email",
        },
        {
          argument: password,
          argumentName: "Password",
        },
        {
          argument: passwordConfirm,
          argumentName: "Password Confirm",
        },
        {
          argument: firstName,
          argumentName: "First Name",
        },
        {
          argument: lastName,
          argumentName: "Last Name",
        },
        {
          argument: phoneNumber,
          argumentName: "Phone Number",
        },
      ];
      const checkerResult = Checker.isNullOrUndefinedBulk(checkerCollections);
      if (!checkerResult.succeed) {
        throw new BadRequestError(checkerResult.message);
      }

      if (password !== passwordConfirm) {
        throw new BadRequestError("Password not match!!!");
      }

      const user = await IdentityRepository.findByEmail(email);
      if (user) {
        throw new BadRequestError("Email has been taken!!!");
      }

      const passwordHashed = await hash(password, GENERATE_SALT);

      const signUpInfo: SignUpDto = {
        ...dto,
        password: passwordHashed,
        username:
          username ??
          firstName.toLocaleLowerCase() + "_" + lastName.toLocaleLowerCase(),
        phoneNumber: phoneNumber ?? "",
      };

      await IdentityRepository.create(signUpInfo);
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isValidToken(token: string): Promise<boolean> {
    try {
      const { email } = await TokenService.decode(token);
      const user = await IdentityRepository.findByEmail(email);

      return user ? true : false;
    } catch (error) {
      return false;
    }
  }
}
