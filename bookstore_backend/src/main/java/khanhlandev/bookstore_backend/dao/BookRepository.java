package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource(path = "books")
public interface BookRepository extends JpaRepository<Book,Integer> {
    Page<Book> findByBookNameContaining(@RequestParam("bookName") String bookName, Pageable pageable);
    Page<Book> findByCategories_CategoryId(@RequestParam("categoryId") int categoryId, Pageable pageable);
    Page<Book> findByBookNameContainingAndCategories_CategoryId( @RequestParam("categoryId") int categoryId, @RequestParam("bookName") String bookName, Pageable pageable);
}
