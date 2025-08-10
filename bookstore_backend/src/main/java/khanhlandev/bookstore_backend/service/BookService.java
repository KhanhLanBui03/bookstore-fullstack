package khanhlandev.bookstore_backend.service;

import khanhlandev.bookstore_backend.dao.BookRepository;
import khanhlandev.bookstore_backend.dto.BookDTO;
import khanhlandev.bookstore_backend.dto.UserRegisterDTO;
import khanhlandev.bookstore_backend.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
    public ResponseEntity<?> createBook(BookDTO bookDTO){
        Book book = new Book();
        book.setBookName(bookDTO.getBookName());
        book.setAuthor(bookDTO.getAuthor());
        book.setPrice(bookDTO.getPrice());
        book.setOriginalPrice(bookDTO.getOriginalPrice());
        book.setAmount(bookDTO.getAmount());
        book.setDescription(bookDTO.getDescription());
        book.setAvgRank(bookDTO.getAvgRank());
        book.setIsbn(bookDTO.getIsbn());
        bookRepository.save(book);
        return ResponseEntity.ok("Thêm sách thành công!");
    }
}
