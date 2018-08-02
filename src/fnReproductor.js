import { resolve } from "url";
import { rejects } from "assert";

let instance = null;

class Reproductor {

  constructor()
  {
    if(instance == null)
    {
      instance = this;
      this.player = null;
      this.playerTest = null;
      this.testResolve = () => {};
    }
    return instance;
  }

  onReady(event, player){
    this.player = player;
  }

  onStatusChange(event){
  }
  

  onReadyTest(event, player){
    console.log(player)
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
