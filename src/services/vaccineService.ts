import VaccineModel from "../models/VaccineModel";

import { VaccinePayload } from "./../domain/Vaccine";

export const createVaccine = async (vaccinePayload: VaccinePayload) => {
  const createdVaccine = await VaccineModel.createVaccine(vaccinePayload);

  return {
    data: createdVaccine,
    message: "Vaccine created successfully",
  };
};

export const updateVaccine = async (
  vaccinePayload: VaccinePayload,
  vaccineId: string
) => {
  const updatedVaccine = await VaccineModel.updateVaccine(
    vaccinePayload,
    vaccineId
  );

  return {
    data: updatedVaccine,
    message: "Vaccine updated successfully",
  };
};

export const deleteVaccine = async (vaccineId: string) => {
  return await VaccineModel.deleteVaccine(vaccineId);
};
