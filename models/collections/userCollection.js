class UserCollection {
    constructor() {
        this.collection = [];
    }

    add(email, token) {
        this.collection.push(email, token);
    }
}

module.exports = UserCollection;