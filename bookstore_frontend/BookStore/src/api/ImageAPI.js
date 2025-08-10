import ImageModel from "../models/ImageModel";
import { Request } from "./Request";

async function getImageOfBook(endPoint) {
    try {
        const imagesData = await Request(endPoint);

        const responseData = imagesData._embedded.images;

        const images = responseData.map(image => new ImageModel(
            image.imageId,
            image.imageName,
            image.icon,
            image.link,
            image.imageData
        ));

        return images;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách ảnh:", error);
        return [];
    }
}


export async function getAllImage(bookId) {
    const endPoint = `http://localhost:8080/books/${bookId}/images`;
    return getImageOfBook(endPoint);
}
export async function getImageOfOneBook(bookId){
    const endPoint =  `http://localhost:8080/books/${bookId}/images?sort=imageId,asc&page=0&size=1`;
    return getImageOfBook(endPoint)
}
export async function getAllImagesOfBook(bookId){
    const endPoint=`http://localhost:8080/books/${bookId}/images`;
    return getImageOfBook(endPoint);
}
