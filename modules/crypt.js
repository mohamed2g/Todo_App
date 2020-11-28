const secret= require ("../localenv").TOKEN_SECRET;
const user = require("./user.js");
const crypto = require('crypto');



const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

function encrypt (user){
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
    let encrypted = cipher.update(JSON.stringify(body));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let ivString = iv.toString("hex");
    let encryptedDataString = encrypted.toString('hex');

    let finalCipher = {"cipher":`${ivString}.${encryptedDataString}`};
    
    return finalCipher;
}

function decrypt (cipher, user) {
    const splitCipher = token.authToken.split(".");
    let tIV = splitCipher[0];
    let tEncryptedData = splitCipher[1];
    let iv = Buffer.from(tIV, 'hex');
        let encryptedCipher = Buffer.from(tEncryptedData, 'hex');
        let decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret), iv);
        let decrypted = decipher.update(encryptedCipher);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        let cipherText = decrypted.toString();
        return cipherText;
}




module.exports = {

    encrypt,
    decrypt

};