const socket = io();

const price = document.getElementById("price");
const output = document.getElementById("output");
const actions = document.getElementById("actions");

socket.on("products", (data) => {
  actions.innerHTML = "";
  const productsRender = data
    .map((products) => {
      return `${products}`;
    })
    .join(" ");
  output.innerHTML = productsRender;
});
