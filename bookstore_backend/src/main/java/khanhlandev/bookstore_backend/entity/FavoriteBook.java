package khanhlandev.bookstore_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "favorite_book")
public class FavoriteBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favorite_book_id")
    private int favoriteBookId;
    @ManyToOne(cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    @JoinColumn(name="user_id",nullable = false)
    private User user;
    @ManyToOne(cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    @JoinColumn(name="book_id",nullable = false)
    private Book book;
}
