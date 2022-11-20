import db from "../db/db";

import { VaccinePayload } from "./../domain/Vaccine";

class VaccineModel {
  public static createVaccine = async (vaccine: VaccinePayload) => {
    const newVaccine = await db("vaccines").insert(vaccine, [
      "id",
      "name",
      "description",
      "number_of_doses",
      "is_mandatory",
      "stage",
      "vaccine_image_url",
    ]);

    return newVaccine;
  };

  public static updateVaccine = async (
    updatedVaccineData: VaccinePayload,
    vaccineId: string
  ) => {
    const updatedVaccine = await db("vaccines")
      .where({ id: vaccineId })
      .update(updatedVaccineData, [
        "id",
        "name",
        "description",
        "number_of_doses",
        "is_mandatory",
        "stage",
        "vaccine_image_url",
      ]);

    return updatedVaccine;
  };

  public static getVaccineById = async (vaccineId: string) => {
    const retrievedVaccine: VaccinePayload = await db
      .table("vaccines")
      .select("*")
      .where({ id: vaccineId })
      .first();

    return retrievedVaccine;
  };

  public static deleteVaccine = async (vaccineId: string) => {
    const isVaccineDeleted = await db("vaccines")
      .where({ id: vaccineId })
      .del([]);

    return isVaccineDeleted;
  };
}

export default VaccineModel;
