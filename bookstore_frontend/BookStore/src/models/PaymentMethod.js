class PaymentMethod{
    paymentMethodId;
    paymentMethodName;
    description;
    paymentPrice;

    constructor(paymentMethodId, paymentMethodName,description, paymentPrice){
        this.paymentMethodId = paymentMethodId;
        this.paymentMethodName = paymentMethodName;
        this.description = description;
        this.paymentPrice = paymentPrice
    }
}