import React from 'react';
import Events from './../events';
import Reproductor from './../fnReproductor';

export default class AddModal extends React.Component{

  constructor(props){
    super(props);
    this.state = { url: '', load: false}
  }

  componentWillMount()
  {
    let body = document.getElementsByTagName('body')[0];
    body.style = "overflow:hidden;";

    this.keydownEvent = document.addEventListener('keydown', (e) => {
      if(e.keyCode == 27){
        this.onCloseModal();
      }
    });
  }

  componentWillUnmount()
  {
    let body = document.getElementsByTagName('body')[0];
    body.style = "overflow:inherit;";
    document.removeEventListener('keydown', this.keydownEvent);
  }

  onSubmit(e)
  {
    e.preventDefault();
    let videoid = this.state.url.split('v=')[1];
    this.setState({ load: true });
    Reproductor.getDataVideo(videoid).then( data => {
      console.log(data);
      this.onCloseModal();
    })
  }
  onChange(e)
  {
    this.setState( {url: e.target.value} )
  }

  onCloseModal(){
    Events.getSubject('modal').next(false);
  }

  onClick(e)
  {
    if(e.target.getAttribute('name') ==  "addmodal"){
      this.onCloseModal();
    }
  }

  render()
  {
    let render;
    if(this.state.load){
      render =  <h3> Wait ...</h3>;
    }else{
      render = (
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" placeholder="Youtube Song Link" 
            value={this.state.url}  onChange={this.onChange.bind(this)} 
            autoComplete="off" required/>
        </form>
      )
    }
    
    return (
      <div className="addmodal" name="addmodal" onClick={this.onClick.bind(this)}>
        <div className="addmodal__close" ></div>
        <div className="addmodal__content" name="addmodal__content">
          {render}
        </div>
      </div>
    )
  }
}