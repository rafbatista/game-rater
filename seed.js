const { MongoClient } = require('mongodb')
const gameData = require('./data')

MongoClient.connect('mongodb://localhost/game-rater', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const games = db.collection('games')
  const ratedGames = db.collection('rated-games')
  games
    .deleteMany({})
    .then(() => games.insertMany(gameData))
    .then(() => {
      ratedGames
        .deleteMany({})
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
    .then(() => console.log('Games are seeded!'))
    .then(() => db.close())
})
