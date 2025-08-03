
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

// Añadir elementos a la lista
document.getElementById("fav").addEventListener("click", () => {
  const listaFavoritos = document.getElementById("lista_fav");
  // console.log(listaFavoritos)
  // Texto del anime actual
  let favorito = document.getElementById("titulo-anime").innerText;
  let año = document.getElementById("año-anime").innerText;
  let generos = document.getElementById("generos-anime");
  let score = document.getElementById("score-anime").innerText;
  let arrayGenero = [];

  // Va guardando cada genero del listado
  [...generos.children].forEach(genero => {
    if (genero.innerText != "Géneros:") {
      arrayGenero.push(genero.innerText);
    }
  })
  
  let existe = false;

  [...listaFavoritos.children].forEach(anime => {
    const titulo = anime.querySelector("h6");
    if(titulo.innerText == favorito) {
      existe = true;
    }
  })
  if (existe) {
    alert("Ya existe");
    return;
  }

    const item = document.createElement("li");
    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "border-secondary", "border", "rounded", "p-3");
    item.innerHTML = `
      <div>
        <h6><b>${favorito}</b></h6>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>${año}</span>
          <div class="d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
            </svg>
            <span style="color: green;" >${score}</span>
          </div>
        </div>
        <div>
          ${(arrayGenero || []).map(genero => `<span class="badge bg-secondary me-1">${genero}</span>`).join('')}
        </div>
      </div>
      <button class="btn btn2 btn-danger">Quitar</button>
    `;
    listaFavoritos.appendChild(item);

  // Guardar en localStorage
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.push({
    titulo: favorito,
    año: año,
    arrayGenero: arrayGenero,
    score: score
  });
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
});
/*
window.addEventListener("DOMContentLoaded", () => {
  const listaFavoritos = document.getElementById("lista_fav");
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
*/
window.addEventListener("DOMContentLoaded", () => {
  const listaFavoritos = document.getElementById("lista_fav");
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos.forEach(fav => {
    console.log(fav);
    const item = document.createElement("li");
    item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center", "border-secondary", "border", "rounded", "p-3");
    item.innerHTML = `
      <div>
        <h6><b>${fav.titulo}</b></h6>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span>${fav.año}</span>
          <div class="d-flex align-items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
            </svg>
            <span style="color: green;" >${fav.score}</span>
          </div>
        </div>
        <div>
          ${(fav.arrayGenero || []).map(genero => `<span class="badge bg-secondary me-1">${genero}</span>`).join('')}
        </div>
      </div>
      <button class="btn btn2 btn-danger">Quitar</button>
    `;
    listaFavoritos.appendChild(item);
  });
});

document.getElementById("generar-reco").addEventListener("click", () => {
  let arrayFavoritos = [];
  const tablaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  tablaFavoritos.forEach(fav => {
    arrayFavoritos.push(fav.titulo);
  });
  if (arrayFavoritos.length == 0) {
    alert("Agrega mínimo un anime a la sección de favoritos para generar recomendaciones");
    return
  }
  
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
          <div class="card h-100 shadow-sm mx-auto text-bg-dark border border-secondary rounded">
            <img src="${anime.coverImage.large}" class="card-img-top" alt="${anime.title.romaji}" style="object-fit:cover; height: 250px;">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <h5 class="card-title"><b>${anime.title.romaji}</b></h5>
                <div class="d-flex align-items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="green" class="bi bi-emoji-smile-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"/>
                  </svg>
                  <span id="score-anime" class="fw-bold text-success" style="font-size: 1.1rem;">${anime.averageScore || '-'}</span>
                </div>
              </div>
              <p class="card-text mb-1"> <b>Episodios:</b> ${anime.episodes || '-'}</p>
              <p class="card-text mb-1"><b>Temporada:</b> ${anime.season || '-'} ${anime.seasonYear || ''}</p>
              <div class="mb-1">
                ${(anime.genres || []).map(genero => `<span class="badge bg-secondary me-1">${genero}</span>`).join('')}
              </div>
            </div>
          </div>
        `;
        contenedor.appendChild(card);
      });
    });
})

document.getElementById("lista_fav").addEventListener("click", function(e) {
  // Si el click fue en un botón con clase btn2 o en su imagen hija
  const btn = e.target.closest(".btn2");
  if (btn) {
    const item = btn.closest("li");
    if (item) {
      // Elimina de la tabla
      item.remove();
      // Elimina también de localStorage
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      const titulo = item.querySelector("h6").innerText;
      favoritos = favoritos.filter(fav => fav.titulo !== titulo);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }
});
