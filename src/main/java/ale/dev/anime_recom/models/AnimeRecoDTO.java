package ale.dev.anime_recom.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import ale.dev.anime_recom.models.AnimeRespuestaDTO.Title;
import lombok.Data;

@Data
public class AnimeRecoDTO {

    private DataField data;

    @Data
    public static class DataField {
        @JsonProperty("Media")
        private Media media;
    }

    @Data
    public static class Recommendations {
        @JsonProperty("nodes")
        private List<NodeReco> nodes;
    }
    @Data
    public static class NodeReco {
        @JsonProperty("mediaRecommendation")
        private MediaReco mediaReco;
    }

    @Data
    public static class MediaReco {
        private Long id;
        private Title title;
        private Long episodes;
        private List<String> genres;
        private String season;
        private Long seasonYear;
        private Long avergareScore;
        private CoverImage coverImage; 
    }

    @Data
    public static class CoverImage {
        private String medium;
    }

    @Data
    public static class Media {
        @JsonProperty("recommendations")
        private Recommendations recommendations;
    }
}
