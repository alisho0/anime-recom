package ale.dev.anime_recom.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AnimeRespuestaDTO {
    
    // data tiene la estructura principal
    private DataField data; 

    // DataField tiene dentro el media
    @Data
    public static class DataField {
        @JsonProperty("Media")
        private Media media;
    }

    // Aqui en titulo
    @Data
    public static class Title {
        String romaji;
    }

    @Data
    public static class CoverImg {
        String large;
    }
    // Dentro del media todos los demas atributos
    @Data
    public static class Media {
        private Long id;
        private Title title;
        private String season;
        private Long seasonYear;
        private List<String> genres; 
        private Long episodes;
        private CoverImg coverImage;
    }
}
