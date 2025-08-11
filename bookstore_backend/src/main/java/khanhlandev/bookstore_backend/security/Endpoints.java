package khanhlandev.bookstore_backend.security;

public class Endpoints {
    public static final String front_end_host = "http://localhost:5173";
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/books",
            "/books/**",
            "/images",
            "/images/**",
            "/user/search/existsByUsername",
            "/user/search/existsByEmail",
            "/account/activate",
            "/chat/ask"

    };
    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/account/register",
            "/account/login",

    };
    public static final String[] ADMIN_GET_ENDPOINTS = {
            "/user",
            "/user/**",
            "/admin/dashboard",
            "/admin/management-book",
            "/admin/orders"
    };
    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/admin/addBook",


    };

}
