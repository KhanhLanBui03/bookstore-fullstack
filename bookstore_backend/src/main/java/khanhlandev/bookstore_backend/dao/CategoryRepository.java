package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@RepositoryRestResource(path = "categories")
public interface CategoryRepository extends JpaRepository<Category,Integer> {
    @Query("SELECT c.categoryName, COUNT(b.bookId) AS cnt " +
            "FROM Category c JOIN c.books b " +
            "GROUP BY c.categoryName " +
            "ORDER BY cnt DESC")
    List<Object[]> getGenrePopularity();
}
