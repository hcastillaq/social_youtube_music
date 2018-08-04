let _emitIntance = null;

class Emits {
  
  constructor(io){

    if(_emitIntance == null)
    {
      this.io = io;
      this._emitIntance = _emitIntance;
    }

    return _emitIntance;
  }

  emit(chanel, data, socket){
    if( !socket ){
      this.all(chanel, data);
    }else{
      this.one(chanel, data, socket);
    }
  }

  all(chanel, data){
    this.io.sockets.emit(chanel, data);
  }

  one(chanel, data, socket)
  {
    socket.emit(chanel, data);
  }

}

module.exports = Emits;
