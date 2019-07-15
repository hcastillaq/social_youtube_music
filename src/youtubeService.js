let key = "AIzaSyB7Mrlk068IDiY5LMclS5HV1U7wstXADAs";

let _instace = null;

class youtubeService {
	constructor() {
		if (_instace == null) {
			_instace = this;
		}
		return _instace
	}

	loadApi() {
		gapi.client.load('youtube', 'v3', function () {
			gapi.client.setApiKey(key);
		})
	}

	search(query) {
		let resolve;
		let promise = new Promise((r, reject) => { resolve = r; });

		gapi.client.youtube.search.list({
			part: 'snippet',
			maxResults: 20,
			q: query
		}).execute(function (response) { resolve(response) });

		return promise;
	}
}
export default new youtubeService();