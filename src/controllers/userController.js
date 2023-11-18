import initModels from '../models/init-models.js';
import sequelize from '../models/connect.js';
import { createToken } from '../config/jwt.js';
import bcrypt from 'bcrypt'

const model = initModels(sequelize);

const login = async (req, res) => {
    let {email, pass_word} = req.body;

    let data = await model.users.findOne({
        where: {
            email: email
        }
    })

    if (data){
        let checkPassword = bcrypt.compareSync(pass_word, data.pass_word);
        if (checkPassword) {
            let token = createToken(data);
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

const getAllUser = async (req, res) => {
    let data = await model.users.findAll();

    return res.send(data);
}

export {
    login,
    signUp,
    getAllUser
}