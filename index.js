// import {getNumber, getString} from "./home.js";
// // const {getNumber, getString} = require('./home.js')

// console.log(getNumber());
// console.log(getString());

// express
// nodemon
// mysql2

import express from 'express';
import rootRoutes from './src/routes/rootRoutes.js';
import cors from 'cors'

const app = express();

// define middelware

// CORS
// use -> middleware
app.use(express.json())
app.use(cors());

app.use("/api", rootRoutes)

app.listen(8080);

console.log(process)
// http://localhost:8080
// viết API
// browser chỉ support cho method GET
// POST, PUT, DELETE không support

// app.get("/", (req, res)=> {
//     res.send("hello node36");
// });

// app.get("/layDanhSachPhim/:userId/:maPhim", (req, res) => {

//     // http://localhost/layDanhSachPhim/1/2
//     let {userId, maPhim} = req.params // destructuring
//     res.send(`lấy user ${userId}, lấy mã phim ${maPhim}`);
// })

// POST
// để lấy được data từ body của POST, PUT thì phải thêm middleware
// để parse string -> json
// app.use(express.json())
// app.post("/themPhim", (req, res) => {
//     let {maPhim, tenPhim} = req.body;
//     let token = req.headers.token;
//     res.send({maPhim, tenPhim, token}); 
//     // only support object, string, list, ko support number
// })

// http://localhost:8080?userId=1&maPhim=2

import mysql from 'mysql2';

// const conn = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "node36", // tên database có trong tablePlus
//     port: 3307
// })

// app.get("/layDanhSachUsers", async (req, res) => {
//     let sql = "SELECT * FROM users";

//     const listUsers = await conn.promise().query(sql);
//     // async await dùng khi mà mình connect tới server độc lập khác

//     res.send(listUsers[0])
// })

//npx sequelize-auto -h localhost -d node36 -u root -x 1234 -p 3307 --dialect mysql -o src/models -l esm