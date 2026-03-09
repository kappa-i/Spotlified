var k=Object.defineProperty;var _=(e,t,i)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var n=(e,t,i)=>_(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const h of l.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function i(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(s){if(s.ep)return;s.ep=!0;const l=i(s);fetch(s.href,l)}})();var y;customElements.define("artist-cover",(y=class extends HTMLElement{connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){this.innerHTML=`
      <a href="${this.getAttribute("href")}">
        <img src="${this.getAttribute("cover")}" />
        <div class="artist-list-item-title">${this.getAttribute("title")}</div>
      </a>
     `}},n(y,"observedAttributes",["cover","title","href"]),y));const P=new CustomEvent("play_click"),C=new CustomEvent("favorite_click");var m;customElements.define("song-item",(m=class extends HTMLElement{connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const e=this.getAttribute("favorite")=="true"?"favorite":"favorite_border";this.innerHTML=`
      <div class="list-item-title">${this.getAttribute("title")}</div>
      <div class="list-item-actions">
        <button type="button" class="icon-button favorite-button ">
          <span class="material-icons">${e}</span>
        </button>
        <button type="button" class="icon-button play-button">
          <span class="material-icons">play_arrow</span>
        </button>
      </div>`,this.querySelector(".play-button").addEventListener("click",()=>{this.dispatchEvent(P)}),this.querySelector(".favorite-button").addEventListener("click",()=>{this.dispatchEvent(C)})}},n(m,"observedAttributes",["favorite","href","title"]),m));customElements.define("spot-footer",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <nav>
        <a href="#home" class="active">
          <span class="material-icons">home</span>
          <span>Home</span>
        </a>
        <a href="#player">
          <span class="material-icons">subscriptions</span>
          <span>Lecteur</span>
        </a>
        <a href="#artists">
          <span class="material-icons">library_music</span>
          <span>Musique</span>
        </a>
        <a href="#favorites">
          <span class="material-icons">favorite</span>
          <span>Favoris</span>
        </a>
      </nav>
    `,this.hashChange=this.hashChange.bind(this),window.addEventListener("hashchange",this.hashChange),this.hashChange()}hashChange(){var t,i;const e=window.location.hash.split("/")[0];(t=this.querySelector("nav a.active"))==null||t.classList.remove("active"),(i=this.querySelector(`nav a[href="${e}"]`))==null||i.classList.add("active")}});const M="https://webmob-ui-22-spotlified.herokuapp.com",v=e=>fetch(`${M}${e}`).then(t=>t.json()),A=()=>v("/api/artists"),H=e=>v(`/api/artists/${e}/songs`),q=e=>v(`/api/songs/search/${encodeURIComponent(e)}`),a=document.querySelector("#audio-player");let c=[],o=null;const u=(e,t)=>{o=e,t&&(c=t),a.src=e.audio_url,a.play()},w=()=>{let e=c.indexOf(o)+1;e==c.length&&(e=0),u(c[e])},x=()=>{let e=c.indexOf(o)-1;e==-1&&(e=c.length-1),u(c[e])},f="favorites",p=()=>JSON.parse(localStorage.getItem(f)||"{}"),d=e=>p()[e]||null,T=(e,t)=>{const i=p();i[e]=t,localStorage.setItem(f,JSON.stringify(i))},g=e=>{const t=p();delete t[e],localStorage.setItem(f,JSON.stringify(t))};customElements.define("page-search",class extends HTMLElement{connectedCallback(){const e=decodeURIComponent(this.getAttribute("query")||"");this.innerHTML=`<h4>Résultats pour "${e}"</h4><p>Chargement...</p>`,q(e).then(t=>{this.innerHTML=`
          <h4>Résultats pour "${e}"</h4>

          ${t.length?'<div class="list" id="search-songs"></div>':"<p>Aucun résultat.</p>"}
        `;const i=this.querySelector("#search-songs");i&&t.forEach(r=>{const s=document.createElement("song-item");s.setAttribute("title",r.title),s.setAttribute("favorite",d(r.id)?"true":"false"),s.addEventListener("play_click",()=>u(r,t)),s.addEventListener("favorite_click",()=>{d(r.id)?(g(r.id),s.setAttribute("favorite","false")):(T(r.id,r),s.setAttribute("favorite","true"))}),i.append(s)})})}});customElements.define("page-artists",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <h4>Artistes</h4>

      <artist-list>
      </artist-list>
    `;const e=this.querySelector("artist-list");A().then(t=>{t.forEach(i=>{e.innerHTML+=`<artist-cover href="#artists/${i.id}" title="${i.name}" cover="${i.image_url}" />`})})}});customElements.define("page-home",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <h1 class="hero">Bienvenue</h1>
      <h4>Playlists</h4>
    `}});function E(e){e=parseInt(e,10);let t=Math.floor(e/3600),i=Math.floor((e-t*3600)/60),r=e-t*3600-i*60;return i<10&&(i="0"+i),r<10&&(r="0"+r),i+":"+r}customElements.define("page-player",class extends HTMLElement{constructor(){super(...arguments);n(this,"playerThumbnail");n(this,"playerSongTitle");n(this,"playerArtistName");n(this,"playerPrev");n(this,"playerNext");n(this,"playerPlay");n(this,"playerPlayIcon");n(this,"playerTimeCurrent");n(this,"playerTimeDuration");n(this,"playerProgress")}connectedCallback(){this.innerHTML=`
      <div id="player">
        <div id="player-thumbnail">
          <!-- utiliser l'id de cet élément pour changer la cover de la chanson -->
          <img src="http://placecats.com/200/300" id="player-thumbnail-image" />
        </div>

        <div id="player-infos">
          <div id="player-infos-song">
            <span class="material-icons">music_note</span>
            <!-- utiliser l'id de cet élément pour changer le titre de la chanson -->
            <span id="player-infos-song-title">
              -
            </span>
          </div>

          <div id="player-infos-artist">
            <span class="material-icons">person</span>
            <!-- utiliser l'id de cet élément pour changer le nom de l'artiste -->
            <span id="player-infos-artist-name">
              -
            </span>
          </div>
        </div>

        <div id="player-controls">
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur précédent -->
          <button type="button" class="player-control player-control-small" id="player-control-previous">
            <span class="material-icons">skip_previous</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur play/pause -->
          <button type="button" class="player-control" id="player-control-play">
            <span class="material-icons">play_arrow</span>
          </button>
          <!-- utiliser l'id de cet élément pour ajouter un listener pour le click sur suivant -->
          <button type="button" class="player-control player-control-small" id="player-control-next">
            <span class="material-icons">skip_next</span>
          </button>
        </div>

        <div id="player-progress">
          <input type="range" id="player-progress-bar" />
          <div id="player-times">
            <!-- utiliser l'id de cet élément pour changer le temps écoulé -->
            <span id="player-time-current">--:--</span>
            <!-- utiliser l'id de cet élément pour changer la durée totale -->
            <span id="player-time-duration">--:--</span>
          </div>
        </div>
      </div>
      `,this.playerThumbnail=this.querySelector("#player-thumbnail-image"),this.playerSongTitle=this.querySelector("#player-infos-song-title"),this.playerArtistName=this.querySelector("#player-infos-artist-name"),this.playerPrev=this.querySelector("#player-control-previous"),this.playerNext=this.querySelector("#player-control-next"),this.playerPlay=this.querySelector("#player-control-play"),this.playerPlayIcon=this.playerPlay.querySelector(".material-icons"),this.playerTimeCurrent=this.querySelector("#player-time-current"),this.playerTimeDuration=this.querySelector("#player-time-duration"),this.playerProgress=this.querySelector("#player-progress-bar"),this.bindEvents()}bindEvents(){this.updatePlayerInfos=this.updatePlayerInfos.bind(this),this.updatePlayButton=this.updatePlayButton.bind(this),a.addEventListener("loadeddata",this.updatePlayerInfos),this.updatePlayerInfos(),this.updatePlayButton(),this.playerPlay.addEventListener("click",()=>{a.paused?a.play():a.pause()}),this.playerPrev.addEventListener("click",x),this.playerNext.addEventListener("click",w),this.playerProgress.addEventListener("change",t=>{a.currentTime=t.currentTarget.value}),a.addEventListener("timeupdate",()=>{this.playerProgress.value=a.currentTime,this.playerTimeCurrent.innerText=E(a.currentTime)}),a.addEventListener("play",this.updatePlayButton),a.addEventListener("pause",this.updatePlayButton)}updatePlayerInfos(){o&&(this.playerSongTitle.innerText=o.title,this.playerArtistName.innerText=o.artist.name,this.playerThumbnail.src=o.artist.image_url,this.playerProgress.max=a.duration,this.playerTimeDuration.innerText=E(a.duration))}updatePlayButton(){a.paused?this.playerPlayIcon.innerText="play_arrow":this.playerPlayIcon.innerText="pause"}});customElements.define("page-artist-songs",class extends HTMLElement{connectedCallback(){const e=this.getAttribute("artist-id");H(e).then(t=>{this.innerHTML=`
          <h4>
            Artistes > ${t[0].artist.name}
          </h4>

          <div class="list">
          </div>
        `;const i=this.querySelector(".list");t.forEach(r=>{const s=document.createElement("song-item");s.setAttribute("title",r.title),s.setAttribute("favorite",d(r.id)?"true":"false"),s.addEventListener("play_click",()=>u(r,t)),s.addEventListener("favorite_click",()=>{d(r.id)?(g(r.id),s.setAttribute("favorite","false")):(T(r.id,r),s.setAttribute("favorite","true"))}),i.append(s)})})}});const L=new CustomEvent("search_close");customElements.define("search-bar",class extends HTMLElement{connectedCallback(){this.innerHTML=`
      <input id="search-input" type="search" spellcheck="false" autocapitalize="false" autofocus />
      <button id="search-trigger" class="icon-button" type="button">
        <span class="material-icons">search</span>
      </button>
    `,this._input=this.querySelector("#search-input"),this._trigger=this.querySelector("#search-trigger"),this._trigger.addEventListener("click",()=>this._onTriggerClick()),this._input.addEventListener("keydown",e=>{e.key==="Enter"&&this._onEnter(),e.key==="Escape"&&this.close()})}close(){this._input.classList.remove("active"),this._input.value="",this.dispatchEvent(L)}_onTriggerClick(){this._input.classList.toggle("active")?this._input.focus():(this._input.value="",this.dispatchEvent(L))}_onEnter(){const e=this._input.value.trim();e&&(window.location.hash=`#search/${encodeURIComponent(e)}`)}});customElements.define("page-favorites",class extends HTMLElement{connectedCallback(){const e=Object.values(p());this.innerHTML=`
      <h4>Favoris</h4>
      ${e.length?'<div class="list"></div>':"<p>Aucun favori.</p>"}
    `;const t=this.querySelector(".list");t&&e.forEach(i=>{const r=document.createElement("song-item");r.setAttribute("title",i.title),r.setAttribute("favorite","true"),r.addEventListener("play_click",()=>u(i,e)),r.addEventListener("favorite_click",()=>{g(i.id),r.remove()}),t.append(r)})}});const b=()=>{const e=document.querySelector("main"),t=(window.location.hash||"#home").split("/");t[0]=="#home"?e.innerHTML="<page-home />":t[0]=="#player"?e.innerHTML="<page-player />":t[0]=="#artists"&&t[1]?e.innerHTML=`<page-artist-songs artist-id="${t[1]}" />`:t[0]=="#artists"&&!t[1]?e.innerHTML="<page-artists />":t[0]=="#search"&&t[1]?e.innerHTML=`<page-search query="${t[1]}" />`:t[0]=="#search"&&!t[1]?e.innerHTML="":t[0]=="#favorites"&&(e.innerHTML="<page-favorites />")},S=document.querySelector("search-bar");window.addEventListener("hashchange",()=>{window.location.hash.startsWith("#search")||S.close(),b()});S.addEventListener("search_close",b);b();window.addEventListener("offline",e=>{document.body.classList.add("offline")});"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js");window.addEventListener("online",e=>{document.body.classList.remove("offline")});
