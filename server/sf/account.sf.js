'use strict';

const { JSForceUtil } = require('./jsforceutil');

class AccountSF {
    constructor() {
        this.jsForceUtil = new JSForceUtil();
    }

    async getByName(name) {
        let query = `select id, name from account where name like '%` + name + `%'`;
        let data = await this.jsForceUtil.executeSOQLQuery(query);

        // let data = await this.jsForceUtil.callApexRest(name);

        // let account2Create = {
        //     "name": "Wingo Ducks",
        //     "phone": "707-555-1234",
        //     "website": "www.wingo.ca.us"
        // };
        // let data = await this.jsForceUtil.callPostApexRest('/testrestservice/', account2Create);

        return data;
    }
}

module.exports = { AccountSF };