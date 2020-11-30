

const crypto = require('crypto'); 
let secret = process.env.TOKEN_SECRET || require('../localenv').TOKEN_SECRET;


  function checkToken(token){
      let [header, payload, sign] = token.split("."); 

      let newSign = crypto.createHmac('sha256', secret)
      .update(header + "." + payload, "utf-8")
      .digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');     

      if(newSign === sign){
          return true; 
      } else  {
          return false; 
      }
  }

  function generateToken(payload) {
    
    let header = {
        "alg": "HS256",
        "typ": "JWT"
      }  

    let data = JSON.stringify(header);
    let buff = Buffer.from(data, "utf-8");
    let base64Header = buff.toString('base64');
    let base64urlHeader = base64Header.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');


    data = JSON.stringify(payload);
    buff = Buffer.from(data, "utf-8");
    base64Payload = buff.toString('base64')
    let base64urlPayload = base64Payload.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  

    let sign = crypto.createHmac('sha256', secret)
                        .update(base64urlHeader + "." + base64urlPayload, "utf-8")
                        .digest('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');     

   let token = base64urlHeader + "." + base64urlPayload + "." + sign; 

   return token;

  }

  function getPayload(token){
      
      let payloadString = token.split(".")[1];
      let buff = Buffer.from(payloadString, "base64");
      let payload = buff.toString('utf-8');

      return payload;
  }

  

  module.exports = {generateToken, checkToken, getPayload}