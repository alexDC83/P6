const submitBtn = document.querySelector("#add");
import { inputTitle, fileUpload, selectCategory } from "./domLinker.js";

const titleError = document.getElementById("title-error");
const fileError = document.getElementById("file-error");
const selectError = document.getElementById("select-error");

const validateTitle = () => {
  const titleValid = inputTitle.value.trim().length >= 2;
  titleError.style.display = titleValid ? "none" : "block";
  return titleValid;
};

const validateCategory = () => {
  const categoryValid = selectCategory.value !== "";
  selectError.style.display = categoryValid ? "none" : "block";
  return categoryValid;
};

const validateFile = () => {
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
    submitBtn.classList.remove("disabled");
  } else {
    submitBtn.classList.add("disabled");
  }
};
