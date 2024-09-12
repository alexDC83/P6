import { login } from "./api.js";

const form = document.querySelector("#form-login");
console.log(form);
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const loginData = {
    email,
    password,
  };

  const result = login(loginData).then((response) => {
    console.log("réponse : ", response);

    if (!response.token) {
      return response.message;
    }

    if (response.token) {
      // localStorage.setItem('token', result.token);
      // window.location.href = '/'; // Redirection après login
    }
  });
});
