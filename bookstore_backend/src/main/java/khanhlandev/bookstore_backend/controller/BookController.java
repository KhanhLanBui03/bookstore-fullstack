package khanhlandev.bookstore_backend.controller;

import khanhlandev.bookstore_backend.dto.BookDTO;
import khanhlandev.bookstore_backend.dto.UserRegisterDTO;
import khanhlandev.bookstore_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins ="*" )
public class BookController {
    @Autowired
    private BookService bookService;

    @PostMapping("/addBook")
    public ResponseEntity<?> createBook(@RequestBody BookDTO bookDTO) {
        return bookService.createBook(bookDTO);
    }
}
