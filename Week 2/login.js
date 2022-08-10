"use strict";

const userName = document.querySelector(".loginBox__username");
const passWord = document.querySelector(".loginBox__password");
const buttonLogin = document.querySelector(".loginBox__button");

const emptyPassword = () => {
  passWord.value = "";
};

window.onbeforeunload = emptyPassword;

const login = () => {
  if (userName.value === "john" && passWord.value === "1234") {
    window.location.href = "/dashboard.html";
  } else {
    alert("Invalid access");
  }
};

buttonLogin.addEventListener("click", login);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    login();
  }
});
