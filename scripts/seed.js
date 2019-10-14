const { db, Cat, Toy } = require('../src/server/db')

async function seed() {
  await db.sync({ force: true })
  const [lola, peter, maru, bigglesworth, grumpycat] = await Promise.all(
    [
      { name: 'Lola', imageUrl: '/images/lola.jpg' },
      { name: 'Peter', imageUrl: '/images/peter.jpg' },
      { name: 'Maru', imageUrl: '/images/maru.jpg' },
      { name: 'Mr. Bigglesworth', imageUrl: '/images/mr-bigglesworth.jpg' },
      { name: 'Tardar Sauce', imageUrl: '/images/tardar-sauce.jpg' },
    ].map(c => Cat.create(c))
  )

  const [laser, rat, yarnball] = await Promise.all(
    [
      { name: 'Laser Toy' },
      { name: 'Stuffed Rat Toy' },
      { name: 'Ball of Yarn' }
    ].map(t => Toy.create(t))
  )

  const addToyRating = (cat, toy, rating) => {
    return cat.addToyRating(toy, {
      through: { rating }
    })
  }

  await lola.addFriends([peter, maru, bigglesworth])
  await peter.addFriends([lola, maru, bigglesworth])
  // maru is friends with everyone
  await maru.addFriends([lola, peter, bigglesworth, grumpycat])

  await addToyRating(lola, rat, 5)
  await addToyRating(lola, laser, 1)
  await addToyRating(lola, yarnball, 3)

  await addToyRating(peter, rat, 1)
  await addToyRating(peter, laser, 5)
  await addToyRating(peter, yarnball, 4)

  await addToyRating(bigglesworth, rat, 1)
  await addToyRating(bigglesworth, laser, 5)
  await addToyRating(bigglesworth, yarnball, 1)


}
try {
  seed()
} catch (err) {
  console.err(err)
}
