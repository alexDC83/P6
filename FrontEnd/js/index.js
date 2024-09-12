import { getWorks, getCategories } from "./api.js"
import {
  divGallery, sectionCategories, buttonAll,
  aLogin, banner, header, editModal
} from "./domLinker.js"


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
aLogin.addEventListener('click', () => localStorage.removeItem('token'))

if (localStorage.token) {
  aLogin.innerHTML = 'logout'
  banner.style.display = 'flex'
  header.style.marginTop = '79px'
  sectionCategories.style.display = 'none'
  editModal.style.display = 'inline-flex'
  divGallery.style.marginTop = "100px"
}




getWorks().then(data => createGallery(data))
getCategories().then(data => createCategories(data))

