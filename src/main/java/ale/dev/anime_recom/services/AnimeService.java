package ale.dev.anime_recom.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import ale.dev.anime_recom.models.AnimeRespuestaDTO;
import ale.dev.anime_recom.models.AnimeSugerenciaDTO;

@Service
public class AnimeService {

    @Autowired
    WebClient webClient;

    public AnimeRespuestaDTO buscarAnime(String busqueda) {
        String query = """
                query($search: String) {
                    Media(search: $search, type: ANIME) {
                        id,
                        title {
                            romaji
                        },
                        season,
                        seasonYear,
                        genres,
                        episodes,
                        coverImage {
                            large
                        }
                    }
                }
                """;
        Map<String, Object> variables = Map.of("search", busqueda);
        Map<String, Object> request = Map.of(
            "query", query,
            "variables", variables
            );
        return webClient.post()
        .bodyValue(request)
        .retrieve()
        .bodyToMono(AnimeRespuestaDTO.class)
        .block();
    }

    public AnimeSugerenciaDTO buscarSugerencias(String busqueda) {
        String query = """
                query($search: String) {
                    Page(perPage: 5) {
                        media(search: $search, type: ANIME) {
                            id,
                            title {
                                romaji
                            },
                            coverImage {
                                medium
                            }
                        }
                    }
                }
                """;

        Map<String, Object> variables = Map.of("search", busqueda);
        Map<String, Object> request = Map.of(
            "query", query,
            "variables", variables
        );

        return webClient.post()
            .bodyValue(request)
            .retrieve()
            .bodyToMono(AnimeSugerenciaDTO.class)
            .block();
    }
}
