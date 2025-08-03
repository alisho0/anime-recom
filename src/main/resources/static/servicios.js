
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
  // Botones
  const celdaOpciones = document.createElement("td");
  const divOpciones = document.createElement("div");
  const btn1 = document.createElement("button");
  const btn2 = document.createElement("button");
  btn2.id = "btn2";
  const img1 = document.createElement("img");
  const img2 = document.createElement("img");
  img1.src = "cerrar.svg";
  img2.src = "cerrar.svg";
  btn1.appendChild(img1);
  btn2.appendChild(img2);
  btn1.classList.add("btn", "btn-outline-secondary", "btn1");
  btn2.classList.add("btn", "btn-outline-secondary", "btn2");
  divOpciones.appendChild(btn1);
  divOpciones.appendChild(btn2);
  divOpciones.classList.add("d-flex", "justify-content-center", "btn-group", "align-items-center")
  celdaOpciones.appendChild(divOpciones);

  celdaTitulo.textContent = favorito;

  const celdaImg = document.createElement("td");
  const imgFila = document.createElement("img");
  imgFila.src = "star-fill.svg";
  imgFila.alt = "Portada anime";
  imgFila.style.width = "1.3rem";
  celdaImg.appendChild(imgFila);

  fila.appendChild(celdaImg);
  fila.appendChild(celdaTitulo);
  fila.appendChild(celdaOpciones);
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
  // Botones
    const celdaOpciones = document.createElement("td");
    const divOpciones = document.createElement("div");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const img1 = document.createElement("img");
    const img2 = document.createElement("img");
    img1.src = "cerrar.svg";
    img2.src = "cerrar.svg";
    btn1.appendChild(img1);
    btn2.appendChild(img2);
    btn1.classList.add("btn", "btn-outline-secondary", "btn1");
    btn2.classList.add("btn", "btn-outline-secondary", "btn2");
    divOpciones.appendChild(btn1);
    divOpciones.appendChild(btn2);
    divOpciones.classList.add("d-flex", "justify-content-center", "btn-group", "align-items-center")
    celdaOpciones.appendChild(divOpciones);
    fila.className = "tabla-fila";
    const celdaImg = document.createElement("td");
    celdaImg.classList.add("text-center")
    const imgFila = document.createElement("img");
    imgFila.src = fav.img;
    imgFila.alt = "Portada anime";
    imgFila.style.width = "1.3rem";
    celdaImg.appendChild(imgFila);
    const celdaTitulo = document.createElement("td");
    celdaTitulo.textContent = fav.titulo;
    fila.appendChild(celdaImg);
    fila.appendChild(celdaTitulo);
    fila.appendChild(celdaOpciones);
    listaFavoritos.appendChild(fila);
  });
});

const crearElementos = () => {

}

document.getElementById("generar-reco").addEventListener("click", () => {
  let arrayFavoritos = [];
  const tablaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  tablaFavoritos.forEach(fav => {
    arrayFavoritos.push(fav.titulo);
  });
  
  fetch("/generarRecomendaciones", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(arrayFavoritos)
  })
    .then(response => response.json())
    .then(data => {
      let recomendaciones = [];
      data.forEach(item => {
        const nodes = item.data.Media.recommendations.nodes;
        nodes.forEach(node => {
          recomendaciones.push(node.mediaRecommendation);
        });
      });
      // Mostrar recomendaciones en cards Bootstrap
      let contenedor = document.getElementById("reco-container");
      if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "reco-container";
        contenedor.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 my-4";
        document.querySelector(".container").appendChild(contenedor);
      }
      contenedor.innerHTML = "";
      recomendaciones.forEach(anime => {
        const card = document.createElement("div");
        card.className = "col";
        card.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}" style="object-fit:cover; height: 250px;">
            <div class="card-body">
              <h5 class="card-title">${anime.title.romaji}</h5>
              <p class="card-text mb-1"><b>Score:</b> ${anime.averageScore || '-'} | <b>Episodios:</b> ${anime.episodes || '-'}</p>
              <p class="card-text mb-1"><b>Temporada:</b> ${anime.season || '-'} ${anime.seasonYear || ''}</p>
              <div class="mb-1">
                ${(anime.genres || []).map(g => `<span class='badge bg-secondary me-1'>${g}</span>`).join(' ')}
              </div>
            </div>
          </div>
        `;
        contenedor.appendChild(card);
      });
    });
})

document.getElementById("table-body").addEventListener("click", function(e) {
  // Si el click fue en un botón con clase btn2 o en su imagen hija
  const btn = e.target.closest(".btn2");
  if (btn) {
    const fila = btn.closest("tr");
    if (fila) {
      // Elimina de la tabla
      fila.remove();
      // Elimina también de localStorage
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const titulo = fila.querySelector("td:nth-child(2)").innerText;
      favoritos = favoritos.filter(fav => fav.titulo !== titulo);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }
});