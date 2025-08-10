package khanhlandev.bookstore_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "image")
public class Image {
    @Id
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int imageId;
    @Column(name = "image_name")
    private String imageName;
    @Column(name="icon")
    private boolean icon;
    @Column(name="link")
    private String link;
    @Column(name="image_data",columnDefinition = "LONGTEXT")
    @Lob
    private String imageData;
    @ManyToOne(cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    @JoinColumn(name="book_id",nullable = false)
    private Book book;
}
