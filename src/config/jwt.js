import jwt from 'jsonwebtoken';

const createToken = (data) => {
    let token = jwt.sign({data}, "NODE36", {expiresIn: "5m"})

    return token;
}

const checkToken = (token) => {
    return jwt.verify(token, "NODE36");
}

const decodeToken = (token) => {
    return jwt.decode(token, "NODE36")
}

const khoaApi = (req, res, next) =>{
    let {token} = req.headers;
    // bước 1: có token hay chưa
    // bước 2: token có có valid hay ko
    // bước 3: token có có hợp lệ
    if (token){
        // kiểm tra token hợp lệ
        if(checkToken(token)){
            // let decodeToken = decodeToken(token);
            console.log(token)
        } else {
            res.status(401).send("Token không hợp lệ")
        }

        next(); // bypass   
    } else {
        res.send(401).send("không có quyền truy cập")
    }
}

export {
    createToken,
    checkToken,
    decodeToken,
    khoaApi
}
// rule pass_word:
// 1: phải có số, có chữ thường, chữ hoa, có ký tự đặc biệt
// 2: password ko dc quá dễ nhớ: Password123, 1234@Abcd, 12345