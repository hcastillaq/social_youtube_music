import { Subject } from "rxjs";

let _Events = null;

/**
 * Se encarga almacenar y retornar los Subjects,
 * define una comunicacion mediante eventos, se comprta como un singleton.
 */
class Events
{
  /**
   * Valida que solo exista una instancia de este objeto.
   * @example
   * const events = new EngineEvents();
   */
  constructor()
  {
    if (_Events == null)
    {
      /**
       * @type {Object}
       */
      this._subjects = {}
      _Events = this;
    }

    return _Events;
  }

  /**
   * Añade un evento al arreglo de eventos con el identificador definido
   * por parametro.
   * @param {String} key
   * Identificador del evento.
   * @example 
   * const events = new EngineEvents();
   * events.setSubject('myEvent');
   * @return {Object} Subject
   */
  setSubject(key)
  {
    if(this._subjects[key] == undefined)
    {
      this._subjects[key] = new Subject();
    }
    return this._subjects[key];
  }


  /**
   * Recibe la key del evento y retorna el Subject si existe, 
   * caso contrario retorna null
   * @param {String} key
   * Identificador del evento.
   * @example
   * const events = new EngineEvents();
   * events.setSubject('myEvent');
   * events.getSubject('myEvent').next('evento lanzado') //lanza el evento;
   * @return {Object} Subject || null
   */
  getSubject(key)
  {
    return (this._subjects[key] != undefined ? this._subjects[key] : null);
  }
}

export default new Events();