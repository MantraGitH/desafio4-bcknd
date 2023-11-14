addEventListener("DOMContentLoaded", () => {
  const socket = io();

  socket.on("newProduct", (product) => {
    console.log("Nuevo producto agregado en tiempo real:", product.title);
      const productTitle = document.createElement("h3");
      productTitle.textContent = product.title;
      document.body.appendChild(productTitle);
  });
});