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
  app.use(bodyParser.json())
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
    games
      .find({})
      .toArray()
      .then(games => {
        ratedGames
          .find()
          .toArray()
          .then(ratedGames => {
            const gameSuggestions = getSuggestions(games, ratedGames)
            res.json(gameSuggestions)
            gameSuggestions.splice(0)
          })
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })

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
  const games = ratings.filter(game => game.genre === genre)
  return games.length
}

function getGameStats(ratedGames) {
  return {
    avgRatings: {
      action: getAverageRating(ratedGames, 'Action'),
      fighting: getAverageRating(ratedGames, 'Fighting'),
      shooter: getAverageRating(ratedGames, 'Shooter')
    },
    ratingCount: {
      action: getGenreCount(ratedGames, 'Action'),
      fighting: getGenreCount(ratedGames, 'Fighting'),
      shooter: getGenreCount(ratedGames, 'Shooter')
    }
  }
}

function randomNumber(length) {
  return Math.floor(Math.random() * length)
}

function assignRatings(games, ratedGames) {
  for (let i = 0; i < games.length; i++) {
    for (let j = 0; j < ratedGames.length; j++) {
      if (games[i].id === ratedGames[j].id) {
        games[i].rating = ratedGames[j].rating
      }
    }
  }
}

function getSuggestionsByGenre(stats, games) {
  const gameSuggestions = []
  for (let i = 0; i < games.length; i++) {
    if (stats.avgRatings.action >= 3 && games[i].genre.toLowerCase() === 'action' && stats.ratingCount.action === 2 && games[i].rating === 0) {
      gameSuggestions.push(games[i])
    }
    if (stats.avgRatings.fighting >= 3 && games[i].genre.toLowerCase() === 'fighting' && stats.ratingCount.fighting === 2 && games[i].rating === 0) {
      gameSuggestions.push(games[i])
    }
    if (stats.avgRatings.shooter >= 3 && games[i].genre.toLowerCase() === 'shooter' && stats.ratingCount.shooter === 2 && games[i].rating === 0) {
      gameSuggestions.push(games[i])
    }
  }
  return gameSuggestions
}

function getUnsuggestedGames(games, gameSuggestions) {
  const unratedGames = []
  const unsuggestedGames = []
  for (let i = 0; i < games.length; i++) {
    if (games[i].rating === 0) {
      unratedGames.push(games[i])
    }
  }
  for (let i = 0; i < unratedGames.length; i++) {
    let isSuggested = false
    for (var j = 0; j < gameSuggestions.length; j++) {
      if (unratedGames[i].id === gameSuggestions[j].id) {
        isSuggested = true
        break
      }
    }
    if (isSuggested === false) {
      unsuggestedGames.push(unratedGames[i])
    }
  }
  return unsuggestedGames
}

function getSuggestions(games, ratedGames) {
  const stats = getGameStats(ratedGames)
  assignRatings(games, ratedGames)
  const gameSuggestions = getSuggestionsByGenre(stats, games)
  const unsuggestedGames = getUnsuggestedGames(games, gameSuggestions)
  if (gameSuggestions.length < 3) {
    gameSuggestions.push(unsuggestedGames[randomNumber(unsuggestedGames.length)])
  }
  return gameSuggestions
}
