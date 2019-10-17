let userCollection = [];

module.exports = {
    add: (email, token) => userCollection.push(email, token),
    get: () => userCollection
  }