import { isValidImage } from "./../utils/fileUtil";

describe("file util tests", () => {
  test("is valid image", () => {
    const isValid = isValidImage("image/jpeg");

    expect(isValid).toBe(true);
  });
});
