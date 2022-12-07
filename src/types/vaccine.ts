export interface Vaccine {
  id: number;
  name: string;
  stage: string;
  createdBy?: number;
  updatedBy?: number;
  description: string;
  numberOfDoses: number;
  isMandatory: boolean;
  file?: Express.Multer.File;
  vaccineImageUrl?: string;
}

export type VaccinePayload = Omit<Vaccine, "id">;
