import React from 'react';
import ReactDOM from 'react-dom';
import ListMusic from './components/ListMusic';
import AddModal from './components/AddModal';

import Events from './bus/events';
import youtubeService from './services/youtubeService';

import './iframes/loadIframes';


/* agregamos los subjects al bus, esto se puede mejorar utilizando otro metodo
o un manejador de estado como tal  */

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
		/**
		 * Llama a las apis cuando la pagina carga por completo.
		 */
		window.onload= () => {

			this.loadIframeApi();
			youtubeService.loadApi();
		}

		/**
		 * Indica cuando el es necesario abrir el modal.
		 */
		this.modalSubscription = Events.getSubject('modal')
			.subscribe( e => { this.setState( {addmodal: e} ) });
	}

	componentWillUnmount(){
		this.modalSubscription.unsubscribe();
	}

	/**
	 * Agrega el Script necesario para la api-iframe de youtube.
	 */
	loadIframeApi(){
		let tag = document.createElement('script');4
		tag.src = "https://www.youtube.com/iframe_api";
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
