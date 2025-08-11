//package khanhlandev.bookstore_backend.controller;
//
//import khanhlandev.bookstore_backend.service.BookCategoryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/chat")
//public class BookCategoryController {
//
//    private final BookCategoryService bookCategoryService;
//
//    public BookCategoryController(BookCategoryService bookCategoryService) {
//        this.bookCategoryService = bookCategoryService;
//    }
//
//    @GetMapping("/ask")
//    public ResponseEntity<?> askQuestion(@RequestParam String question){
//        System.out.println("Question: " + question);
//        String res = bookCategoryService.processQuestion(question);
//        return ResponseEntity.ok(res);
//    }
//}
//
