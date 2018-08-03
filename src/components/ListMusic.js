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
    this.state.items.forEach( item => {
      items.push( (
        <ItemList key={item.video_id} song={item}/>
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
          {items}
        </div>
      </div>
    )
  }
}

export default ListMusic;
