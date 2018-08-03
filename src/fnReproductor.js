import Events from './events';
import {socket} from './ioFunctions';

let instance = null;

class Reproductor {

  constructor()
  {
    if(instance == null)
    {
      instance = this;
      
      this.songs = [];
      this.oldSongs = [];
      
      this.currentSong = null;

      this.player = null; 
      this.playerTest = null;
      this.testResolve = () => {};
    }
    return instance;
  }

  setSogns(songs)
  {
    this.songs = songs;
    
    /*
    this.songs = [];
    songs.forEach( song => {
      let find = false;
      this.oldSongs.forEach( oldSong => {
        if( song.video_id == oldSong.video_id){
          find = true;
        }
      });
      if(!find){
        this.songs.push(song);
      }
    });
    */
   Events.getSubject('songsdata').next( this.songs );
   if( this.currentSong == null && this.songs.length > 0){
     this.currentSong = 0;
     this.play();
   }
  }

  play()
  {
    if(this.currentSong!=null)
    {
      this.player.loadVideoById(this.songs[this.currentSong].video_id);
    }
  }

  nextSong()
  {
    if(this.songs[this.currentSong + 1]){
      this.currentSong ++;
      this.play();
    }else{
      this.currentSong = null;
    }
  }

  onReady(event, player){
    this.player = player;
  }

  onStatusChange(event){
    if(event.data == 0){
      socket.emit('deleteSong', this.songs[this.currentSong]);
      this.nextSong();
    }
  }
  
  onReadyTest(event, player){
    this.playerTest = player;
  }

  onStatusChangeTest(event){
    if(event.data == 1){
      let data = event.target.getVideoData();
      event.target.pauseVideo()
      this.testResolve(data);
      this.testResolve = () => {};
    }
  }
  
  getDataVideo(videoId)
  {
    this.playerTest.loadVideoById(videoId);
    this.playerTest.mute();

    return new Promise( (resolve, reject) => {
      this.testResolve = resolve;
    });
  }


  getPlayer(){
    return this.player;
  }
}

export default new Reproductor();
