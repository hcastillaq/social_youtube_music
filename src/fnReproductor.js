let instance = null;
class Reproductor {

  constructor()
  {
    if(instance == null)
    {
      instance = this;
      this.player = null;
    }

    return instance;
  }

  onReady(event){
    console.info('!--------------Player onReady ----------!')
  }

  onStatusChange(event){
  }
  
  setPlayer( player ){
    this.player = player;
  }

  getPlayer(){
    return this.player;
  }
}


export default new Reproductor();
