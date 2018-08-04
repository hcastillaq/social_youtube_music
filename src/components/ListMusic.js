import React from 'react';
import Events from './../events';
import ItemList from './ItemList';

class ListMusic extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = { items: []};
  }
  
  onClick(){
    Events.getSubject('modal').next(true);
  }
  
  componentDidMount()
  {
    Events.getSubject('songsdata').subscribe( data => {
      this.setState( { items: data });
    });
  } 

  render(){
    let items = [];
    this.state.items.forEach( (item, index) => {
      items.push( (
        <ItemList key={index} song={item}/>
      ) );
    })
    
    return(
      <div id="waitlist">
        <div className="waitlist__header">
          <div className="waitlist__header__title">
            Lista de espera
          </div>
          <div className="waitlist__header__addBtn" onClick={this.onClick.bind(this)}> + </div>
        </div>
        <div className="whitelist__content">
          {items.length == 0 ? (
            <h3> Ups... No tenemos datos, agrega un video :D </h3>
          ) : items}
        </div>
      </div>
    )
  }
}

export default ListMusic;
