const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const { Schema } = mongoose;

const taskScheme = new Schema({
  text: String,
  isCheck: Boolean,
});

const uri =
  "mongodb+srv://Nikita:restart987@cluster0.1fkli.mongodb.net/ToDoList?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model("tasks", taskScheme);

app.use(cors());
app.use(express.json());

app.post("/createTask", (req, res) => {
  const task = new Task(req.body);
	try{
		task.save().then(result =>{
			Task.find().then((result) => {
				res.send({
					data: result,
				});
			});
		});
	}
	catch(err){
			console.log(err);
	}
});

app.patch("/updateTask", (req, res) => {
	try{
		Task.updateOne(
			{_id: req.body._id}, req.body).then((result) => {
					Task.find().then((result) => {
						res.send({
							data: result,
						});
					});
			}
		);
	}
	catch(err){
		console.log(err);
	}	
});

app.delete("/deleteTask", (req, res) => {
	try{
		Task.deleteOne({_id: req.query.id}).then(result =>{
			Task.find().then((result) => {
				res.send({
					data: result,
				});
			});
		})
	}
	catch(err){
		console.log(err);
	}	
});


app.get("/getAllTasks", (req, res) => {
  Task.find().then((result) => {
    res.send({
      data: result,
    });
  });
});

app.listen(8000, () => {
  console.log("...port 8000");
});
