

function dinhDangSo(x){
    if(x===undefined){
        return 0;
    }
    if(isNaN(x)){
        return 0;
    }
    // sử dụng hàm toLocaleString de dinh dang so
    return x.toLocaleString("vi-VN");
}
export default dinhDangSo;