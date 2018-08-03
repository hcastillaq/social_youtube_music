import React from 'react';

class ItemList extends React.Component{
  constructor(props){
    super(props);
  }

  onClick(){
    if(this.props.click)
    {
      this.props.click(this.props.song);
    }
  }

  render()
  {
    return (
      <div className="waitlist__content__item" onClick={ this.onClick.bind(this) }>
        <div className="waitlist__content__item__img">
          <img src={`https://i.ytimg.com/vi/${this.props.song.video_id}/hqdefault.jpg`} />
        </div>
        <span>
          {this.props.song.title}
        </span>
      </div>
    )
  }
}
export default ItemList;