        document.getElementById("busquedaAnime").addEventListener("input", function() {
            const query = this.value;

            if(query.length > 2) {
                fetch("/buscar-anime?nombre=" + encodeURIComponent(query))
                    .then(res => res.json())
                    .then(data => {
                        const lista = document.getElementById("sugerencias");
                        lista.innerHTML = "";
                        (data.data.Page.media || []).forEach(anime => {
                            const item = document.createElement("li");
                            item.textContent = anime.title.romaji;
                            item.classList.add("list-group-item", "sugerencia-hover");
                            item.onclick = () => {
                              document.getElementById("busquedaAnime").value = anime.title.romaji;
                              lista.innerHTML = "";
                            }
                            lista.appendChild(item);
                        });
                    });
            }
        })
        document.getElementById("fav").addEventListener("click", () => {
          const listaFavoritos = document.getElementById("table-body");
          const fila = document.createElement("tr");
          const dato = document.createElement("td");
          let favorito = document.getElementById("titulo-anime").innerText;
          console.log(favorito);
        });
