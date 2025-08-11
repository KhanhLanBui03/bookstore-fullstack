//package khanhlandev.bookstore_backend.service;
//
//import org.springframework.ai.chat.model.ChatResponse;
//import org.springframework.ai.chat.prompt.Prompt;
//import org.springframework.ai.ollama.OllamaChatModel;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//public class BookCategoryService {
//
//    private final OllamaChatModel ollamaChatModel;
//
//    private final JdbcTemplate jdbc;
//
//    public BookCategoryService(OllamaChatModel ollamaChatModel, JdbcTemplate jdbc) {
//        this.ollamaChatModel = ollamaChatModel;
//        this.jdbc = jdbc;
//    }
//
//    public String processQuestion(String question){
//        String prompt = """
//            You have access to a database with tables:
//            book(book_id, amount, author, avg_rank, book_name, description, isbn, original_price, price)
//            category(category_id, category_name)
//            book_category(book_id, category_id)
//            image(image_id, icon, image_data, image_name, link, book_id)
//
//            Relationships:
//            - book_category.book_id references book.book_id
//            - book_category.category_id references category.category_id
//            - image.book_id references book.book_id
//
//            When the user asks something involving both books, categories, and/or images,
//            you MUST use the proper JOIN:
//            book
//            JOIN book_category ON book.book_id = book_category.book_id
//            JOIN category ON book_category.category_id = category.category_id
//            LEFT JOIN image ON book.book_id = image.book_id
//
//            User question: "%s"
//
//            Return only a valid SQL SELECT query based on the question.
//            DO NOT explain anything, only raw SQL. No markdown, no comments.
//            """.formatted(question);
//
//
//        ChatResponse response = ollamaChatModel.call(new Prompt(prompt));
//        String sql = cleanSql(response.getResult().getOutput().getContent());
//
//        System.out.println("Generated SQL: " + sql);
//
//        if(!sql.trim().toLowerCase().startsWith("select")){
//            throw new IllegalArgumentException("Only SELECT queries are allowed.");
//        }
//
//        // Thực thi SQL và trả kết quả
//        return jdbc.queryForList(sql).toString();
//    }
//
//    private String cleanSql(String raw){
//        return raw.replaceAll("```sql","")
//                .replaceAll("```","")
//                .trim();
//    }
//}
//
