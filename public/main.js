/* global $ */
const $gamesList = document.querySelector('.games-list')

function getGames() {
  fetch('http://localhost:3000/games/all')
    .then(res => {
      return res.json()
    })
    .then(games => {
      games
        .map(renderGameThumb)
        .forEach($gameThumb => {
          $gamesList.appendChild($gameThumb)
        })
      $('#input-id').rating()
      setTimeout(() => {
        games.forEach(matchUserRatings)
      }, 0)
    })
}

getGames()

function renderGameThumb(game) {

  const $gameThumb = document.createElement('div')
  const $img = document.createElement('img')
  const $caption = document.createElement('div')
  const $captionHeader = document.createElement('h5')
  const $starContainer = document.createElement('div')
  const $ratingStars = document.createElement('input')
  const $detailContainer = document.createElement('div')
  const $detailList = document.createElement('ul')
  const $detailOne = document.createElement('li')
  const $detailTwo = document.createElement('li')
  const $detailThree = document.createElement('li')
  const $buttonContainer = document.createElement('div')
  const $rateButton = document.createElement('button')
  const $detailsButton = document.createElement('button')

  const { id, name, genre, rating, esrb, imgSrc } = game

  $gameThumb.setAttribute('class', 'col-md-3 thumbnail')
  $gameThumb.setAttribute('id', id)
  $gameThumb.setAttribute('data-user-rating-value', rating)

  $img.setAttribute('class', 'game-icon')
  $img.setAttribute('src', imgSrc)
  $img.setAttribute('alt', name)
  $img.style.width = '300px'
  $img.style.height = '350px'

  $caption.setAttribute('class', 'game-caption')

  $captionHeader.textContent = name

  $starContainer.setAttribute('class', 'star-container')
  $ratingStars.setAttribute('id', 'input-' + id)
  $ratingStars.setAttribute('name', 'input-' + id)
  $ratingStars.setAttribute('class', 'rating rating-loading')
  $ratingStars.setAttribute('data-min', '0')
  $ratingStars.setAttribute('data-max', '5')
  $ratingStars.setAttribute('data-step', '1')
  $ratingStars.setAttribute('data-size', 'sm')
  $starContainer.appendChild($ratingStars)

  $detailOne.setAttribute('class', 'genre')
  $detailOne.textContent = 'Genre: ' + genre

  $detailTwo.setAttribute('class', 'rating-detail')
  $detailTwo.textContent = 'User Rating: ' + rating

  $detailThree.setAttribute('class', 'esrb detail')
  $detailThree.textContent = 'ESRB: ' + esrb

  $detailList.appendChild($detailOne)
  $detailList.appendChild($detailTwo)
  $detailList.appendChild($detailThree)
  $detailContainer.appendChild($detailList)

  $rateButton.setAttribute('class', 'btn btn-primary')
  $rateButton.setAttribute('role', 'button')
  $rateButton.textContent = 'Rate'

  $detailsButton.setAttribute('class', 'btn btn-default')
  $detailsButton.setAttribute('role', 'button')
  $detailsButton.textContent = 'More Details'

  $buttonContainer.appendChild($rateButton)
  $buttonContainer.appendChild($detailsButton)

  $caption.appendChild($starContainer)
  $caption.appendChild($captionHeader)
  $caption.appendChild($detailContainer)
  $caption.appendChild($buttonContainer)

  $gameThumb.appendChild($img)
  $gameThumb.appendChild($caption)

  return $gameThumb
}

function matchUserRatings(game) {
  const $gameThumb = document.getElementById(game.id)
  const userRating = $gameThumb.getAttribute('data-user-rating-value')
  const $ratingStars = $gameThumb.querySelector('.filled-stars')

  switch (userRating) {
    case '0':
      $ratingStars.style.width = '0%'
      break
    case '1':
      $ratingStars.style.width = '20%'
      break
    case '2':
      $ratingStars.style.width = '40%'
      break
    case '3':
      $ratingStars.style.width = '60%'
      break
    case '4':
      $ratingStars.style.width = '80%'
      break
    case '5':
      $ratingStars.style.width = '100%'
  }
}

const postHeaders = new Headers()
postHeaders.append('Content-Type', 'application/json')

function postGameRating(id, rating) {
  const postInit = {
    method: 'POST',
    headers: postHeaders,
    body: JSON.stringify({
      id: id,
      rating: rating
    })
  }
  fetch('http://localhost:3000/games/all', postInit)
}

$gamesList.addEventListener('click', (event) => {
  let userRating = 0
  const $gameThumb = event.target.closest('.thumbnail')

  if ($gameThumb.getAttribute('data-rated-status') === 'true') {
    return
  }

  const gameThumbId = $gameThumb.getAttribute('id')
  const $ratings = $gameThumb.querySelector('.filled-stars')
  switch ($ratings.style.width) {
    case '0%':
      userRating = 0
      break
    case '20%':
      userRating = 1
      break
    case '40%':
      userRating = 2
      break
    case '60%':
      userRating = 3
      break
    case '80%':
      userRating = 4
      break
    case '100%':
      userRating = 5
  }

  const $rateButton = event.target.getAttribute('class')
  if ($rateButton === 'btn btn-primary' && userRating === 0) {
    window.alert('Please choose a minimum of 1-star before rating a game.')
  }
  else if ($rateButton === 'btn btn-primary' && userRating > 0) {
    $gameThumb.setAttribute('data-rated-status', 'true')
    window.alert('Game has been rated!')
    postGameRating(parseInt(gameThumbId, 10), userRating)
  }
})
