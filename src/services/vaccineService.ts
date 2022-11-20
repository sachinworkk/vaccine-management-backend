import uploadImage, { deleteImage } from "../utils/imageUtil";
import VaccineModel from "../models/VaccineModel";

import { VaccinePayload } from "./../domain/Vaccine";

export const createVaccine = async (vaccinePayload: VaccinePayload) => {
  let uploadedVaccineImageURL = "";
  if (vaccinePayload?.vaccine_image_url) {
    uploadedVaccineImageURL = await uploadImage(
      vaccinePayload?.vaccine_image_url,
      "vaccines"
    );
  }
  const createdVaccine = await VaccineModel.createVaccine({
    ...vaccinePayload,
    vaccine_image_url: uploadedVaccineImageURL,
  });

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
  const fetchedVaccine = await VaccineModel.getVaccineById(vaccineId);

  await VaccineModel.deleteVaccine(vaccineId);

  if (fetchedVaccine?.vaccine_image_url) {
    await deleteImage(fetchedVaccine?.vaccine_image_url, "vaccines");
  }

  return {
    data: "Vaccine deleted successfully",
    status: 200,
  };
};
