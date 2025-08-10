package khanhlandev.bookstore_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
@Entity
@Data
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;
    @Column(name = "creation_date", columnDefinition = "Date")
    private Date creationDate;
    @Column(name = "purchase_address")
    private String purchaseAddress;
    @Column(name = "delivery_address")
    private String deliveryAddress;
    @Column(name = "total_price")
    private double totalPrice;
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @Column(name = "payment_status")
    private String paymentStatus;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    @JoinColumn(name="payment_method_id")
    private PaymentMethod paymentMethod;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    @JoinColumn(name="delivery_method_id")
    private DeliveryMethod deliveryMethod;

    @Column(name="total_price_product")
    private double totalPriceProduct;
}
