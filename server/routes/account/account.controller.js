const { AccountSF } = require('../../sf/account.sf');

class AccountController {
    constructor() {
        this.accountSF = new AccountSF();
    }

    async getAccountByName(req, res) {
        await this.accountSF.getByName(req.params.name)
            .then(data => res.send(data))
            .catch(err => res.send(err));
    };
}

module.exports = { AccountController };