import VaccineModel from "../models/vaccineModel";

import { VaccinePayload } from "../types/vaccine";

import { deleteImage } from "../utils/cloudinaryUtil";

import { STATUS_CODE, IMAGE_UPLOAD_FOLDERS } from "../constants/constants";

/**
 * Get all the vaccines.
 *
 * @returns {Object}
 */
export const getAllVaccines = async () => {
  const allVaccines = await VaccineModel.getAllVaccines();

  return {
    data: allVaccines,
  };
};

/**
 * Create a new vaccine.
 *
 * @param vaccinePayload {Object}
 * @returns {Object}
 */
export const createVaccine = async (vaccinePayload: VaccinePayload) => {
  const createdVaccine = await VaccineModel.createVaccine({
    ...vaccinePayload,
  });

  return {
    data: createdVaccine,
    message: "Vaccine created successfully",
  };
};

/**
 * Update the vaccine.
 *
 * @param vaccinePayload {Object}
 * @param vaccineId {String}
 * @returns {Object}
 */
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

/**
 * Delete the vaccine.
 *
 * @param vaccineId
 * @returns {Object}
 */
export const deleteVaccine = async (vaccineId: string) => {
  const fetchedVaccine = await VaccineModel.getVaccineById(vaccineId);

  await VaccineModel.deleteVaccine(vaccineId);

  if (fetchedVaccine?.vaccine_image_url) {
    await deleteImage(
      fetchedVaccine?.vaccine_image_url,
      IMAGE_UPLOAD_FOLDERS.VACCINE
    );
  }

  return {
    data: "Vaccine deleted successfully",
    status: STATUS_CODE.SUCCESS,
  };
};
