class BookModel {
    bookId;
    bookName;
    author;
    isbn;
    description;
    originalPrice;
    price;
    amount;
    avgRank
    constructor(bookId, bookName, author, isbn, description, originalPrice, price, amount, avgRank) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
        this.originalPrice = originalPrice;
        this.price = price;
        this.amount = amount;
        this.avgRank = avgRank
    }
}
export default BookModel;