const alert = document.querySelector(".alert")
const btnCopy = document.getElementById("btnCopy");
const shortUrl = document.getElementById("shortUrl");

btnCopy.addEventListener("click", (event) => {
  navigator.clipboard.writeText(shortUrl.innerHTML);
  alert.classList.remove("d-none")
});
