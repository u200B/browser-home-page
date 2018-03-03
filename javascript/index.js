class ImageHandler {
	static upload(file) {
    HTML5FileAPIManager.convertFileToDataUrl(file)
		.then(dataUrl => {
			return IndexedDBManager.storeImage(file)
		})
		.then(event => {
			return IndexedDBManager.getImageByKey(event.target.result)
		})
		.then(event => {
			return HTML5FileAPIManager.convertFileToDataUrl(event.target.result)
		})
		.then(dataUrl => {
			document.getElementById('body').background = dataUrl
		})
		.catch(error => {
			throw new Error(error)
		})
	}

	static clearAllImages() {
		IndexedDBManager.clearAllImages()
	}
}

class SettingsHandler {
	static toggleSettingsVisibility() {
		if (this.settingsVisible) {
			document.getElementById('settings-container').style.display = 'none'
			document.getElementById('content-container').style.display = 'inline'
		} else {
			document.getElementById('content-container').style.display = 'none'
			document.getElementById('settings-container').style.display = 'inline'
		}
		this.settingsVisible = !this.settingsVisible
	}
}

class OnLoad {
	static loadLastSetImage() {
		IndexedDBManager.getAllImages()
		.then(event => {
			if (event.target.result.length) {
				return HTML5FileAPIManager.convertFileToDataUrl(
					event.target.result[event.target.result.length - 1]
				)
			} else {
				Promise.resolve(false)
			}
		})
		.then(dataUrl => {
			if (dataUrl) {
				document.getElementById('body').background = dataUrl
			}
		})
		.catch(error => {
			throw new Error(error)
		})
	}
}

OnLoad.loadLastSetImage()
