package khanhlandev.bookstore_backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
    private String bookName;
    private String author;
    private String isbn;
    private String description;
    private double originalPrice;
    private double price;
    private int amount;
    private Double avgRank;
}
