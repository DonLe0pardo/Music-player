import Tracklist from './tracklist.js'



// config
let playerPlaySelector = 'player__play';
let playerPauseSelector = 'player__pause';
let playerPrevSelector = 'player__prev';
let playerNextSelector = 'player__next';

let playerArtistSelector = 'player__artistName';
let playerTracktSelector = 'player__trackName';

let playerImgWrapperSelector = 'player__play';


let currentTimeTrackSelector = 'player__time';

let sliderBarScaleSelector = 'player__running';
let sliderBarProgressSelector = 'running__width';

let repeatPlayerSelector = 'player__repeat';

let mutePlayerSelector = 'player__mute';

let volumeBarSelector = 'player__volume-bar';
let volumeBarValueSelector = 'volume-bar-value';


class Player {

    flag = true;

    isPlaying = false;
    audioEl = null;
    tracklist = null;  
    activeTrackIsPlayer = null;

    playerArtistTitle;
    playerTracktTitle;
    playerDurationtTitle;

    playerContainerEl;

    playertrackNameContainer;
    playerImgWrapper;
    btnOpenTrack;
    currentTimeTitle;
    durationTitle;
    sliderBarScale;
    sliderBarProgress;

    constructor(playerContainerEl, trackListContainerEl){  
  
        this.playerContainerEl = playerContainerEl;
        
        this.trackListContainerEl = trackListContainerEl;

        window.player = this;
        window.tracklist = this.tracklist;
        this.audioEl = document.querySelector('.audio');

        this.playerArtistTitle = playerContainerEl.querySelector('.' + playerArtistSelector);
        this.playerTracktTitle = playerContainerEl.querySelector('.' + playerTracktSelector);
       
        this.playerImgWrapper = playerContainerEl.querySelector('.' + playerImgWrapperSelector);

        this.currentTimeTitle = playerContainerEl.querySelector('.' + currentTimeTrackSelector);

        this.sliderBarScale = playerContainerEl.querySelector('.' + sliderBarScaleSelector);
        this.sliderBarProgress = playerContainerEl.querySelector('.' + sliderBarProgressSelector);

       

        this.tracklist = new Tracklist(this, trackListContainerEl);


        this.eventsElements();
    }

    

    loadTrack(track = null){

      if (track === null) {
            track = this.tracklist.getTrack();
      }
      this.activeTrackIsPlayer = track;
      this.audioEl.src = track.src;
      this.audioEl.load();
      this.playerArtistTitle.innerText = track.artist;
      this.playerTracktTitle.innerText = track.song;
      this.play();
      
    }


 
    progressBarLoad(){
        let progressBarSegment = (this.audioEl.currentTime / this.audioEl.duration) * 100;
        this.sliderBarProgress.style.width = progressBarSegment + '%';  // бегунок 
    }

    progressBarClick(e) { 
        let widthSliderBar = this.sliderBarScale.clientWidth;
        let widthOffsetX = e.offsetX;
        if (this.activeTrackIsPlayer !== null) {
            this.audioEl.currentTime = (widthOffsetX / widthSliderBar) * this.audioEl.duration;
        } 
    }


    // Время тик-так
    timeTrack() {
      let hours = Math.floor(this.audioEl.currentTime / 60 / 60);
      let minutes = Math.floor(this.audioEl.currentTime / 60) - (hours * 60);
      let seconds = (this.audioEl.currentTime % 60).toFixed(0);
      let formatted = [
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
      ].join(':');

      if (!(this.activeTrackIsPlayer === null)) {
        this.currentTimeTitle.innerText = formatted;
      }

   }


    play(){
        let playPromise = this.audioEl.play();
        
        if (this.activeTrackIsPlayer){
            this.isPLaying = true;
            this.tracklist.addPlayedrActive(this.playerContainerEl);
            this.tracklist.disableAll();
            this.tracklist.addTrackActive(this.activeTrackIsPlayer.el); // добавляет Active
            this.tracklist.addTrackPlayed(this.activeTrackIsPlayer.el, this.activeTrackIsPlayer.btnPlay); // добавляет Played
         
            if (playPromise !== undefined) {
    
               playPromise.then(_ => {
               this.audioEl.play(); 
           
            })
             .catch(error => {
            });
          }
        }
        else {

          this.loadTrack();

        }
    }

    pause() {
        this.audioEl.pause();
        this.isPLaying = false;
        this.tracklist.disableAll();
        this.tracklist.addPausedActive(this.playerContainerEl); // доб у плеера пауза и удал played
        this.tracklist.removeTrackPlayed(this.activeTrackIsPlayer.el, this.activeTrackIsPlayer.btnPlay); //  у трека удаляет played
        this.tracklist.addTrackActive(this.activeTrackIsPlayer.el); //у трека добавл Active
        this.tracklist.addTrackPause(this.activeTrackIsPlayer.el); //у трека добавл паузу
    }

    stop(){
        this.pause();
        this.isPLaying = false;
        this.audioEl.currentTime = 0;
        this.activeTrackIsPlayer = null;
    }


    next() {
        if (this.activeTrackIsPlayer) {
            this.pause();
            if (!(this.activeTrackIsPlayer === null)) {
                this.loadTrack(this.tracklist.getNext());
            }
        }
    }



    prev() {
        if (this.activeTrackIsPlayer) {
            this.pause();
            if (!(this.activeTrackIsPlayer === null)) {
                this.loadTrack(this.tracklist.getPrev());
            }
        }

    }

    trackLoop(el){
      if (this.flag) {
        this.audioEl.loop = true;
        el.classList.add('active');
      } 
       else {
        this.audioEl.loop = false;
        el.classList.remove('active');
      }
      this.flag = !this.flag; 
    }
    


    muteToggle(el){   
      if (this.flag) {
        this.audioEl.muted = true;
        el.classList.add('actives');
      } else {
        this.audioEl.muted = false;
        el.classList.remove('actives');      
      }
      this.flag = !this.flag; 
    }


    
    volumePlayer(e, el, innerEl){
        let widthEl = el.clientWidth;
        let widthOffsetX = e.offsetX;

        let progressBarVolume = (widthOffsetX / widthEl) * 100;
        let newValue = progressBarVolume / 100;
        let newVolume = newValue.toFixed(1);

        innerEl.style.width = progressBarVolume + '%';  // бегунок
    
        this.audioEl.volume = newVolume;
        
    }


    eventsElements(){

        let {
            playerContainerEl
        } = this;

        let playerPlayBtn = playerContainerEl.querySelector('.' + playerPlaySelector);
        let playerPauseBtn = playerContainerEl.querySelector('.' + playerPauseSelector);
        let playerPrevBtn = playerContainerEl.querySelector('.' + playerPrevSelector);  
        let playerNextBtn = playerContainerEl.querySelector('.' + playerNextSelector);

        let playerMute = playerContainerEl.querySelector('.' + mutePlayerSelector);
        let playerRepeat = playerContainerEl.querySelector('.' + repeatPlayerSelector);

        let volumeBar = playerContainerEl.querySelector('.' + volumeBarSelector);
   

        let volumeBarValue = playerContainerEl.querySelector('.' + volumeBarValueSelector);

        

        playerPlayBtn.addEventListener("click", () =>{
            this.play();
        })

        playerPauseBtn.addEventListener("click", () =>{
            this.pause();
        })

        playerPrevBtn.addEventListener("click", () =>{
            this.prev();
        })

        playerNextBtn.addEventListener("click", () =>{
            this.next();
        })

        // Событие timeupdate запускается, когда время, указанное currentTimeатрибутом, обновляется.
        this.audioEl.addEventListener('timeupdate', () => {
            this.progressBarLoad();
            this.timeTrack();
        })

        this.sliderBarScale.addEventListener('click', (e) => {
            this.progressBarClick(e);
            this.timeTrack();
            
        })
        
        this.audioEl.addEventListener('ended', () => {
            this.loadTrack(this.tracklist.getNext());
        })

        playerMute.addEventListener('click', () => {

            this.muteToggle(playerMute); 
        });

        playerRepeat.addEventListener('click', () => {
            this.trackLoop(playerRepeat);
        });

       
        volumeBar.addEventListener('click', (e) => {
            this.volumePlayer(e, volumeBar, volumeBarValue);
        });
    }
}



export default Player












