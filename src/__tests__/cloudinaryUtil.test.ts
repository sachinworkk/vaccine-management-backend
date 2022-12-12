import fs from "fs";
import path from "path";

import {
  deleteImage,
  getImageCloudinaryId,
  uploadImageToCloudinary,
} from "./../utils/cloudinaryUtil";

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
    const mockImageId = getImageCloudinaryId(
      "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670401870/vaccine-management/vaccines/ztzni27zy8n4bjq1agip.png"
    );

    expect(mockImageId).toBe("ztzni27zy8n4bjq1agip");
  });
  test("delete image from cloudinary", async () => {
    imageId = getImageCloudinaryId(imageURL);

    const deleteImageRes = await deleteImage(imageId, "test");

    expect(deleteImageRes).toBe("ok");
  });
});
