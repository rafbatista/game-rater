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

  app.get('/games/suggested', (req, res) => {
    const gameSuggestions = []
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
              if (games[i].rating > 0) {
                games.splice(i, 1)
              }
              if (gameSuggestions.length > 3) {
                return
              }
              const stats = getGameStats(ratedGames)
              if (stats.avgRatings.action >= 3 && games[i].genre === 'action' && stats.ratingCount.action === 2) {
                gameSuggestions.push(games[i])
                games.splice(i, 1)
              }
              if (stats.avgRatings.fighting >= 3 && games[i].genre === 'fighting' && stats.ratingCount.fighting === 2) {
                gameSuggestions.push(games[i])
                games.splice(i, 1)
              }
              if (stats.avgRatings.shooter >= 3 && games[i].genre === 'shooter' && stats.ratingCount.shooter === 2) {
                gameSuggestions.push(games[i])
                games.splice(i, 1)
              }
              if (stats.avgRatings.action < 3 && games[i].genre === 'action' && stats.ratingCount.action === 2) {
                games.splice(i, 1)
              }
              if (stats.avgRatings.fighting < 3 && games[i].genre === 'fighting' && stats.ratingCount.fighting === 2) {
                games.splice(i, 1)
              }
              if (stats.avgRatings.shooter < 3 && games[i].genre === 'shooter' && stats.ratingCount.shooter === 2) {
                games.splice(i, 1)
              }
            }
            function getRandomIntInclusive(min, max) {
              min = Math.ceil(min)
              max = Math.floor(max)
              return Math.floor(Math.random() * (max - min + 1)) + min
            }
            if (gameSuggestions.length < 3) {
              gameSuggestions.push(games[getRandomIntInclusive(0, games.length)])
            }
            res.json(gameSuggestions)
            gameSuggestions.splice(0)
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

function getAverageRating(ratings, genre) {
  const games = ratings.filter(game => game.genre === genre)
  const sum = games.reduce((sum, game) => {
    return sum + game.rating
  }, 0)
  return games.length ? sum / games.length : 0
}

function getGenreCount(ratings, genre) {
  const genreCount = {}
  const games = ratings.filter(game => game.genre === genre)
  genreCount[genre] = games.length
  return genreCount
}

function getGameStats(ratedGames) {
  return {
    avgRatings: {
      action: getAverageRating(ratedGames, 'action'),
      fighting: getAverageRating(ratedGames, 'fighting'),
      shooter: getAverageRating(ratedGames, 'shooter')
    },
    ratingCount: {
      action: getGenreCount(ratedGames, 'action'),
      fighting: getGenreCount(ratedGames, 'fighting'),
      shooter: getGenreCount(ratedGames, 'shooter')
    }
  }
}
