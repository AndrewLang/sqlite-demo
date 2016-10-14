var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {

    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'C:/database.sqlite'
});
var User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
    return User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
}).then(function(jane) {
    console.log(jane.get({
        plain: true
    }));
});