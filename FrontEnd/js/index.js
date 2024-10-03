import { getWorks, getCategories, deleteWork } from "./api.js";
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
} from "./domLinker.js";

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

editModal.addEventListener("click", () => {
  modal.style.display = "block";
});

modalBtnClose.addEventListener("click", () => {
  modal.style.display = "none";
});

getWorks().then((data) => createGallery(data));
getCategories().then((data) => createCategories(data));

/**** Modal ajouter une photo ****/

btnAddPicture.addEventListener("click", () => {
  modalGallery.style.display = "none";
  btnAddPicture.style.display = "none";
  formAddPicture.style.display = "block";
  btnArrowBack.style.display = "flex";
});

btnArrowBack.addEventListener("click", () => {
  modalGallery.style.display = "grid";
  btnAddPicture.style.display = "block";
  formAddPicture.style.display = "none";
  btnArrowBack.style.display = "none";
});
