const pg = require('pg');
const dbcredentials = process.env.DATABASE_URL || require('../localenv').DATABASE_URL;

class DataHandler {
    constructor(credentials) {
        this.credentials = {
            connectionString: credentials, 
            ssl: {
                rejectUnauthorized: false 
            }
        };
    }
    
    


    async getPassword(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select password from "public"."users" where username = $1;', [username]);
           
            return results.rows[0];  
            client.end();
        } catch (err) {
            client.end();
            
            results = err;
        } 
    }

    async checkUser(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select * from "public"."users" where username = $1;', [username]);
          
            return results.rows.length !== 0; 
            client.end();
        } catch (err) {
            client.end();
            
            results = err;
        }
    }

    async insertUser(username, password) {
        let userExists = await this.checkUser(username);
        
        if (userExists) {
            
            return false; 
            
        }else{
             
            const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users" ("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
            client.end();
        } catch (err) {
            client.end();
        
            results = err;
        }

        return results;
        }
        
    }

    async addItem(data) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('insert into "public"."todo-list" (id, "task") values (default, $1) returning id', [data.task]);
            client.end();
            return results.rows[0].id;
        } catch (err) {
            client.end();
            results = err;
        }
    }

    async deleteItem(id) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('delete from "public"."todo-list" where id=$1', [id]);
            client.end();
            return results;
        } catch (err) {
            client.end();
            results = err;
        }
    }

}

module.exports = new DataHandler(dbcredentials); 