const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
    host:process.env.JAWSDB_HOST,
    user:process.env.JAWSDB_USER,
    password:process.env.JAWSDB_PASSWORD,
    database:process.env.JAWSDB_DB_NAME
});


connection.connect((err)=>{
    if(err){
        console.log("Error"+err);
    }else{
        console.log("Connected Successfully")
    }
});


module.exports  = connection;