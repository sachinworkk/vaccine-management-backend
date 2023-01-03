import request from "supertest";

import app from "../app";

import VaccineModel from "../models/vaccineModel";

import { getMockToken } from "./mockUtils";

import { MOCK_VACCINE, MOCK_VACCINES } from "./mockData";

import { FileHandlerService } from "../services/fileHandlerService";

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
  test("create vaccine with invalid data", async () => {
    const mockCreateVaccine = jest.fn((): any => MOCK_VACCINE);

    jest
      .spyOn(VaccineModel, "createVaccine")
      .mockImplementation(() => mockCreateVaccine());

    const res = await request(app)
      .post("/vaccine")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...MOCK_VACCINE,
        name: 123,
        description: 123,
        numberOfDoses: "abcd",
      });

    expect(res.body).toHaveProperty("type", "ValidationError");
    expect(res.status).toBe(400);
  });
  test("create vaccine with image", (done) => {
    const mockCreateVaccine = jest.fn((): any => MOCK_VACCINE);

    const mockImageUpload = jest.fn((): any => MOCK_VACCINE.vaccineImageUrl);

    jest
      .spyOn(VaccineModel, "createVaccine")
      .mockImplementation(() => mockCreateVaccine());

    jest
      .spyOn(FileHandlerService, "uploadFile")
      .mockImplementation(() => mockImageUpload());

    request(app)
      .post("/vaccine")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("name", MOCK_VACCINE.name)
      .field("stage", MOCK_VACCINE.stage)
      .field("description", MOCK_VACCINE.description)
      .field("isMandatory", MOCK_VACCINE.isMandatory)
      .field("numberOfDoses", MOCK_VACCINE.numberOfDoses)
      .attach("vaccineImage", `${__dirname}/image/test.jpg`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("vaccine");
        expect(res.status).toBe(200);

        done();
      });
  });
});

describe("update vaccine test", () => {
  test("update vaccine with invalid data", async () => {
    const mockCreateVaccine = jest.fn((): any => MOCK_VACCINE);

    jest
      .spyOn(VaccineModel, "createVaccine")
      .mockImplementation(() => mockCreateVaccine());

    const res = await request(app)
      .put("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...MOCK_VACCINE,
        name: 123,
        description: 123,
        numberOfDoses: "abcd",
      });

    expect(res.body).toHaveProperty("type", "ValidationError");
    expect(res.status).toBe(400);
  });
  test("update vaccine with existing image", async () => {
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
  test("update vaccine with new image", (done) => {
    const mockUpdateVaccine = jest.fn((): any => MOCK_VACCINE);

    const mockImageUpload = jest.fn((): any => MOCK_VACCINE.vaccineImageUrl);

    jest
      .spyOn(VaccineModel, "updateVaccine")
      .mockImplementation(() => mockUpdateVaccine());

    jest
      .spyOn(FileHandlerService, "uploadFile")
      .mockImplementation(() => mockImageUpload());

    request(app)
      .put("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "multipart/form-data")
      .field("name", MOCK_VACCINE.name)
      .field("stage", MOCK_VACCINE.stage)
      .field("description", MOCK_VACCINE.description)
      .field("isMandatory", MOCK_VACCINE.isMandatory)
      .field("numberOfDoses", MOCK_VACCINE.numberOfDoses)
      .attach("vaccineImage", `${__dirname}/image/test.jpg`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toHaveProperty("vaccine");
        expect(res.status).toBe(200);

        done();
      });
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
      .spyOn(FileHandlerService, "deleteFile")
      .mockImplementation(() => mockDeleteImage());

    const res = await request(app)
      .delete("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.body).toHaveProperty("message");
    expect(res.status).toBe(200);
  });
  test("vaccine not found", async () => {
    const mockGetVaccine = jest.fn((id: number): any => getVaccine(id));

    jest
      .spyOn(VaccineModel, "getVaccineById")
      .mockImplementation((id) => mockGetVaccine(parseInt(id, 100)));

    const res = await request(app)
      .delete("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(res.body).toMatchObject({ details: "Vaccine not found" });
    expect(res.status).toBe(400);
  });
});
