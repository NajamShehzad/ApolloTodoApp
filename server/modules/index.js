exports = module.exports = function (app, mongoose) {

  //All Schemas Here 
  // require('./user/graphqlSchema')(app, mongoose);
  require('./task/graphqlSchema')(app, mongoose);


  //All Resolvers Here
  // require('./user/resolvers')(app, mongoose);
  require('./task/resolvers')(app, mongoose);

};
