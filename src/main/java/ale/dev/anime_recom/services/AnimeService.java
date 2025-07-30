package ale.dev.anime_recom.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import ale.dev.anime_recom.models.AnimeRecoDTO;
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

    public List<AnimeRecoDTO> recomendarAnimes(List<String> favoritos) throws Exception {
        try {
            String query = """
                    query($search: String) {
                        Media(search: $search, type: ANIME) {
                            recommendations(perPage: 3) {
                                nodes {
                                    mediaRecommendation {
                                        id
                                        title {
                                            romaji
                                        }
                                        episodes
                                        genres
                                        season
                                        seasonYear
                                        averageScore
                                        coverImage {
                                            large
                                        }
                                    }
                                }
                            }
                        }
                    }
                    """;
            List<AnimeRecoDTO> recomendaciones = new ArrayList<>();
            for (String anime : favoritos) {
                Map<String, Object> variables = Map.of("search", anime);
                Map<String, Object> request = Map.of(
                    "query", query,
                    "variables", variables
                );
                
                AnimeRecoDTO recos = webClient.post()
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(AnimeRecoDTO.class)
                    .block();
                recomendaciones.add(recos);
            }
            return recomendaciones;
        } catch (Exception e) {
            throw new Exception("Error en el service");
        }
    }
}
