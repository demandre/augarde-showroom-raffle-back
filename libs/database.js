'use strict';

const mysql = require('mysql2/promise');
const Tunnel = require('tunnel-ssh');

class Database {
    constructor() {
        return this.connect();
    }

    connect() {
        return new Promise( resolve => {
            let tunnelPort = 33000 + Math.floor(Math.random() * 1000);

            Tunnel({
                //First connect to this server over ssh
                host: process.env.SSH_TUNNEL_HOST,
                username: process.env.SSH_TUNNEL_USER,
                password: process.env.SSH_TUNNEL_PASSWORD,

                //And forward the inner dstPort (on which mysql is running) to the host (where your app is running) with a random port
                dstPort: 3306,
                localPort: tunnelPort
            }, (err) => {
                if (err) throw err;
                console.log('SSH tunnel connected');

                mysql.createConnection({
                    //Now that the tunnel is running, it is forwarding our above "dstPort" to localhost/tunnelPort and we connect to our mysql instance.
                    host: process.env.DB_HOST,
                    port: tunnelPort,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME
                }).then((connection) => {
                    resolve(connection);
                    console.log('Mysql connected as id ' + connection.threadId);
                });
            });
        })
    }
}

module.exports = Database;
