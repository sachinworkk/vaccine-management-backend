import sharp from "sharp";
import request from "supertest";
import streamifier from "streamifier";

import path from "path";

import app from "../app";

import VaccineModel from "../models/vaccineModel";

import { getMockToken } from "./mockUtils";

import cloudinary from "../configs/cloudinary";

import * as cloudinaryUtil from "../utils/cloudinaryUtil";

import { MOCK_VACCINE, MOCK_VACCINES } from "./mockData";
import { IMAGE_RES, IMAGE_UPLOAD_FOLDERS } from "../constants/constants";

let token = getMockToken();

const getVaccine = (id: number) =>
  MOCK_VACCINES.find((vaccine) => vaccine.id === id);

const mockImageUpload = jest.fn(async (file, folder) => {
  const resizedImageBuffer = await sharp(file?.buffer)
    .resize({
      width: IMAGE_RES.WIDTH,
      height: IMAGE_RES.HEIGHT,
    })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${IMAGE_UPLOAD_FOLDERS.ROOT}/test` },
      (error, result) => {
        if (error) reject(error);
        resolve(result?.secure_url || "");
      }
    );

    streamifier.createReadStream(resizedImageBuffer).pipe(stream);
  });
});

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
  test("create vaccine with file image", async () => {
    const { vaccineImageUrl, ...mockVaccineWithoutImageURL } = MOCK_VACCINE;

    const mockCreateVaccine = jest.fn((): any => MOCK_VACCINE);

    jest
      .spyOn(VaccineModel, "createVaccine")
      .mockImplementation(() => mockCreateVaccine());

    jest
      .spyOn(cloudinaryUtil, "uploadImageToCloudinary")
      .mockImplementation((file, folder) => mockImageUpload(file, folder));

    const testImage = path.resolve(__dirname, "./image/test.jpg");

    const res = await request(app)
      .post("/vaccine")
      .set("Authorization", `Bearer ${token}`)
      .field("name", mockVaccineWithoutImageURL.name)
      .field("stage", mockVaccineWithoutImageURL.stage)
      .field("description", mockVaccineWithoutImageURL.description)
      .field("isMandatory", mockVaccineWithoutImageURL.isMandatory)
      .field("numberOfDoses", mockVaccineWithoutImageURL.numberOfDoses)
      .attach("vaccineImage", testImage);

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
  test("update vaccine with file image", async () => {
    const { vaccineImageUrl, ...mockVaccineWithoutImageURL } = MOCK_VACCINE;

    const mockUpdateVaccine = jest.fn((): any => MOCK_VACCINE);

    jest
      .spyOn(VaccineModel, "updateVaccine")
      .mockImplementation(() => mockUpdateVaccine());

    jest
      .spyOn(cloudinaryUtil, "uploadImageToCloudinary")
      .mockImplementation((file, folder) => mockImageUpload(file, folder));

    const testImage = path.resolve(__dirname, "./image/test.jpg");

    const res = await request(app)
      .put("/vaccine/14")
      .set("Authorization", `Bearer ${token}`)
      .field("name", mockVaccineWithoutImageURL.name)
      .field("stage", mockVaccineWithoutImageURL.stage)
      .field("description", mockVaccineWithoutImageURL.description)
      .field("isMandatory", mockVaccineWithoutImageURL.isMandatory)
      .field("numberOfDoses", mockVaccineWithoutImageURL.numberOfDoses)
      .attach("vaccineImage", testImage);

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
