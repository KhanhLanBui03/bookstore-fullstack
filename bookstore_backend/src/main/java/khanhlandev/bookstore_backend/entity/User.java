package khanhlandev.bookstore_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;
@Entity
@Data
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name="avatar",columnDefinition = "LONGTEXT")
    @Lob
    private String avatar ;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
    @Column(name="sex")
    private String sex;
    @Column(name="email")
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name="activated")
    private boolean activated;
    @Column(name = "activate_id")
    private String activateId;
    @Column(name = "purchase_address")
    private String purchaseAddress;
    @Column(name = "delivery_address")
    private String deliveryAddress;

    @ManyToMany(fetch = FetchType.EAGER,cascade = {
            CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH
    })
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id")
    )
    private List<Role> roles;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    private List<Review> reviews;
    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    private List<FavoriteBook> favoriteBooks;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY,cascade = {
            CascadeType.PERSIST,CascadeType.MERGE,
            CascadeType.DETACH,CascadeType.REFRESH
    })
    private List<Order> orders;

}
