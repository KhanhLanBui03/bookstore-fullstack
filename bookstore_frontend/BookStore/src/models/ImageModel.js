class ImageModel {
    imageId;
    imageName;
    icon;
    link;
    imageData;
    constructor(imageId, imageName, icon, link, imageData) {
        this.imageId = imageId;
        this.imageName = imageName;
        this.icon = icon;
        this.link = link;
        this.imageData = imageData
    }

}
export default ImageModel;