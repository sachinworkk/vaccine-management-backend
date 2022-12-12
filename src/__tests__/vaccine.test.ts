import request from "supertest";

import app from "../app";

import VaccineModel from "../models/vaccineModel";

import { getMockToken } from "./mockUtils";

import * as cloudinaryUtil from "../utils/cloudinaryUtil";

import { MOCK_VACCINE, MOCK_VACCINES } from "./mockData";

let token = getMockToken();

const getVaccine = (id: number) =>
  MOCK_VACCINES.find((vaccine) => vaccine.id === id);

describe("get vaccine test", () => {
  test("get all vaccine", async () => {
    const mockGetAllVaccines = jest.fn((): any => MOCK_VACCINES);

    jest
      .spyOn(VaccineModel, "getAllVaccines")
      .mockImplementation(() => mockGetAllVaccines());

    const res = await request(app)
      .get("/vaccine")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("vaccines");
  });

  test("get vaccine", async () => {
    const mockGetVaccine = jest.fn((id: number): any => getVaccine(id));

    jest
      .spyOn(VaccineModel, "getVaccineById")
      .mockImplementation((id) => mockGetVaccine(parseInt(id, 10)));

    const res = await request(app)
      .get("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.body).toHaveProperty("vaccine");
    expect(res.status).toBe(200);
  });
});

describe("create vaccine test", () => {
  test("create vaccine with image url", async () => {
    const mockCreateVaccine = jest.fn((): any => MOCK_VACCINE);

    jest
      .spyOn(VaccineModel, "createVaccine")
      .mockImplementation(() => mockCreateVaccine());

    const res = await request(app)
      .post("/vaccine")
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_VACCINE);

    expect(res.body).toHaveProperty("vaccine");
    expect(res.status).toBe(200);
  });
});

describe("update vaccine test", () => {
  test("update vaccine with image url", async () => {
    const mockUpdateVaccine = jest.fn((): any => MOCK_VACCINE);

    jest
      .spyOn(VaccineModel, "updateVaccine")
      .mockImplementation(() => mockUpdateVaccine());

    const res = await request(app)
      .put("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .send(MOCK_VACCINE);

    expect(res.body).toHaveProperty("vaccine");
    expect(res.status).toBe(200);
  });
});

describe("delete vaccine test", () => {
  test("delete vaccine", async () => {
    const mockDeleteVaccine = jest.fn((id): any => true);

    const mockDeleteImage = jest.fn((): any => true);

    const mockGetVaccine = jest.fn((id: number): any => getVaccine(id));

    jest
      .spyOn(VaccineModel, "getVaccineById")
      .mockImplementation((id) => mockGetVaccine(parseInt(id, 10)));

    jest
      .spyOn(VaccineModel, "deleteVaccine")
      .mockImplementation((id) => mockDeleteVaccine(id));

    jest
      .spyOn(cloudinaryUtil, "deleteImage")
      .mockImplementation(() => mockDeleteImage());

    const res = await request(app)
      .delete("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.body).toHaveProperty("message");
    expect(res.status).toBe(200);
  });
});
