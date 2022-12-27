import fs from "fs";
import path from "path";

import {
  deleteImage,
  getImageCloudinaryId,
  uploadImageToCloudinary,
} from "./../utils/cloudinaryUtil";

import { MOCK_VACCINE } from "./mockData";

let imageId: string;
let imageURL: string;

describe("file util tests", () => {
  test("upload image to cloudinary", async () => {
    const file = fs.readFileSync(path.join(__dirname, "./image/test.jpg"));

    imageURL = (await uploadImageToCloudinary(file, "test")) as string;

    expect(imageURL).toMatch(
      new RegExp("[a-zA-Z]+://([a-zA-Z]+(.[a-zA-Z]+)+)")
    );
  });
  test("get image id", () => {
    const mockImageId = getImageCloudinaryId(MOCK_VACCINE.vaccineImageUrl);

    expect(mockImageId).toBe("nf4ozigrmryzn7ji4u6c");
  });
  test("delete image from cloudinary", async () => {
    imageId = getImageCloudinaryId(imageURL);

    const deleteImageRes = await deleteImage(imageId, "test");

    expect(deleteImageRes).toBe("ok");
  });
  test("delete invalid image from cloudinary", async () => {
    imageId = getImageCloudinaryId(MOCK_VACCINE.vaccineImageUrl);

    const deleteImageRes = await deleteImage(imageId, "test");

    expect(deleteImageRes).toBe("not found");
  });
});
