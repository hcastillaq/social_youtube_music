import React from 'react';
import ReactDOM from 'react-dom';
import Reproductor from './fnReproductor.js';
import './ioFunctions.js';
import ListMusic from './components/ListMusic';
import AddModal from './components/AddModal';
import Events from './events';

Events.setSubject('modal');


window.onYouTubeIframeAPIReady = ()=> {
  console.info('!-------------YT full load-----------!');

  let player = new YT.Player('player', {
    videoId: '71q6w-8T4Dg',
    events: {
      'onReady': ( event ) => { Reproductor.onReady(event, player) },
      'onStateChange': Reproductor.onStatusChangee
    }
  });

  let playerTest = new YT.Player('testPlayer', {
    videoId: '',
    events: {
      'onReady': ( event ) => { Reproductor.onReadyTest(event, playerTest) },
      'onStateChange': ( event ) => { Reproductor.onStatusChangeTest(event) }
    }
  });

}

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
