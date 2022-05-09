import { QueryParams } from "../../shared";

export interface FindPatientsQuery extends QueryParams {
    month?: number;
}
