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
    })
}

getGames()

function renderGameThumb(game) {
  const $gameThumb = document.createElement('div')
  const $img = document.createElement('img')
  const $caption = document.createElement('div')
  const $captionHeader = document.createElement('h3')
  const $detailContainer = document.createElement('div')
  const $detailList = document.createElement('ul')
  const $detailOne = document.createElement('li')
  const $detailTwo = document.createElement('li')
  const $detailThree = document.createElement('li')
  const $buttonContainer = document.createElement('div')
  const $rateButton = document.createElement('a')
  const $detailsButton = document.createElement('a')

  const { name, genre, rating, esrb, imgSrc } = game

  $gameThumb.setAttribute('class', 'col-md-2 thumbnail')

  $img.setAttribute('class', 'game-icon')
  $img.setAttribute('src', imgSrc)
  $img.setAttribute('alt', name)

  $caption.setAttribute('class', 'caption')

  $captionHeader.textContent = name

  $detailOne.textContent = 'Genre: ' + genre
  $detailTwo.textContent = 'Rating: ' + rating
  $detailThree.textContent = 'ESRB: ' + esrb

  $detailList.appendChild($detailOne)
  $detailList.appendChild($detailTwo)
  $detailList.appendChild($detailThree)

  $detailContainer.appendChild($detailList)

  $rateButton.setAttribute('href', '#')
  $rateButton.setAttribute('class', 'btn btn-primary')
  $rateButton.setAttribute('role', 'button')
  $rateButton.textContent = 'Rate'

  $detailsButton.setAttribute('href', '#')
  $detailsButton.setAttribute('class', 'btn btn-default')
  $detailsButton.setAttribute('role', 'button')
  $detailsButton.textContent = 'More Details'

  $buttonContainer.appendChild($rateButton)
  $buttonContainer.appendChild($detailsButton)

  $caption.appendChild($captionHeader)
  $caption.appendChild($detailContainer)
  $caption.appendChild($buttonContainer)

  $gameThumb.appendChild($img)
  $gameThumb.appendChild($caption)

  return $gameThumb
}
