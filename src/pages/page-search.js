const closeEvent = new CustomEvent('search_close')

customElements.define('search-bar', class extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <input id="search-input" type="search" spellcheck="false" autocapitalize="false" autofocus />
      <button id="search-trigger" class="icon-button" type="button">
        <span class="material-icons">search</span>
      </button>
    `

    this._input = this.querySelector('#search-input')
    this._trigger = this.querySelector('#search-trigger')

    this._trigger.addEventListener('click', () => this._onTriggerClick())
    this._input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._onEnter()
      if (e.key === 'Escape') this.close()
    })
  }

  close() {
    this._input.classList.remove('active')
    this._input.value = ''
    this.dispatchEvent(closeEvent)
  }

  _onTriggerClick() {
    const isActive = this._input.classList.toggle('active')
    if (isActive) {
      this._input.focus()
    } else {
      this._input.value = ''
      this.dispatchEvent(closeEvent)
    }
  }

  _onEnter() {
    const query = this._input.value.trim()
    if (query) window.location.hash = `#search/${encodeURIComponent(query)}`
  }
})

