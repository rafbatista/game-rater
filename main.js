function getGames() {
  fetch('http://localhost:3000/games/all')
    .then(res => {
      return res.json()
    })
}

function renderGame(game) {
  const $game = document.createElement('div')
  const $gameTitle = document.createElement('h3')
  const $img = document.createElement('img')
  const $detailList = document.createElement('ul')
  const $detailOne = document.createElement('li')
  const $detailTwo = document.createElement('li')
  const $detailThree = document.createElement('li')
  const $detailFour = document.createElement('li')
  const $detailFive = document.createElement('li')
  const $detailSix = document.createElement('li')
  const $detailSeven = document.createElement('li')
  const { genre, rating, esrb, developer, publisher, mode, imgSrc, synopsis } = game

  $img.setAttribute('src', imgSrc)

  $detailOne.textContent = 'Genre: ' + genre
  $detailTwo.textContent = 'Rating: ' + rating
  $detailThree.textContent = 'ESRB: ' + esrb
  $detailFour.textContent = 'Developer: ' + developer
  $detailFive.textContent = 'Publisher: ' + publisher
  $detailSix.textContent = 'Mode: ' + mode
  $detailSeven.textContent = 'Synopsis: ' + synopsis

  $detailList.appendChild($detailOne)
  $detailList.appendChild($detailTwo)
  $detailList.appendChild($detailThree)
  $detailList.appendChild($detailFour)
  $detailList.appendChild($detailFive)
  $detailList.appendChild($detailSix)
  $detailList.appendChild($detailSeven)

  $game.appendChild($gameTitle)
  $game.appendChild($img)
  $game.appendChild($detailList)
  return $game
}
