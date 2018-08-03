import React from 'react';
import ReactDOM from 'react-dom';
import ListMusic from './components/ListMusic';
import AddModal from './components/AddModal';
import Events from './events';
import youtubeService from './youtubeService';
import './loadIframes';

import './ioFunctions.js';

Events.setSubject('modal');
Events.setSubject('songsdata');

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addmodal: false
    }
  }

  componentDidMount(){
    window.onload= () => {
      this.loadIframeApi();
      youtubeService.loadApi();
    }

    this.modalSubscription = Events.getSubject('modal')
      .subscribe( e => { this.setState( {addmodal: e} ) });
  }

  componentWillUnmount(){
    this.modalSubscription.unsubscribe();
  }

  loadIframeApi(){
    let tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onReady(event){
    console.log('here')
    event.target.playVideo();
  }

  render()
  {
    let Modal = this.state.addmodal == true ? <AddModal /> : null;
    return(
      <div className="content">
        <div id="player"></div>
        <ListMusic />
        {Modal}
      </div>
    )
  }
}

ReactDOM.render(<Home />, document.getElementById('root'));
