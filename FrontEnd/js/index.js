async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error getWorks() :", error);
    displayError();
  }
}

function displayError() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  const div = document.createElement("div");
  div.textContent = "Erreur: On a pas réussi à récupérer les travaux";

  gallery.style.display = "flex";
  gallery.style.alignItems = "center";
  gallery.style.justifyContent = "center";

  gallery.appendChild(div);
}

// data = résultat de getWorks()
/*
 [
  {
    "id": 1,
    "title": "Abajour Tahina",
    "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
    "categoryId": 1,
    "userId": 1,
    "category": {
      "id": 1,
      "name": "Objets"
    }
  };
 ]
*/
/*
	<figure>
	    <img src="assets/images/appartement-paris-x.png" alt="Appartement Paris X">
		<figcaption>Appartement Paris X</figcaption>
	</figure>
*/
function generateGallery(data) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  for (const element of data) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = element.imageUrl;
    img.alt = element.title;
    figcaption.textContent = element.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    gallery.appendChild(figure);
  }
}

// Fonction pour initialiser et connecter avec le backend.
async function initializeGallery() {
  const works = await getWorks();
  if (works) {
    generateGallery(works);
  }
}

initializegGallery();
