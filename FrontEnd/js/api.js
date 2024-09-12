export const getWorks = () =>
  fetch("http://localhost:5678/api/works").then((res) => res.json());
export const getCategories = () =>
  fetch("http://localhost:5678/api/categories").then((res) => res.json());
export const login = (data) =>
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
