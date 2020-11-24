const pg = require('pg');

class storageHandler {

    constructor(credentials){
        this.credentials = {
            connectionString: credentials,
            ssl: {
                rejectUnauthorized: false
            }
        };
    }

    
    async getUser(username){
        const client = new pg.Client(this.credentials);

        try {
            await client.connect();

            const query = {
                text: 'SELECT * FROM users WHERE username = $1',
                values: [username]
            }

            try {

                let response = await client.query(query);
                client.end();
                return response.rows[0];

            } catch (err){
                console.log(`Failed to retrieve user: ${err}`);
            }

        } catch (err){
            console.log(`Get user connection failed: ${err}`);
        }

    }

    async addUser(username, password){
        const client = new pg.Client(this.credentials);

        try {
            await client.connect();

            //Try to locate user in database
            const query1 = {
                text: 'SELECT * FROM users WHERE username = $1',
                values: [username]
            }

            try{

                let userFound = await client.query(query1);
                if (userFound.rows.length === 0){
                    //User does NOT exist
                    //Add user to database
                    const query2 = {
                        text: 'INSERT INTO users (user_id, username, password) VALUES (DEFAULT, $1, $2);',
                        values: [username, password]
                    }

                    try {

                        let result = await client.query(query2);
                        client.end();
                        return {msg: 'User added.'};

                    } catch (err){
                        console.log(`Add user failed: ${err}`);
                    }


                } else {
                    client.end();
                    return {msg: 'User already exists'}
                }
                

            } catch (err){
                console.log(`Locating user failed: ${err}`);

            }

        } catch(err){
            
            console.log(`User creation, connection error: ${err}`);
        
        }

        
    }

}

module.exports = storageHandler;