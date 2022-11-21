// User interface
export interface Vaccine {
  id: number;
  name: string;
  description: string;
  number_of_doses: number;
  is_mandatory: boolean;
  vaccine_image_url?: string;
  stage: string;
}

// User data when creating the user (no id column)
export type VaccinePayload = Omit<Vaccine, "id">;
