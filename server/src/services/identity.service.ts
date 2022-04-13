import {
  BadRequestError,
  Checker,
  CheckerCollection,
  ErrorHandler,
  InternalServerError,
  NotFoundError,
} from "../shared";
import { SignInDto, SignInResponse, SignUpDto, UserResponse } from "../dtos";
import { IdentityRepository } from "../repositories";
import { hash } from "bcrypt";
import { GENERATE_SALT } from "../constants";
import { AccessToken } from "../dtos/token/access-token";
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

      const userModel = await IdentityRepository.findByEmail(email);
      if (!userModel) {
        throw new BadRequestError("User Not Found!!!");
      }

      const profileData = userModel.dataValues;

      const isPasswordMatched = await comparePassword(
        password,
        profileData.password
      );
      if (!isPasswordMatched) {
        throw new BadRequestError("Incorrect Password!!");
      }

      const tokenGenerated = await TokenService.createToken({
        userId: profileData.id,
        email,
      } as AccessToken);

      const signInResponse: SignInResponse = {
        accessToken: tokenGenerated,
        profile: {
          id: profileData.id,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          username: profileData.username,
          phoneNumber: profileData.phoneNumber,
        } as UserResponse,
      };

      await IdentityRepository.update(profileData.id, userModel);

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
        throw new NotFoundError("Email has been taken!!!");
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

      const result = await IdentityRepository.create(signUpInfo);
      return result;
    } catch (error) {
      ErrorHandler(error);
    }
  }

  static async isValidToken(token: string): Promise<boolean> {
    try {
      const { email } = await TokenService.decode(token);
      const user = await IdentityRepository.findByEmail(email);
      if (user) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }
}
