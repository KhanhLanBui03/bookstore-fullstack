package khanhlandev.bookstore_backend.service;

import khanhlandev.bookstore_backend.dao.OrderRepository;
import khanhlandev.bookstore_backend.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
