const Task = require('../../db/index');


module.exports.createNewTasks = (req, res) => {
  const task = new Task(req.body);
	if (req.body.hasOwnProperty('text')&&
			req.body.hasOwnProperty('isCheck')
	){
		task.save().then(result =>{
			Task.find().then((result) => {
				res.send({
					data: result,
				});
			});
		});
	}
	else{
			res.status(402).send('error in post');
	}
}

module.exports.changeTaskInfo = (req, res) => {
	if (req.body.hasOwnProperty('text')&&
			req.body.hasOwnProperty('isCheck')&&
			req.body.hasOwnProperty('_id')
	){
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
	else{
		res.status(402).send('error in patch');
}
}

module.exports.deleteTask = (req, res) => {
	if (req.query.id){
		Task.deleteOne({_id: req.query.id}).then(result =>{
			Task.find().then((result) => {
				res.send({
					data: result,
				});
			});
		});
	}
	else {
		res.status(402).send('error in delete');
	}
}


module.exports.getAllTasks = (req, res) => {
  	Task.find().then((result) => {
    	res.send({
      	data: result,
    	});
  	});
}
