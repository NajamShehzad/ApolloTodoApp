exports = module.exports = function (app, mongoose) {

  const { SHA256 } = require('crypto-js');
  const jwt = require("jsonwebtoken");

  const { UserInputError, AuthenticationError, ForbiddenError } = require('apollo-server-express');


  const TasksModel = app.db.models.Tasks;



  const resolvers =
  {

    Query:
    {
      getTasks: async (parent, obj, context) => {
        try {
          let allTasks = await TasksModel.find({});
          console.log("Finded allTasks here ====>>", allTasks);
          return allTasks;
        } catch (err) {
          return Error(err.message)
        }
      }
    },


    Mutation:
    {
      addTask: async (parent, obj, context) => {
        try {
          const task = {
            description: obj.description || '',
            state: obj.state || 'toDo',
          };
          const newTask = new TasksModel(task);
          await newTask.save();
          console.log("Obj to saved ==>", newTask);
          return {
            success: true,
            message: 'Task Added',
          }
        } catch (err) {
          console.log("Code herer ==>", err.message);
          return {
            success: false,
            message: err.message,
          }
        }
      },
      updateTask: async (parent, obj, context) => {
        try {
          console.log("Obj here===>", obj)
          const task = {
            description: obj.description || '',
            state: obj.state || 'toDo',
          };
          const updatedUser = await TasksModel.findOneAndUpdate({ _id: obj._id }, { $set: task }, { new: true });
          if (!updatedUser) {
            return new UserInputError('No user found please check _Id');
          }
          return {
            success: true,
            message: 'Task Updated',
          }
        } catch (err) {
          console.log("Code herer ==>", err.message);
          return {
            success: false,
            message: err.message,
          }
        }
      },
      deleteTask: async (parent, obj, context) => {
        try {
          console.log("Obj here===>", obj)
          const task = {
            description: obj.description || '',
            state: obj.state || 'toDo',
          };
          const updatedUser = await TasksModel.findOneAndDelete({ _id: obj._id });
          if (!updatedUser) {
            return new UserInputError('No user found please check _Id');
          }
          return {
            success: true,
            message: 'Task deleted',
          }
        } catch (err) {
          console.log("Code herer ==>", err.message);
          return {
            success: false,
            message: err.message,
          }
        }
      }
    }
  };


  app.graphql.resolvers.push([resolvers]);





  async function saveTokenInLoginUsers(userObj) {
    return new Promise(async (resolve, reject) => {
      try {

        const token = jwt.sign(
          { userId: userObj._id, email: userObj.email, role: userObj.role },
          app.get('tokenSecret')
        );
        let ObjTosave = {
          user: userObj._id,
          token: token
        };
        console.log("hereeeeee");

        const LoggedInModel = new app.db.models.LoggedInUsers(ObjTosave)
        let savedToken = await LoggedInModel.save();
        resolve(savedToken.token)
      } catch (err) {
        reject(err)
      }
    })
  }


}

