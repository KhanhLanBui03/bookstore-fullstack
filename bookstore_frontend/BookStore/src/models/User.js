class User{
    userId;
    firstName;
    lastName;
    avatar;
    username;
    password;
    sex;
    phoneNumber;
    activated;
    activatedId;
    purchaseAddress;
    deliveryAddress;
    constructor(userId, firstName, lastName, avatar, username, password, sex, phoneNumber, activated, activatedId, purchaseAddress, deliveryAddress){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.username = username;
        this.password = password;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
        this.activated = activated;
        this.activatedId = activatedId;
        this.purchaseAddress = purchaseAddress;
        this.deliveryAddress = deliveryAddress
    }

}