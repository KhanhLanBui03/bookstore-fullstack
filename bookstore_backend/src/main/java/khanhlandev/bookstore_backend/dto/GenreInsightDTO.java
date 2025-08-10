package khanhlandev.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GenreInsightDTO {
    private String categoryName;
    private Long totalBooks;
}
