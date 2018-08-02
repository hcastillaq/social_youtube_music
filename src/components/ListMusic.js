import React from 'react';
import Events from './../events';


class ListMusic extends React.Component{
  constructor(props)
  {
    super(props);
  }
  
  onClick(){
    Events.getSubject('modal').next(true);
  }

  render(){
    let items = [];
    for(let i =0; i<= 20; i++){
      items.push( (
        <ItemList />
      ) );
    }
    return(
      <div id="waitlist">
        <div className="waitlist__header">
          <div className="waitlist__header__title">
            Lista de espera
          </div>
          <div className="waitlist__header__addBtn" onClick={this.onClick.bind(this)}> + </div>
        </div>

        <div className="whitelist__content">
          {items}
        </div>
      </div>
    )
  }
}

class ItemList extends React.Component{
  render()
  {
    return (
      <div className="waitlist__content__item">
        <div className="waitlist__content__item__img">
          <img src="https://i.ytimg.com/vi/3sDB38_d1Co/hqdefault.jpg"/>
        </div>
        <span>
          The 1975 - Love It If We Made It (Audio)
        </span>
      </div>
    )
  }
}

export default ListMusic;
