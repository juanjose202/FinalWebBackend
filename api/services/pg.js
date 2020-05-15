
//importar Postgres
const {Pool} = require('pg');


/**
 * Clase para la conexion a la base de datos 
 */
class ServicioPG{

    constructor(){
        this.pool = new Pool({
            user: "postgres",
            host: "localhost",
            database: "TallerMotos",
            password: "juanjose123",
            port: 5432
        });
    }

    /**
     * Metodo que ejecuta la sentencia sql que se le pasa por parametro
     * @param {*} sql 
     */
   async ejecutarSQL(sql){
        let respuesta = await this.pool.query(sql)
        return respuesta;
    }

    async ejecutarSQL(sql,valores){
        let respuesta = await this.pool.query(sql,valores)
        return respuesta;
    }
}

module.exports = ServicioPG;