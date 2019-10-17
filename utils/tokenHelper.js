'use strict';
var request = require("request");

class tokenHelper{
    
    verifyToken(req, res){
    var options, verified
    // Configure the request
    options = {
        url: 'http://vps676674.ovh.net/wp-json/jwt-auth/v1/token/validate',
        headers: {
            'Authorization': 'Bearer '+ req.query.token
        },
        method: 'POST' 
    }
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            verified = true
        } 
        else {
            res.statusCode = (401);
            res.send({
                success: false,
                message: "Wrong token", 
                posts: JSON.parse(body)
             });
            
            console.log("debug : " + response.statusCode);
            console.log(res.statusCode);
        }
    });
    };


    getWPToken(req, res){
        var options;
        // Configure the request
        options = {
            url: 'http://vps676674.ovh.net/wp-json/jwt-auth/v1/token?username='+req.query.username+'&password='+req.query.passwd+'',
            method: 'POST' 
        }
    
        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //userCollection = new UserCollection();
                //user_email & token
                let bodyJSON = JSON.parse(body);
                console.log("collection : " + bodyJSON.token);
                userCollection.add(bodyJSON.user_email, bodyJSON.token )
                res.send({
                   success: true,
                   message: "Successfully get the token", 
                   posts: bodyJSON
                });
            } else {
                 console.log(error);
            }
        });
       };
}

module.exports = new tokenHelper();
