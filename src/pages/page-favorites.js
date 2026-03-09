import { getFavorites, removeFavorite } from '../lib/favorites.js'
import { playSong } from '../player.js'

customElements.define('page-favorites', class extends HTMLElement {
  connectedCallback() {
    const favorites = Object.values(getFavorites())

    this.innerHTML = `
      <h4>Favoris</h4>
      ${favorites.length ? '<div class="list"></div>' : '<p>Aucun favori.</p>'}
    `

    const list = this.querySelector('.list')
    if (list) {
      favorites.forEach((song) => {
        const songItem = document.createElement('song-item')
        songItem.setAttribute('title', song.title)
        songItem.setAttribute('favorite', 'true')
        songItem.addEventListener('play_click', () => playSong(song, favorites))
        songItem.addEventListener('favorite_click', () => {
          removeFavorite(song.id)
          songItem.remove()
        })
        list.append(songItem)
      })
    }
  }
})