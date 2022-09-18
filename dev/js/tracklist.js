

// config
let trackSelector = 'track';
let playBtnSelector = 'track__play';



class Tracklist {
   

    activeTrackIsTracklist = null;

    arrayTracks = [];

    player = null;
 
    trackListContainerEl = null;
    

    constructor(player, trackListContainerEl) {
        this.player = player;
        this.trackListContainerEl = trackListContainerEl;
        let trackItems = this.trackListContainerEl.querySelectorAll('.' + trackSelector);
        this.parseTrack(trackItems);

    }
    
    
    parseTrack(trackItems){
       this.arrayTracks = [];

       trackItems.forEach((trackItemEl, indexTrack) => {
        this.getInfoTracks(trackItemEl, indexTrack);
        
       });

    }


    getInfoTracks(trackItemEl, indexTrack){
        
        let getTrackAttribute = trackItemEl.getAttribute('data-info');
        let dataTrackParseEl = JSON.parse(getTrackAttribute);

        let playTrackBtnEl = trackItemEl.querySelector('.' + playBtnSelector);  // кнопка плей на самом треке

        let dataTrack = {
            numTrack: indexTrack,
            artist: dataTrackParseEl.artist,
            song: dataTrackParseEl.name,
            src: dataTrackParseEl.src,
            timeDuration: dataTrackParseEl.duration,
            el: trackItemEl,
            btnPlay: playTrackBtnEl
        };


        this.arrayTracks.push(dataTrack);
        
        
      
        playTrackBtnEl.addEventListener('click', () => {
            
            if (!trackItemEl.classList.contains('played')){
                
            // если не played
            this.player.loadTrack(this.setActive(indexTrack)); // загружать и вкл трек  
            this.addTrackPlayed(trackItemEl, playTrackBtnEl);  // add played
              }
            // если played
            else{
                this.addTrackActive(trackItemEl); // доб класс эктив
                this.player.pause();
            } 
        });
    }

   

    setActive(numTrack){
        if (!(this.arrayTracks[numTrack])) return null;

        let track = this.arrayTracks[numTrack];
        this.activeTrackIsTracklist = numTrack;

        return track;
    }

    disableAll() {
        this.arrayTracks.forEach(uniqueTrack => {
            this.disableTrack(uniqueTrack);
            
        })
    }


    disableTrack(uniqueTrack) {
        let trackEl = uniqueTrack.el;
        let btnEl =  uniqueTrack.btnPlay;
        trackEl.classList.remove('active');
        trackEl.classList.remove('paused');
        trackEl.classList.remove('played');
        btnEl.innerText = "Play";
    }


    ////////////////////////////////////////// у трека add active
    addTrackActive(el){
        el.classList.add('active');
        
    }

    ////////////////////////////////////////////// у трека add played
    addTrackPlayed(el, btnEl){
        el.classList.add('played');
        btnEl.innerText = "Pause";

             
    }

    /////////////////////////////////////////////// у трека remove played
    removeTrackPlayed(el, btnEl){ 
        el.classList.remove('played');
        btnEl.innerText = "Play";
    }

    /////////////////////////////////////////////// у трека add pause
    addTrackPause(el){
        el.classList.add('paused');
    }

    /////////////////////////////////////////////// у трека remove pause
    removeTrackPause(el){
        el.classList.remove('paused');
    }




    //  плеер на паузе
    addPausedActive(el){
        if (!this.player.isPLaying) {
          el.classList.add('paused');
          el.classList.remove('played');
        }
    }


    // плеер проигрывается  
    addPlayedrActive(el){
        if (this.player.isPLaying) {   
          el.classList.add('played');
          el.classList.remove('paused');
        }
        
    }



    getTrack(trackId = false) {

        if (trackId === false) {
            return this.setActive(0);
        } else {
            return null;
        }
    }


    getNext() {
        let index = 0;

        if (!(this.activeTrackIsTracklist >= this.arrayTracks.length - 1)) {
            index = this.activeTrackIsTracklist + 1;

        }

        return this.setActive(index);
    }


    getPrev() {
        let index = this.arrayTracks.length - 1;

        if (!(this.activeTrackIsTracklist <= 0)) {
            index = this.activeTrackIsTracklist - 1;
        }
        return this.setActive(index);
    }
    



}

export default Tracklist
















