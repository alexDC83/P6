import { getWorks, getCategories } from "./api.js"
import { divGallery, sectionCategories, buttonAll } from "./domLinker.js"


const createGallery = data => {
  divGallery.innerHTML = ''

  data.forEach(item => {
    const figure = document.createElement('figure')

    const img = document.createElement('img')
    img.src = item.imageUrl
    img.alt = item.title

    figure.appendChild(img)

    const figCaption = document.createElement('figcaption')
    figCaption.innerHTML = item.title

    figure.appendChild(figCaption)

    divGallery.appendChild(figure)
  });
}

const createCategories = data => {
  data.forEach(item => {
    const button = document.createElement('button')
    button.innerHTML = item.name

    button.addEventListener('click', () => {

      getWorks().then(works => {
        const dataFiltered = works.filter(element => item.id === element.categoryId)
        createGallery(dataFiltered)
      })

    })

    sectionCategories.appendChild(button)
  })
}

buttonAll.addEventListener('click', () => getWorks().then(data => createGallery(data)))

getWorks().then(data => createGallery(data))
getCategories().then(data => createCategories(data))