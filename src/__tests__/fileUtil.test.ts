import { isValidImage, getImageCloudinaryId } from "./../utils/fileUtil";

describe("file util tests", () => {
  test("get image id", () => {
    const id = getImageCloudinaryId(
      "https://res.cloudinary.com/dr8t3y3cp/image/upload/v1670401870/vaccine-management/vaccines/ztzni27zy8n4bjq1agip.png"
    );

    expect(id).toBe("ztzni27zy8n4bjq1agip");
  });

  test("is valid image", () => {
    const isValid = isValidImage("image/jpg");

    expect(isValid).toBe(true);
  });
});
