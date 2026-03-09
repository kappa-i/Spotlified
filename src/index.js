// Elements
import './elements/artist-cover.js'
import './elements/song-item.js'
import './elements/spot-footer.js'
import './elements/search-bar.js'
// Pages
import './pages/page-artists.js'
import './pages/page-home.js'
import './pages/page-player.js'
import './pages/page-songs.js'
import './pages/page-search.js'
import './pages/page-favorites.js'

const router = () => {
  const main = document.querySelector('main')
  const hashs = (window.location.hash || '#home').split('/')

  if (hashs[0] == '#home')
    main.innerHTML = '<page-home />'

  else if (hashs[0] == '#player')
    main.innerHTML = '<page-player />'

  else if (hashs[0] == '#artists' && hashs[1])
    main.innerHTML = `<page-artist-songs artist-id="${hashs[1]}" />`

  else if (hashs[0] == '#artists' && !hashs[1])
    main.innerHTML = '<page-artists />'

  else if (hashs[0] == '#search' && hashs[1])
    main.innerHTML = `<page-search query="${hashs[1]}" />`

  else if (hashs[0] == '#search' && !hashs[1])
    main.innerHTML = ''

  else if (hashs[0] == '#favorites')
    main.innerHTML = '<page-favorites />'
}

const searchBar = document.querySelector('search-bar')

window.addEventListener('hashchange', () => {
  if (!window.location.hash.startsWith('#search')) searchBar.close()
  router()
})

searchBar.addEventListener('search_close', router)

router()

window.addEventListener('offline', (e) => {
  document.body.classList.add('offline')
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

window.addEventListener('online', (e) => {
  document.body.classList.remove('offline')
})

