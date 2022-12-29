import mongoose from 'mongoose';

var url = "mongodb://localhost:27017/e-auction";
mongoose.connect(url);

export let dbConnection = async function(){
  console.log('Database Created!');
  return await mongoose.connection;
}
/* MongoClient.connect(url, async function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  dbConnection = await db;
  
}); */