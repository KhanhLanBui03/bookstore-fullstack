class Order{
    orderId;
    creationDate;
    purchaseAddress;
    deliveryAddress;
    totalPrice;
    paymentStatus;
    totalPriceProduct;
    constructor(orderId,creationDate,purchaseAddress,deliveryAddress,totalPrice,paymentStatus,totalPriceProduct){
        this.orderId = orderId;
        this.creationDate = creationDate;
        this.purchaseAddress = purchaseAddress;
        this.deliveryAddress = deliveryAddress;
        this.totalPrice = totalPrice;
        this.paymentStatus = paymentStatus;
        this.totalPriceProduct = totalPriceProduct
    }
}