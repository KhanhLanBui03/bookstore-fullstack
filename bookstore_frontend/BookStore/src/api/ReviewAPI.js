import { Request } from "./Request";
import ReviewModel from '../models/ReviewModel'
async function getReviewOfBook(endPoint) {
    try {
        const response = await Request(endPoint);
        const responseData = response._embedded.reviews;
        const reviews = responseData.map(review => new ReviewModel(
            review.reviewId,
            review.scoreRank,
            review.comment
        ));
        return reviews;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách review:", error);
        return [];
    }
}

export async function getAllReviewOfBook(bookId) {
    const endPoint = `http://localhost:8080/books/${bookId}/reviews`
    return getReviewOfBook(endPoint)

}
export async function getOneReviewOfBook(bookId) {
    const endPoint = `http://localhost:8080/books/${bookId}/reviews?sort=reviewId,asc&page=0&size=1`;
    return getReviewOfBook(endPoint);
    
}