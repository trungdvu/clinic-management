import { Request, Response } from "express";
import {
  CreatePatientDto,
  FindAllPatientsQuery,
  PatientResponse,
  UpdatePatientDto,
} from "../dtos";
import { SignUpDto } from "../dtos";
import { PatientService } from "../services";
import { BodyResponse, ErrorHandler } from "../../shared";
import { PatientRepository } from "../repositories";

const patientService = new PatientService(new PatientRepository());

export const findPatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query: FindAllPatientsQuery = req.query;
    const response: PatientResponse[] = await patientService.findMany(query);

    const bodyResponse: BodyResponse<PatientResponse[]> = {
      message: "Execute Successfully",
      data: response,
      statusCode: 200,
    };

    res.status(200).json(bodyResponse);
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const createPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dto: CreatePatientDto = req.body;
    const response: string = await patientService.create(dto);

    const bodyResponse: BodyResponse<void> = {
      message: "Execute Successfully",
      statusCode: 200,
    };

    res.status(200).json(bodyResponse);
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const dto: UpdatePatientDto = req.body;
    const response: string = await patientService.update(id, dto);

    const bodyResponse: BodyResponse<void> = {
      message: "Execute Successfully",
      statusCode: 200,
    };

    res.status(200).json(bodyResponse);
  } catch (error) {
    ErrorHandler(error, res);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const response: string = await patientService.delete(id);

    const bodyResponse: BodyResponse<void> = {
      message: "Execute Successfully",
      statusCode: 200,
    };

    res.status(200).json(bodyResponse);
  } catch (error) {
    ErrorHandler(error, res);
  }
};
