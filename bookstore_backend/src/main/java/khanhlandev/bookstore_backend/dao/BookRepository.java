package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.dto.BookAdminDTO;
import khanhlandev.bookstore_backend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RepositoryRestResource(path = "books")
public interface BookRepository extends JpaRepository<Book, Integer> {

    Page<Book> findByBookNameContaining(@RequestParam("bookName") String bookName, Pageable pageable);
    Page<Book> findByCategories_CategoryId(@RequestParam("categoryId") int categoryId, Pageable pageable);
    Page<Book> findByBookNameContainingAndCategories_CategoryId(@RequestParam("categoryId") int categoryId,
                                                                @RequestParam("bookName") String bookName,
                                                                Pageable pageable);

    @Query("""
    SELECT new khanhlandev.bookstore_backend.dto.BookAdminDTO(
        b.bookId,
        b.bookName,
        b.author,
        c.categoryName,
        b.isbn,
        b.price,
        b.amount,
        (SELECT i.imageData
         FROM Image i
         WHERE i.book = b
         ORDER BY i.imageId ASC
         LIMIT 1),
        CASE
            WHEN b.amount > 10 THEN 'Còn hàng'
            WHEN b.amount > 0 THEN 'Sắp hết'
            ELSE 'Hết hàng'
        END
    )
    FROM Book b
    JOIN b.categories c
""")
    List<BookAdminDTO> findAllBookInfo();


}

