package ale.dev.anime_recom.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import ale.dev.anime_recom.models.AnimeRecoDTO;
import ale.dev.anime_recom.models.AnimeRespuestaDTO;
import ale.dev.anime_recom.models.AnimeSugerenciaDTO;
import ale.dev.anime_recom.services.AnimeService;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class AnimeController {

    @Autowired
    AnimeService animeService;

    @GetMapping("/buscar")
    public String buscar(String busqueda, Model model) {
        if (busqueda != null && !busqueda.isEmpty()) {
            AnimeRespuestaDTO respuesta = animeService.buscarAnime(busqueda);
            model.addAttribute("respuesta", respuesta);
        }
        return "index";
    }

    @GetMapping("/buscar-anime")
    @ResponseBody
    public AnimeSugerenciaDTO sugerencias(@RequestParam String nombre, Model model) {
        AnimeSugerenciaDTO respuesta = animeService.buscarSugerencias(nombre);

        model.addAttribute("sugerencias", respuesta);
        return respuesta;
    }
    
    @PostMapping("/generarRecomendaciones")
    @ResponseBody
    public List<AnimeRecoDTO> recomendaciones(@RequestBody List<String> favoritos) throws Exception {
        try {
            List<AnimeRecoDTO> recos = animeService.recomendarAnimes(favoritos);
            return recos;
        } catch (Exception e) {
            throw new Exception("Ocurrió algo mal en el conrolador de recomendaciones.");
        }
    }
}
