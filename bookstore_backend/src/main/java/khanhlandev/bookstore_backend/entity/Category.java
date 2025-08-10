package khanhlandev.bookstore_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "category_name", length = 255)
    private String categoryName;

    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Book> books;
}
