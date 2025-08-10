package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@RepositoryRestResource(path="order-detail")
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {
    @Query(value = """
        SELECT b.book_name, SUM(od.amount) AS totalSold
        FROM order_detail od
        JOIN book b ON b.book_id = od.book_id
        GROUP BY b.book_id
        ORDER BY totalSold DESC
        LIMIT 5
    """, nativeQuery = true)
    List<Map<String, Object>> getTopBooks();
}
