exports = module.exports = function (app) {
  app.set("mongodb-url", "mongodb://najamshehzadmlab:najamshehzad1598753@ds233198.mlab.com:33198/todoapp"); // Local
  app.set("tokenSecret", "someSecretWords");// Online
  app.set("passwordSalt", "passwordSalt");// Online
  app.set("port",process.env.PORT|| 4002)
}