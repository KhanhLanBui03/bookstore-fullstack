package khanhlandev.bookstore_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAdminDTO {
    private int bookId;
    private String bookName;
    private String author;
    private String categoryName;
    private String isbn;
    private Double price;
    private Integer amount;
    private String imageData; // base64 ảnh
    private String status;
}
