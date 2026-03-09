import { searchSongs } from '../api.js'
import { playSong } from '../player.js'
import { getFavorite, addFavorite, removeFavorite } from '../lib/favorites.js'

customElements.define('page-search', class extends HTMLElement {
  connectedCallback() {
    const query = decodeURIComponent(this.getAttribute('query') || '')

    this.innerHTML = `<h4>Résultats pour "${query}"</h4><p>Chargement...</p>`

    searchSongs(query)
      .then((songs) => {
        this.innerHTML = `
          <h4>Résultats pour "${query}"</h4>

          ${songs.length ? '<div class="list" id="search-songs"></div>' : '<p>Aucun résultat.</p>'}
        `

        const songList = this.querySelector('#search-songs')
        if (songList) {
          songs.forEach((song) => {
            const songItem = document.createElement('song-item')
            songItem.setAttribute('title', song.title)
            songItem.setAttribute('favorite', getFavorite(song.id) ? 'true' : 'false')
            songItem.addEventListener('play_click', () => playSong(song, songs))
            songItem.addEventListener('favorite_click', () => {
              if (getFavorite(song.id)) {
                removeFavorite(song.id)
                songItem.setAttribute('favorite', 'false')
              } else {
                addFavorite(song.id, song)
                songItem.setAttribute('favorite', 'true')
              }
            })
            songList.append(songItem)
          })
        }
      })
  }
})
