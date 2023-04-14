const jsforce = require('jsforce');
const jwt = require('salesforce-jwt-bearer-token-flow');
const path = require('path');

class JSForceUtil {
    async executeSOQLQuery(query) {
        return new Promise(async (resolve, reject) => {
            let conn = await this.getConnection();
            conn.query(query, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    async callGetApexRest(url) {
        return new Promise(async (resolve, reject) => {
            let conn = await this.getConnection();
            conn.apex.get(url, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    async callPostApexRest(url, body) {
        return new Promise(async (resolve, reject) => {
            let conn = await this.getConnection();
            conn.apex.post(url, body, (err, data) => {
                if (err) return reject(err);
                resolve(data);
            });
        });
    }

    getConnection() {
        return new Promise(async (resolve, reject) => {
            let privateKey = require('fs').readFileSync(path.resolve(__dirname, "../cert/server.key"), 'utf8');
            let conn = new jsforce.Connection();
            jwt.getToken({
                iss: process.env.iss,
                sub: process.env.sub,
                aud: process.env.aud,
                privateKey: privateKey
            }, function (err, response) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    conn.initialize({
                        instanceUrl: response.instance_url,
                        accessToken: response.access_token
                    });
                    resolve(conn);
                }
            });
        });
    }
}

module.exports = { JSForceUtil };