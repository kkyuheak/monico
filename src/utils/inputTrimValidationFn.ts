export const inputTrimValidationFn = (value: string | File[]) => {
  if (typeof value === "string") {
    return value.trim().length > 0 || "공백만 입력할 수 없습니다.";
  }
};
