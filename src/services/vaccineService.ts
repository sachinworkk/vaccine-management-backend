import VaccineModel from "../models/vaccineModel";

import { VaccinePayload } from "../types/vaccine";

import { AppError } from "./../misc/appError";

import { validateVaccine } from "./../schemas/vaccineSchema";

import { deleteImage, uploadImageToCloudinary } from "../utils/cloudinaryUtil";

import { IMAGE_UPLOAD_FOLDERS } from "../constants/constants";

/**
 * Get all the vaccines.
 *
 * @returns {Object}
 */
export const getAllVaccines = async () => {
  const allVaccines = await VaccineModel.getAllVaccines();

  return {
    vaccines: allVaccines,
  };
};

/**
 * Get the vaccine by id.
 *
 * @returns {Object}
 */
export const getVaccine = async (id: string) => {
  const vaccine = await VaccineModel.getVaccineById(id);

  return {
    vaccine: {
      ...vaccine,
    },
  };
};

/**
 * Create a new vaccine.
 *
 * @param vaccinePayload {Object}
 * @returns {Object}
 */
export const createVaccine = async (vaccinePayload: VaccinePayload) => {
  const { error } = validateVaccine(vaccinePayload);

  if (error) throw error;

  let imageURL = "";

  if (vaccinePayload.file) {
    imageURL = (await uploadImageToCloudinary(
      vaccinePayload?.file,
      IMAGE_UPLOAD_FOLDERS.VACCINE
    )) as string;
  }

  const { file, ...vaccineToSave } = vaccinePayload;

  const createdVaccine = await VaccineModel.createVaccine({
    ...vaccineToSave,
    vaccineImageUrl: imageURL,
  });

  return {
    vaccine: createdVaccine,
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
  const { error } = validateVaccine(vaccinePayload);

  if (error) throw error;

  let imageURL = vaccinePayload?.vaccineImageUrl;

  if (vaccinePayload?.file) {
    imageURL = (await uploadImageToCloudinary(
      vaccinePayload?.file,
      IMAGE_UPLOAD_FOLDERS.VACCINE
    )) as string;
  }

  const { file, ...vaccineToUpdate } = vaccinePayload;

  const updatedVaccine = await VaccineModel.updateVaccine(
    {
      ...vaccineToUpdate,
      vaccineImageUrl: imageURL,
    },
    vaccineId
  );

  return {
    vaccine: updatedVaccine,
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

  if (!fetchedVaccine) throw new AppError(400, "Vaccine not found");

  await VaccineModel.deleteVaccine(vaccineId);

  if (fetchedVaccine?.vaccineImageUrl) {
    await deleteImage(
      fetchedVaccine?.vaccineImageUrl,
      IMAGE_UPLOAD_FOLDERS.VACCINE
    );
  }

  return {
    message: "Vaccine deleted successfully",
  };
};
