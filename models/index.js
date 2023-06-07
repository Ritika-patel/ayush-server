const Sequelize = require("sequelize")
const config = require("../config/db.config")

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
})

const db = {}
db.sequelize = sequelize

// User table
db.user = require("./user/user.model")(sequelize, Sequelize)

//Detail yable
db.detail = require("./detail/detail.model")(sequelize, Sequelize)

db.detail.belongsTo(db.user, {
  foreignKey: 'user_id',
  targetKey: 'id', // Add this line to specify the target key
});



module.exports = db
