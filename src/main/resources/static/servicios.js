
if (!localStorage.getItem("favoritos")) {
  localStorage.setItem("favoritos", JSON.stringify([]));
}

document.getElementById("busquedaAnime").addEventListener("input", function () {
  const query = this.value;

  if (query.length > 2) {
    fetch("/buscar-anime?nombre=" + encodeURIComponent(query))
      .then((res) => res.json())
      .then((data) => {
        const lista = document.getElementById("sugerencias");
        lista.innerHTML = "";
        (data.data.Page.media || []).forEach((anime) => {
          const item = document.createElement("li");
          item.textContent = anime.title.romaji;
          item.classList.add("list-group-item", "sugerencia-hover");
          item.onclick = () => {
            document.getElementById("busquedaAnime").value = anime.title.romaji;
            lista.innerHTML = "";
          };
          lista.appendChild(item);
        });
      });
  }
});
document.getElementById("fav").addEventListener("click", () => {
  const listaFavoritos = document.getElementById("table-body");
  // Texto del anime actual
  let favorito = document.getElementById("titulo-anime").innerText;
  let existe = false;

  for (let fila of listaFavoritos.rows) {
    console.log(fila.cells[1].innerHTML);
    if (fila.cells[1] && fila.cells[1].innerHTML == favorito) {
      existe = true;
      break;
    }
  }
  if (existe) {
    alert("Ya existe");
    return;
  }
  // Creo los elementos de la tabla, fila y fila
  const fila = document.createElement("tr");
  fila.className = "tabla-fila";

  // Creación de los parrafos e img
  const celdaTitulo = document.createElement("td");
  celdaTitulo.textContent = favorito;

  const celdaImg = document.createElement("td");
  const imgFila = document.createElement("img");
  imgFila.src = "star-fill.svg";
  imgFila.alt = "Portada anime";
  imgFila.style.width = "1.3rem";
  celdaImg.appendChild(imgFila);

  fila.appendChild(celdaImg);
  fila.appendChild(celdaTitulo);

  listaFavoritos.appendChild(fila);

  // Guardar en localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.push({
    titulo: favorito,
    img: "star-fill.svg"
  });
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
});

window.addEventListener("DOMContentLoaded", () => {
  const listaFavoritos = document.getElementById("table-body");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.forEach(fav => {
    const fila = document.createElement("tr");
    fila.className = "tabla-fila";
    const celdaImg = document.createElement("td");
    const imgFila = document.createElement("img");
    imgFila.src = fav.img;
    imgFila.alt = "Portada anime";
    imgFila.style.width = "1.3rem";
    celdaImg.appendChild(imgFila);
    const celdaTitulo = document.createElement("td");
    celdaTitulo.textContent = fav.titulo;
    fila.appendChild(celdaImg);
    fila.appendChild(celdaTitulo);
    listaFavoritos.appendChild(fila);
  });
});
