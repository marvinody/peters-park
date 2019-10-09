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
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-cat.png'
  }
})

const Toy = db.define('toy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

const ToyLikeness = db.define('toyLikeness', {
  rating: {
    // 1 - 5
    type: Sequelize.INTEGER,
    defaultValue: 3
  }
})

// many to many friends
// many to many toy thing

module.exports = {
  db, Cat
}
