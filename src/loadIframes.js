import Reproductor from './fnReproductor.js';

window.onYouTubeIframeAPIReady = () => {
  console.info('!-------------YT full load-----------!');

  let player = new YT.Player('player', {
    videoId: '',
    events: {
      'onReady': ( event ) => { Reproductor.onReady(event, player) },
      'onStateChange': ( event ) => { Reproductor.onStatusChange(event) }
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