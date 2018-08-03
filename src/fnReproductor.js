import Events from './events';
import {socket, loadIo} from './ioFunctions';

let instance = null;

class Reproductor {

  constructor()
  {
    if(instance == null)
    {
      instance = this;
      
      this.songs = [];
      this.oldSongs = [];
      this.on = false;
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
        if( song.video_id == oldSong.video_id){currentSong
          find = true;
        }
      });
      if(!find){
        this.songs.push(song);
      }
    });
    */
   Events.getSubject('songsdata').next( this.songs );
   if( this.songs.length > 0 && !this.on){
     this.on = true;
     this.play();
   }
  }

  play()
  {
    if(this.songs.length > 0)
    {
      this.player.loadVideoById(this.songs[0].video_id);
    }
  }

  onReady(event, player){
    this.player = player;
    loadIo();
  }

  onStatusChange(event){
    if(event.data == 0){
      this.on = false;
      socket.emit('deleteSong', this.songs[0]);
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
