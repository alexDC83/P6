import {
  inputTitle,
  fileUpload,
  selectCategory,
  titleError,
  fileError,
  selectError,
  submitFormAddPicture
} from "./domLinker.js";


export const validateTitle = () => {
  const titleValid = inputTitle.value.trim().length >= 2;
  titleError.style.display = titleValid ? "none" : "block";
  return titleValid;
};

export const validateCategory = () => {
  const categoryValid = selectCategory.value !== "";
  selectError.style.display = categoryValid ? "none" : "block";
  return categoryValid;
};

export const validateFile = () => {
  const file = fileUpload.files[0];
  const fileValid =
    file &&
    ["image/jpeg", "image/png"].includes(file.type) &&
    file.size <= 4 * 1024 * 1024;
  fileError.style.display = fileValid ? "none" : "block";
  return fileValid;
};

export const validateForm = () => {
  const fileValid = validateFile();
  const titleValid = validateTitle();
  const categoryValid = validateCategory();

  // Active ou désactive le bouton submit selon la validation
  if (fileValid && titleValid && categoryValid) {
    submitFormAddPicture.classList.remove("disabled");
  } else {
    submitFormAddPicture.classList.add("disabled");
  }
};
