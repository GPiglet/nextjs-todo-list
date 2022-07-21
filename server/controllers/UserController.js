const env = require('dotenv');

var users = [
	{
		id: Date.now(),
		username: 'Illia Sarafyn',
		email: 's.illia@gmail.com',
		address: 'express street in Node',
	},

	{
		id: Date.now()+1,
		username: 'smartdev',
		email: 'smartdev@gmail.com',
		address: 'asp.net street in CSharpe',
	}
]
exports.getList = (req, res, next) => {
	res.send(users);
};

exports.getOne = (req, res, next) => {
	res.send(users.find(user=>user.id==req.params.id));
};

exports.createOne = (req, res, next) => {
	let newUser = {...req.body};
	if ( newUser.id )
	{
		let index = users.findIndex(user=>user.id==newUser.id);
		users[index] = newUser;
	}
	else
	{
		newUser.id = Date.now();
		users.push(newUser);
	}
	res.send(newUser);
};

exports.delete = (req, res, next) => {
	users = users.filter(user=>req.params.ids.split(',').findIndex(id=>id==user.id)==-1);
	res.send(users);
};



