import fs from "fs";
import path from "path";

import { getImageId } from "../utils/fileUtil";
import { FileHandlerService } from "../services/fileHandlerService";

import { MOCK_VACCINE } from "./mockData";

let imageId: string;
let imageURL: string;

describe("file util tests", () => {
  test("upload image to cloudinary", async () => {
    const file = fs.readFileSync(path.join(__dirname, "./image/test.jpg"));

    imageURL = (await FileHandlerService.uploadFile(file, "test")) as string;

    expect(imageURL).toMatch(
      new RegExp("[a-zA-Z]+://([a-zA-Z]+(.[a-zA-Z]+)+)")
    );
  });
  test("get image id", () => {
    const mockImageId = getImageId(MOCK_VACCINE.vaccineImageUrl);

    expect(mockImageId).toBe("nf4ozigrmryzn7ji4u6c");
  });
  test("delete image from cloudinary", async () => {
    imageId = getImageId(imageURL);

    const deleteImageRes = await FileHandlerService.deleteFile(imageId, "test");

    expect(deleteImageRes).toBe("ok");
  });
  test("delete invalid image from cloudinary", async () => {
    imageId = getImageId(MOCK_VACCINE.vaccineImageUrl);

    const deleteImageRes = await FileHandlerService.deleteFile(imageId, "test");

    expect(deleteImageRes).toBe("not found");
  });
});
