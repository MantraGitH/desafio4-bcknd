const socket = io();

let user = null;

const price = document.getElementById("price");
const title = document.getElementById("title");
const description = document.getElementById("description");
const category = document.getElementById("category");
const idProduct = document.getElementById("idProduct");
const btnCargar = document.getElementById("cargar");
const btnEliminar = document.getElementById("eliminar");

socket.on("products", (data) => {
  actions.innerHTML = "";
  const productsRender = data
    .map((products) => {
      return `${products}`;
    })
    .join(" ");
  output.innerHTML = productsRender;
});
