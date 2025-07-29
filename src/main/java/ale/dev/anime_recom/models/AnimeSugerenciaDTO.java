package ale.dev.anime_recom.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import ale.dev.anime_recom.models.AnimeRespuestaDTO.Title;
import lombok.Data;

@Data
public class AnimeSugerenciaDTO {
    
    private DataField data;

    @Data
    public static class DataField {
        @JsonProperty("Page")
        private Page page;
    }

    @Data
    public static class Page {
        private List<Media> media;
    }

    @Data
    public static class CoverImage {
        private String medium;
    }

    @Data
    public static class Media {
        private Long id;
        private Title title;
        private CoverImage coverImg;
    }
}
