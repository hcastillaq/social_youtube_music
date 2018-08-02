import React from 'react';
import ReactDOM from 'react-dom';
import Reproductor from './fnReproductor.js';

window.onYouTubeIframeAPIReady = ()=> {
  console.info('!-------------YT full load-----------!');
    Reproductor.setPlayer(new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: '',
      events: {
        'onReady': Reproductor.onReady,
        'onStateChange': Reproductor.onStatusChangee
      }
    })
  )
}

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      player: null,
      videoId: null
    }
  }


  componentDidMount(){
    this.loadIframeApi();
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
    return(
      <div id="player"></div>
    )
  }

}


ReactDOM.render(<Home />, document.getElementById('root'));
