const Sequelize = require('sequelize')

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/peters-park',
  {
    logging: false
  }
)

const Cat = db.define('cat', {
  name: {
    type: Sequelize.STRING,
  }
})

module.exports = {
  db, Cat
}
