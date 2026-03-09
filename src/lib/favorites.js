const STORAGE_KEY = 'favorites'

const getFavorites = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')

const getFavorite = (id) => getFavorites()[id] || null

const addFavorite = (id, song) => {
  const favorites = getFavorites()
  favorites[id] = song
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

const removeFavorite = (id) => {
  const favorites = getFavorites()
  delete favorites[id]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export { getFavorites, getFavorite, addFavorite, removeFavorite }
