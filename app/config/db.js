const mysql = require("mysql2")
const dotenv = require("dotenv")

dotenv.config()

const conecction = mysql.createConnection({
    host: "3.223.168.254",
  user: "montse",
  password: "vale16",
  database: "WebApp",
})

conecction.connect((err) => {
    if(err) {
        if(err){
        console.error('Error connecting to the database:', err.stack);
        return
        }
        console.log("Connected to the database");
        
    }
})

module.exports = conecction