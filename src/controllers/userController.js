import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { createToken, decodeToken } from '../config/jwt.js';
import bcrypt from 'bcrypt'

const model = initModels(sequelize);

const login = async (req, res) => {
    let {email, pass_word} = req.body;

    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (checkEmail){
        let checkPassword = bcrypt.compareSync(pass_word, checkEmail.pass_word);
        if (checkPassword) {
            let token = createToken({data: checkEmail});
            res.send(token);
            return
        } else {
            res.send("Password không đúng")
            return
        }
        
    } else {
        res.status(400).send("Email hoặc password không đúng")
    }

}

// POST, PUT -> body
// GET -> ko có body
const signUp = async (req, res) => {
    let {full_name, email, pass_word} = req.body;
    // kiểm tra email có tồn tại trong database hay chưa
    let data = await model.users.findOne({
        where: {
            email: email
        }
    });
    // nếu chưa -> tạo user
    // mã hóa pass_word
    let hashPassword = bcrypt.hashSync(pass_word, 10)
    // hashSync:
    // param 1: pass_word nhận từ FE, postman
    // params 2: mã hóa password mấy lần
    if (!data) {
        let newData = {
            full_name,
            email,
            pass_word: hashPassword,
            avatar: "",
            face_app_id: "",
            role: "user"
        }

        let result = await model.users.create(newData);
        res.status(201).send("Đăng ký thành công")
        return
    // có rồi -> báo lỗi email đã tồn tại
    } else {
        res.send("Email đã tồn tại")
    }
}

const loginFacebook = async (req, res) => {
    console.log(req.body)
    let {id, email, name} = req.body;

    // kiểm tra email đã tồn tại trong db hay chưa
    let checkEmail = await model.users.findOne({
        where: {
            email: email
        }
    });

    if (!checkEmail) {
        let newData = {
            full_name: name,
            email,
            face_app_id: id,
            avatar: "",
            pass_word: "",
            role: "user"
        }

        await model.users.create(newData)
    }

    let infoUser = await model.users.findOne({
        where: {
            face_app_id: id
        }
    });

    let token = createToken({data: infoUser})
    res.send(token)

}

// sẽ lấy user_id dựa vào token
// không truyền user_id vào params
const updateUser = async(req, res) => {
    let {full_name, email, pass_word} = req.body;
    let {token} = req.headers;

    let decode = decodeToken(token)
    let {user_id} = decode.data.data;
    let infoUser = await model.users.findOne({
        where: {
            user_id: user_id
        }
    })

    let hashPassword = bcrypt.hashSync(pass_word, 10)

    if (infoUser) {
        // speard operator
        let updateData = {
            ...infoUser,
            full_name,
            email,
            pass_word: hashPassword
        }

        await model.users.update(updateData, {
            where: {
                user_id: user_id
            }
        })
        
    } else {
        res.send("Không tồn tại user")
        
    }
    res.send("update thành công");
}

export {
    login,
    signUp,
    loginFacebook,
    updateUser
}