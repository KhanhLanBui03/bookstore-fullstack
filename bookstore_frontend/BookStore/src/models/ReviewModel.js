class ReviewModel{
    reviewId;
    scoreRank;
    comment;
    bookId;
    userId
    constructor(reviewId, scoreRank, comment, bookId, userId){
        this.reviewId = reviewId;
        this.scoreRank = scoreRank;
        this.comment = comment;
        this.bookId = bookId;
        this.userId = userId
    }
}
export default ReviewModel;