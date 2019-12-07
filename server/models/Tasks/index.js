exports = module.exports = function (app, mongoose) {

  let Schema = mongoose.Schema;
  let SchemaTypes = mongoose.SchemaTypes;
  TasksSchema = new Schema({
    description: {
      type: String,
      required: true
    },
    state:{
      type: String,
      required:true
    }
  });

  app.db.model('Tasks', TasksSchema);
}