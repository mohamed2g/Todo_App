const pg = require('pg');
const dbcredentials = process.env.DATABASE_URL || require('../localenv').DATABASE_URL;

class DataHandler {
    constructor(credentials) {
        this.credentials = {
            connectionString: credentials, //credentials er stringen fra Heroku som inneholder brukernavn og passord
            ssl: {
                rejectUnauthorized: false //legges til for at vi kan jobbe lokalt 
            }
        };
    }
    
    


    async getPassword(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select password from "public"."users" where username = $1;', [username]);
            //results = results.rows[0].message;
            return results.rows[0];  
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        } 
    }

    async checkUser(username) {
        const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('select * from "public"."users" where username = $1;', [username]);
            //results = results.rows[0].message;
            return results.rows.length !== 0; 
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }
    }

    async insertUser(username, password) {
        let userExists = await this.checkUser(username);
        console.log(userExists); 
        if (userExists) {
            console.log(1);
            return false; 
            
        }else{
            console.log(2); 
            const client = new pg.Client(this.credentials);
        let results = null;
        try {
            await client.connect();
            results = await client.query('INSERT INTO "public"."users" ("username", "password") VALUES($1, $2) RETURNING *;', [username, password]);
            //results = results.rows[0].message;
            client.end();
        } catch (err) {
            client.end();
            console.log(err);
            results = err;
        }

        return results;
        }
        
    }

}

module.exports = new DataHandler(dbcredentials); 