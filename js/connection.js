const mysql = require('mysql')

/*Clase para la conexión de la base de datos, conexión usada globalmente.*/
class connectionDB {
    constructor(){
        let connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'momantai',
            database: 'sgpDB'//'sgp'
        })

        connection.connect((err)=>{
            if(err) console.log('¡Error en la conexión!')
        })

        return connection
    }
}

exports.conect = new connectionDB()