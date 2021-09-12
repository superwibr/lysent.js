import quark from "./quark.mjs";

class Resource {
	constructor(url, name) {
		this.url = url
		this.name = name
	}

	fetch = async (dataType) => { // fetches the resource
		return new Promise((res, rej) => {
			let bar = new quark.TinkerProgress('body', this.name); // create progress bar

			let xhr = new XMLHttpRequest(); // request
			xhr.open("GET", this.url);
			xhr.responseType = 'blob'

			xhr.onprogress = event => { // when progress is made
				bar.setProgress(Math.floor(event.loaded / event.total) * 100) // make percentage and set progress
			};

			let blob
			xhr.onload = () => {
				if (xhr.status != 200) {
					bar.finish(false)
					rej({})
					console.log(`Error ${xhr.status}: ${xhr.statusText}`);
				} else {
					bar.finish(true)
					blob = xhr.response
					res({
						data: blob,
						type: blob.type,
						name: this.name
					})
				}
			};

			xhr.send();
		})
	}
}
Resource.assemble = function (map) {// creates a single document from a map of resources. an example can be found in the /tests folder
	
}

export default Resource