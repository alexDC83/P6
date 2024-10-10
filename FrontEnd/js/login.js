import { login } from "./api.js";
import { formLogin, email, password } from "./domLinker.js";

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginData = {
    email: email.value,
    password: password.value,
  };

  login(loginData)
    .then((data) => {
      localStorage.token = data.token;
      window.location.href = "index.html";
    })
    .catch((error) => alert(error));
});
