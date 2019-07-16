let _emitIntance = null;

/**
 * Capa intermedia para facilitar el uso de emits con socketio,
 * solo es utilizada en el servidor, no tiene soporte para el 
 * cliente
 */
class Emits {
	
	/**
	 * 
	 * @param {Object} io servidor de socketio 
	 */
	constructor(io){

		if(_emitIntance == null)
		{
			this.io = io;
			this._emitIntance = _emitIntance;
		}

		return _emitIntance;
	}

	/**
	 * Enviar informacion por medio de un canal, el parametro socket es opcional.
	 * @param {String} chanel canal por el cual van los datos 
	 * @param {Any} data datos a enviar
	 * @param {Socket} socket socket especifico.
	 */
	emit(chanel, data, socket){
		if( !socket ){
			this.all(chanel, data);
		}else{
			this.one(chanel, data, socket);
		}
	}

	/**
	 * Enviar datos  a todos los clientes conectados  a un canal.
	 * @param {String} chanel canal por el cual van los datos.
	 * @param {Any} data  datos a enviar.
	 */
	all(chanel, data){
		this.io.sockets.emit(chanel, data);
	}

	/**
	 * Enviar datos a un socket en especifico.
	 * @param {*} chanel canal por el cual van los datos.
	 * @param {*} data datos a enviar.
	 * @param {*} socket socket especifico.
	 */
	one(chanel, data, socket)
	{
		socket.emit(chanel, data);
	}

}

module.exports = Emits;
