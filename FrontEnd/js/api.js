export const getWorks = () =>
  fetch("http://localhost:5678/api/works").then((res) => res.json());

export const getCategories = () =>
  fetch("http://localhost:5678/api/categories").then((res) => res.json());

export const login = data =>
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json())
    .then(data => {
      if (!data.token) {
        throw 'Erreur dans l’identifiant ou le mot de passe'
      }
      return data
    })

export const deleteWork = id =>
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`
    }
  })

export const postWork = data =>
  fetch("http://localhost:5678/api/works", {
    method: 'POST',
    headers: { "Authorization": `Bearer ${localStorage.token}` },
    body: data
  }).then((res) => res.json())