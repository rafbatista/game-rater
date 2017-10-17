const path = require('path')
const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, 'public')))

MongoClient.connect('mongodb://localhost/game-rater', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const games = db.collection('games')

  app.get('/games/all', (req, res) => {
    games
      .find({})
      .toArray()
      .then(games => {
        ratedGames
          .find()
          .toArray()
          .then(ratedGames => {
            for (let i = 0; i < games.length; i++) {
              for (let j = 0; j < ratedGames.length; j++) {
                if (games[i].id === ratedGames[j].id) {
                  games[i].rating = ratedGames[j].rating
                }
              }
            }
            res.json(games)
          })
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.use(bodyParser.json())

  const ratedGames = db.collection('rated-games')

  app.post('/games/all', (req, res) => {
    ratedGames
      .insertOne(req.body)
      .then(() => {
        res.sendStatus(201)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.listen(3000, () => console.log('Test at http://localhost:3000'))
})
