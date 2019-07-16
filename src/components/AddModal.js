import React from 'react';
import Events from './../bus/events';
import Reproductor from './../reproductores/clientReproductor';
import  {socket} from './../IO/ioFunctions';
import youtubeService from './../services/youtubeService';
import ItemList from './ItemList';
const CHANNELS = require('./../bus/channels');

export default class AddModal extends React.Component{

	constructor(props){
		super(props);
		
		this.state = { 
			url: '', 
			load: false,
			searchItems: [],
			searching: false
		}
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
		this.setState( {searching:true} );

		youtubeService.search(this.state.url).then( resp => {
			let items = resp.items.map( e =>  { 
				return {
					video_id: e.id.videoId,
					title: e.snippet.title
				}
			 });
			 
			this.setState({ searchItems: items });
			this.setState( {searching:false} );
		});
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

	onSelectItem( data ){
		this.setState( {load: true, searchItems: [] } );

		Reproductor.getDataVideo(data.video_id).then( res => {
			socket.emit(CHANNELS.ADD_SONG, res);
			this.setState( {load: false} );
			this.onCloseModal();
		});
	
	}

	render()
	{
		let render;

		if(this.state.load){
			render =  <h3> Espera ...</h3>;
		}else{
			render = (
				<form onSubmit={this.onSubmit.bind(this)}> 
					<input type="text" placeholder="Busca un video" 
						value={this.state.url}  onChange={this.onChange.bind(this)} 
						autoComplete="off" autoFocus required/>
				</form>
			)
		}
		
		let items = this.state.searchItems.map( item => {
			return(
				<ItemList song={item} key={item.video_id} 
					click={this.onSelectItem.bind(this)} />
			)
		});

		return (
			<div className="addmodal" name="addmodal" onClick={this.onClick.bind(this)}>
				<div className="addmodal__close" ></div>
				<div className="addmodal__content" name="addmodal__content">
					{render}
					{this.state.searching ? (<div><br /><h3>Espera...</h3></div>):null}

					<div className="addmodal__content__results">
						{items}
					</div>
				</div>
			</div>
		)
	}
}