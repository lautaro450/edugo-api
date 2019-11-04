const db = require('../../models');
const Sequelize = require('sequelize');

exports.list = function(req,res) {
    return db.User.findAll()
    .then((users) => res.send(users))
    .catch((err) => {
        console.log('error querying user list', JSON.stringify(err))
        return res.send(err)
    });
}
const Op = Sequelize.Op;
exports.create = function(req,res) {
    const { nickname, password, email, roles } = req.body

    if(nickname == null || password == null || email == null) {
        return res.status(400).send('nickname,password or email are null')
    }

    const users_data = db.User.findAll({
        where: {
            [Op.or]: [{nickname: nickname}, {email: email}]
        }
    });
    if(users_data){
        return res.status(400).send('nickname or email already exists')
    }
    return db.User.create({nickname, password, email, roles})
    .then((user) => res.send(user))
    .catch((err) => {
        console.log('error trying to add new user: ', JSON.stringify(user))
        return res.status(400).send(err)
    })
}