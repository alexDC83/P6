import { getWorks, getCategories, deleteWork, postWork } from "./api.js";
import {
  divGallery,
  sectionCategories,
  buttonAll,
  aLogin,
  banner,
  header,
  editModal,
  modal,
  modalBtnClose,
  modalGallery,
  btnAddPicture,
  formAddPicture,
  btnArrowBack,
  titleModal,
  fileUpload,
  preview,
  labelFileUpload,
  spanFileUpload,
  selectCategory,
  formAddWork,
  inputTitle,
  submitFormAddPicture
} from "./domLinker.js";
import { validateForm, validateFile, validateCategory, validateTitle } from "./utils.js";

const createGallery = (data) => {
  divGallery.innerHTML = "";
  modalGallery.innerHTML = "";

  data.forEach((item) => {
    const figure = document.createElement("figure");
    const figureModal = document.createElement("figure");

    const img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.title;

    const imgModal = document.createElement("img");
    imgModal.src = item.imageUrl;
    imgModal.alt = item.title;

    const garbageIcon = document.createElement("img");
    garbageIcon.src = "./assets/icons/garbage.png";
    garbageIcon.alt = "garbage icon";
    garbageIcon.setAttribute("class", "icon garbage-icon");
    garbageIcon.addEventListener("click", () => {
      console.log("On a cliqué sur la poubelle avec l'id : ", item.id);
      deleteWork(item.id)
        .then(() => getWorks())
        .then((data) => createGallery(data));
    });

    figureModal.appendChild(imgModal);
    figureModal.appendChild(garbageIcon);
    modalGallery.appendChild(figureModal);

    const figCaption = document.createElement("figcaption");
    figCaption.innerHTML = item.title;

    figure.appendChild(img);
    figure.appendChild(figCaption);

    divGallery.appendChild(figure);
  });
};

const resetClassButton = () =>
  document.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("selected");
  });

const createCategories = (data) => {
  data.forEach((item) => {
    const button = document.createElement("button");
    button.innerHTML = item.name;

    button.addEventListener("click", () => {
      resetClassButton();

      button.classList.add("selected");

      getWorks().then((works) => {
        const dataFiltered = works.filter(
          (element) => item.id === element.categoryId
        );
        createGallery(dataFiltered);
      });
    });

    sectionCategories.appendChild(button);
  });
};

const createSelectCategories = (data) => {
  data.forEach((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item.id);
    option.innerHTML = item.name;

    selectCategory.appendChild(option);
  });
};

buttonAll.addEventListener("click", () => {
  resetClassButton();

  buttonAll.classList.add("selected");
  getWorks().then((data) => createGallery(data));
});

aLogin.addEventListener("click", () => localStorage.removeItem("token"));

if (localStorage.token) {
  aLogin.innerHTML = "logout";
  banner.style.display = "flex";
  header.style.marginTop = "79px";
  sectionCategories.style.display = "none";
  editModal.style.display = "inline-flex";
  divGallery.style.marginTop = "100px";
}

// On créé l'événement pour ouvrir la modal quand on clique sur le bouton 'Mode édition'
editModal.addEventListener("click", () => {
  modal.style.display = "block";
  document.addEventListener('click', dismissModal, true)
});

modalBtnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

// https://techstacker.com/close-modal-click-outside-vanilla-javascript/
const dismissModal = event => {
  if (event.target === modalBtnClose || !event.target.closest('.modal-main')) {
    modal.style.display = 'none'
    document.removeEventListener('click', dismissModal, true)
  }
}

getWorks().then((data) => createGallery(data));
getCategories().then((data) => {
  createCategories(data);
  createSelectCategories(data);
});

/**** Modal ajouter une photo ****/

btnAddPicture.addEventListener("click", () => {
  modalGallery.style.display = "none";
  btnAddPicture.style.display = "none";
  formAddPicture.style.display = "block";
  btnArrowBack.style.display = "flex";
  titleModal.innerHTML = "Ajout photo";

  // on affiche la preview d'origine du formulaire
  labelFileUpload.style.display = 'flex'
  spanFileUpload.style.display = 'flex'
  preview.src = "./assets/icons/picture.png"
  preview.style.height = '58px'
  preview.style.width = '58px'
  fileUpload.value = ''
  submitFormAddPicture.classList.add('disabled')

  formAddWork.reset()
});

btnArrowBack.addEventListener("click", () => {
  modalGallery.style.display = "grid";
  btnAddPicture.style.display = "block";
  formAddPicture.style.display = "none";
  btnArrowBack.style.display = "none";
  titleModal.innerHTML = "Galerie photo";
});

fileUpload.addEventListener("change", () => {

  if (validateFile()) {
    const file = fileUpload.files[0];
    labelFileUpload.style.display = "none";
    spanFileUpload.style.display = "none"


    preview.src = URL.createObjectURL(file);
    preview.style.height = "auto";
    preview.style.width = "auto";
  } else {
    fileUpload.value = ''
  }

});

// check formulaire valide
fileUpload.addEventListener("change", validateForm);
inputTitle.addEventListener("input", validateForm);
selectCategory.addEventListener("change", validateForm);

formAddWork.addEventListener("submit", (event) => {
  event.preventDefault(); // pour éviter de recharger la page

  if (validateFile() && validateTitle() && validateCategory()) {
    const file = fileUpload.files[0];

    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", inputTitle.value);
    formData.append("category", selectCategory.value);

    postWork(formData)
      .then(() => {
        modal.style.display = "none";
        return getWorks();
      })
      .then((data) => createGallery(data))
      .finally(() => formAddWork.reset())
  }

});
