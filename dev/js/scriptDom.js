import Player from './player.js'

// config
let mainTrackListClassName = 'trackList_main';
let trackItemClassName = 'track';
let trackItemControlClassName = 'track__control';
let trackItemPlayClassName = 'track__play';
let trackItemInfoClassName = 'track__info';
let trackItemArtistNameClassName = 'track__artistName';
let trackItemTrackNameClassName = 'track__trackName';

// треклист 
let mainTrackList = document.querySelector('.' + mainTrackListClassName);

// сам плеер
let playerEl = document.querySelector('.player');


//получить json
async function getTracks() {

  let response = await fetch('data.json');
  let result = await response.json();
  let arrTracks = result.data;

  renderTrack(arrTracks);
}

getTracks();



// получить массив из объекта
function renderTrack(arrTracks) {
  
  arrTracks.forEach((arrTracksEl) => {

    let trackItemEl = document.createElement('div');
    trackItemEl.classList.add(trackItemClassName);
    trackItemEl.setAttribute('data-info', JSON.stringify(arrTracksEl));
    mainTrackList.append(trackItemEl);

    let trackItemControlEl = document.createElement('div');
    trackItemControlEl.classList.add(trackItemControlClassName);
    trackItemEl.append(trackItemControlEl);

    // кнопки Play !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    let trackItemPlayEl = document.createElement('button');
    trackItemPlayEl.classList.add(trackItemPlayClassName);
    trackItemPlayEl.innerHTML = "Play";
    trackItemControlEl.append(trackItemPlayEl);

    let trackInfoEl = document.createElement('div');
    trackInfoEl.classList.add(trackItemInfoClassName);
    trackItemEl.append(trackInfoEl);

    let trackArtistNameEl = document.createElement('div');
    trackArtistNameEl.classList.add(trackItemArtistNameClassName);
    trackArtistNameEl.innerHTML = arrTracksEl.artist;
    trackInfoEl.append(trackArtistNameEl);
    
    let trackTrackNameEl = document.createElement('div');
    trackTrackNameEl.classList.add(trackItemTrackNameClassName);
    trackTrackNameEl.innerHTML = arrTracksEl.name;
    trackInfoEl.append(trackTrackNameEl);
    
  });


  // плеер и треклист
  let player = new Player(playerEl, mainTrackList);

}
