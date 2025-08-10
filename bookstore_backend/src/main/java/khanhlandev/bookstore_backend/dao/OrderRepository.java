package khanhlandev.bookstore_backend.dao;

import khanhlandev.bookstore_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@RepositoryRestResource(path = "orders")
public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query("SELECT SUM(o.totalPriceProduct) FROM Order o")
    Double getTotalRevenue();

    @Query("SELECT FUNCTION('MONTH', o.creationDate), SUM(o.totalPriceProduct) " +
            "FROM Order o GROUP BY FUNCTION('MONTH', o.creationDate) ORDER BY FUNCTION('MONTH', o.creationDate)")
    List<Object[]> getMonthlyRevenue();

    @Query("SELECT SUM(o.totalPriceProduct) " +
            "FROM Order o " +
            "WHERE FUNCTION('MONTH', o.creationDate) = :month AND FUNCTION('YEAR', o.creationDate) = :year")
    Double getRevenueByMonth(@Param("month") int month, @Param("year") int year);

    @Query("SELECT o.user.userId, o.user.username, SUM(o.totalPriceProduct) AS revenue " +
            "FROM Order o GROUP BY o.user.userId, o.user.username ORDER BY revenue DESC")
    List<Object[]> getTopUserRevenue();

}
