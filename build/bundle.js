(()=>{"use strict";let t=document.querySelector(".trackList_main"),e=document.querySelector(".player");!async function(){let a=await fetch("data.json");(await a.json()).data.forEach((e=>{let a=document.createElement("div");a.classList.add("track"),a.setAttribute("data-info",JSON.stringify(e)),t.append(a);let i=document.createElement("div");i.classList.add("track__control"),a.append(i);let r=document.createElement("button");r.classList.add("track__play"),r.innerHTML="Play",i.append(r);let s=document.createElement("div");s.classList.add("track__info"),a.append(s);let l=document.createElement("div");l.classList.add("track__artistName"),l.innerHTML=e.artist,s.append(l);let c=document.createElement("div");c.classList.add("track__trackName"),c.innerHTML=e.name,s.append(c)})),new class{flag=!0;isPlaying=!1;audioEl=null;tracklist=null;activeTrackIsPlayer=null;playerArtistTitle;playerTracktTitle;playerDurationtTitle;playerContainerEl;playertrackNameContainer;playerImgWrapper;btnOpenTrack;currentTimeTitle;durationTitle;sliderBarScale;sliderBarProgress;constructor(t,e){this.playerContainerEl=t,this.trackListContainerEl=e,window.player=this,window.tracklist=this.tracklist,this.audioEl=document.querySelector(".audio"),this.playerArtistTitle=t.querySelector(".player__artistName"),this.playerTracktTitle=t.querySelector(".player__trackName"),this.playerImgWrapper=t.querySelector(".player__play"),this.currentTimeTitle=t.querySelector(".player__time"),this.sliderBarScale=t.querySelector(".player__running"),this.sliderBarProgress=t.querySelector(".running__width"),this.tracklist=new class{activeTrackIsTracklist=null;arrayTracks=[];player=null;trackListContainerEl=null;constructor(t,e){this.player=t,this.trackListContainerEl=e;let a=this.trackListContainerEl.querySelectorAll(".track");this.parseTrack(a)}parseTrack(t){this.arrayTracks=[],t.forEach(((t,e)=>{this.getInfoTracks(t,e)}))}getInfoTracks(t,e){let a=t.getAttribute("data-info"),i=JSON.parse(a),r=t.querySelector(".track__play"),s={numTrack:e,artist:i.artist,song:i.name,src:i.src,timeDuration:i.duration,el:t,btnPlay:r};this.arrayTracks.push(s),r.addEventListener("click",(()=>{t.classList.contains("played")?(this.addTrackActive(t),this.player.pause()):(this.player.loadTrack(this.setActive(e)),this.addTrackPlayed(t,r))}))}setActive(t){if(!this.arrayTracks[t])return null;let e=this.arrayTracks[t];return this.activeTrackIsTracklist=t,e}disableAll(){this.arrayTracks.forEach((t=>{this.disableTrack(t)}))}disableTrack(t){let e=t.el,a=t.btnPlay;e.classList.remove("active"),e.classList.remove("paused"),e.classList.remove("played"),a.innerText="Play"}addTrackActive(t){t.classList.add("active")}addTrackPlayed(t,e){t.classList.add("played"),e.innerText="Pause"}removeTrackPlayed(t,e){t.classList.remove("played"),e.innerText="Play"}addTrackPause(t){t.classList.add("paused")}removeTrackPause(t){t.classList.remove("paused")}addPausedActive(t){this.player.isPLaying||(t.classList.add("paused"),t.classList.remove("played"))}addPlayedrActive(t){this.player.isPLaying&&(t.classList.add("played"),t.classList.remove("paused"))}getTrack(t=!1){return!1===t?this.setActive(0):null}getNext(){let t=0;return this.activeTrackIsTracklist>=this.arrayTracks.length-1||(t=this.activeTrackIsTracklist+1),this.setActive(t)}getPrev(){let t=this.arrayTracks.length-1;return this.activeTrackIsTracklist<=0||(t=this.activeTrackIsTracklist-1),this.setActive(t)}}(this,e),this.eventsElements()}loadTrack(t=null){null===t&&(t=this.tracklist.getTrack()),this.activeTrackIsPlayer=t,this.audioEl.src=t.src,this.audioEl.load(),this.playerArtistTitle.innerText=t.artist,this.playerTracktTitle.innerText=t.song,this.play()}progressBarLoad(){let t=this.audioEl.currentTime/this.audioEl.duration*100;this.sliderBarProgress.style.width=t+"%"}progressBarClick(t){let e=this.sliderBarScale.clientWidth,a=t.offsetX;null!==this.activeTrackIsPlayer&&(this.audioEl.currentTime=a/e*this.audioEl.duration)}timeTrack(){let t=Math.floor(this.audioEl.currentTime/60/60),e=Math.floor(this.audioEl.currentTime/60)-60*t,a=(this.audioEl.currentTime%60).toFixed(0),i=[e.toString().padStart(2,"0"),a.toString().padStart(2,"0")].join(":");null!==this.activeTrackIsPlayer&&(this.currentTimeTitle.innerText=i)}play(){let t=this.audioEl.play();this.activeTrackIsPlayer?(this.isPLaying=!0,this.tracklist.addPlayedrActive(this.playerContainerEl),this.tracklist.disableAll(),this.tracklist.addTrackActive(this.activeTrackIsPlayer.el),this.tracklist.addTrackPlayed(this.activeTrackIsPlayer.el,this.activeTrackIsPlayer.btnPlay),void 0!==t&&t.then((t=>{this.audioEl.play()})).catch((t=>{}))):this.loadTrack()}pause(){this.audioEl.pause(),this.isPLaying=!1,this.tracklist.disableAll(),this.tracklist.addPausedActive(this.playerContainerEl),this.tracklist.removeTrackPlayed(this.activeTrackIsPlayer.el,this.activeTrackIsPlayer.btnPlay),this.tracklist.addTrackActive(this.activeTrackIsPlayer.el),this.tracklist.addTrackPause(this.activeTrackIsPlayer.el)}stop(){this.pause(),this.isPLaying=!1,this.audioEl.currentTime=0,this.activeTrackIsPlayer=null}next(){this.activeTrackIsPlayer&&(this.pause(),null!==this.activeTrackIsPlayer&&this.loadTrack(this.tracklist.getNext()))}prev(){this.activeTrackIsPlayer&&(this.pause(),null!==this.activeTrackIsPlayer&&this.loadTrack(this.tracklist.getPrev()))}trackLoop(t){this.flag?(this.audioEl.loop=!0,t.classList.add("active")):(this.audioEl.loop=!1,t.classList.remove("active")),this.flag=!this.flag}muteToggle(t){this.flag?(this.audioEl.muted=!0,t.classList.add("actives")):(this.audioEl.muted=!1,t.classList.remove("actives")),this.flag=!this.flag}volumePlayer(t,e,a){let i=e.clientWidth,r=t.offsetX/i*100,s=(r/100).toFixed(1);a.style.width=r+"%",this.audioEl.volume=s}eventsElements(){let{playerContainerEl:t}=this,e=t.querySelector(".player__play"),a=t.querySelector(".player__pause"),i=t.querySelector(".player__prev"),r=t.querySelector(".player__next"),s=t.querySelector(".player__mute"),l=t.querySelector(".player__repeat"),c=t.querySelector(".player__volume-bar"),d=t.querySelector(".volume-bar-value");e.addEventListener("click",(()=>{this.play()})),a.addEventListener("click",(()=>{this.pause()})),i.addEventListener("click",(()=>{this.prev()})),r.addEventListener("click",(()=>{this.next()})),this.audioEl.addEventListener("timeupdate",(()=>{this.progressBarLoad(),this.timeTrack()})),this.sliderBarScale.addEventListener("click",(t=>{this.progressBarClick(t),this.timeTrack()})),this.audioEl.addEventListener("ended",(()=>{this.loadTrack(this.tracklist.getNext())})),s.addEventListener("click",(()=>{this.muteToggle(s)})),l.addEventListener("click",(()=>{this.trackLoop(l)})),c.addEventListener("click",(t=>{this.volumePlayer(t,c,d)}))}}(e,t)}()})();