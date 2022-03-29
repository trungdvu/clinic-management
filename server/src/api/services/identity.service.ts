import {
  BadRequestError,
  Checker,
  CheckerCollection,
  InternalServerError,
} from "../../shared";
import { SignInDto, SignInResponse, SignUpDto } from "../dtos";
import { IdentityRepository } from "../repositories";
import TokenService from "./token.service";
import { hash } from "bcrypt";
import { GENERATE_SALT } from "../constants";

export class IdentityService {
  constructor(private readonly identityRepository: IdentityRepository) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    try {
      const { email, password } = signInDto;

      const emailCheckResult = Checker.isEmptyStringOrUndefined(email);
      if (!emailCheckResult.succeed) {
        throw new BadRequestError("Email cannot be empty");
      }

      const passwordCheckResult = Checker.isEmptyStringOrUndefined(password);
      if (!passwordCheckResult.succeed) {
        throw new BadRequestError("Password cannot be empty");
      }

      const userModel = await this.identityRepository.findByEmail(email);
      const profileData = userModel.dataValues;

      if (!userModel) {
        throw new BadRequestError("User Not Found!!!");
      }

      const tokenGenerated = await TokenService.createToken({
        email,
      });

      const signInResponse: SignInResponse = {
        accessToken: tokenGenerated,
        profile: {
          ...profileData,
        },
      };

      await this.identityRepository.update(userModel.id, userModel);

      return signInResponse;
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<void> {
    try {
      const {
        email,
        password,
        passwordConfirm,
        firstName,
        username,
        lastName,
        phoneNumber,
      } = signUpDto;

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

      const user = await this.identityRepository.findByEmail(signUpDto.email);
      if (user) {
        throw new BadRequestError("Email has been taken!!!");
      }

      const passwordHashed = await hash(password, GENERATE_SALT);

      const signUpInfo: SignUpDto = {
        ...signUpDto,
        password: passwordHashed,
        username:
          firstName.toLocaleLowerCase() + "_" + lastName.toLocaleLowerCase(),
        phoneNumber: phoneNumber ?? "",
      };

      const res = await this.identityRepository.create(signUpInfo);
      return res;
    } catch (error) {
      throw new InternalServerError(error.message as string);
    }
  }
}
