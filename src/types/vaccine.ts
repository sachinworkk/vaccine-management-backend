// User interface
export interface Vaccine {
  id: number;
  name: string;
  stage: string;
  createdBy?: number;
  description: string;
  numberOfDoses: number;
  isMandatory: boolean;
  vaccineImageUrl?: string;
}

// User data when creating the user (no id column)
export type VaccinePayload = Omit<Vaccine, "id">;
