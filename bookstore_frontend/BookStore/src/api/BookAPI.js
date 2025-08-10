import BookModel from "../models/BookModel";
import { Request } from "./Request";

// Hàm dùng chung để gọi API và xử lý dữ liệu
async function getBook(endPoint) {
    try {
        const booksData = await Request(endPoint);
        const responseData = booksData._embedded.books;

        const books = responseData.map(book => new BookModel(
            book.bookId,
            book.bookName,
            book.author,
            book.isbn,
            book.description,
            book.originalPrice,
            book.price,
            book.amount,
            book.avgRank
        ));

        const tongSoTrang = booksData.page.totalPages;
        const tongSoSach = booksData.page.totalElements;

        return {
            ketQua: books,
            tongSoTrang: tongSoTrang,
            tongSoSach: tongSoSach
        };
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
        return {
            ketQua: [],
            tongSoTrang: 0,
            tongSoSach: 0
        };
    }
}

// Lấy toàn bộ sách với phân trang
export async function getAllBook(page = 0, size = 8) {
    const endPoint = `http://localhost:8080/books?sort=bookId,desc&page=${page}&size=${size}`;
    return getBook(endPoint);
}

// Lấy đúng 8 sách đầu tiên
export async function getEightBook() {
    const endPoint = `http://localhost:8080/books?sort=bookId,desc&page=0&size=8`;
    return getBook(endPoint);
}

// Lấy đúng 3 hoặc 4 sách mới nhất
export async function getFourNewBook() {
    const endPoint = `http://localhost:8080/books?sort=bookId,desc&page=0&size=4`;
    return getBook(endPoint);
}

export async function searchBook(keySearch, categoryId) {
    let endPoint = `http://localhost:8080/books?sort=bookId,desc&size=8&page=0`;
    if (keySearch !== '' && categoryId == 0) {
        endPoint = `http://localhost:8080/books/search/findByBookNameContaining?sort=bookId,desc&size=8&page=0&bookName=${keySearch}`
    } else if (keySearch === '' && categoryId > 0) {
        endPoint = `http://localhost:8080/books/search/findByCategories_CategoryId?sort=bookId,desc&size=8&page=0&categoryId=${categoryId}`
    } else if (keySearch !== '' && categoryId > 0) {
        endPoint = `http://localhost:8080/books/search/findByBookNameContainingAndCategories_CategoryId?sort=bookId,desc&size=8&page=0&categoryId=${categoryId}&bookName=${keySearch}`
    }
    return getBook(endPoint);
}
export async function getBookByBookId(bookId) {
    const endPoint = `http://localhost:8080/books/${bookId}`;
    try {
        const bookData = await Request(endPoint);

        const book = new BookModel(
            bookData.bookId,
            bookData.bookName,
            bookData.author,
            bookData.isbn,
            bookData.description,
            bookData.originalPrice,
            bookData.price,
            bookData.amount,
            bookData.avgRank
        );

        return book;
    } catch (error) {
        console.error("Lỗi khi lấy sách theo ID:", error);
        return null;
    }
}


