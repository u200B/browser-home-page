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
		.then(event => {
			location.reload()
		})
		.catch(error => {
			throw new Error(error)
		})
	}
}

class SettingsHandler {
	static toggleSettingsVisibility() {
		if (this.settingsVisible) {
			document.getElementById('settings-container').style.display = 'none'
			document.getElementById('content-container').style.display = 'block'
		} else {
			document.getElementById('content-container').style.display = 'none'
			document.getElementById('settings-container').style.display = 'block'
		}
		this.settingsVisible = !this.settingsVisible
	}

	static updateSettings(field, value) {
		LOCALSTORAGEOBJECT.addKeyValue(field, value)
	}
}

class OnLoad {
	static loadLocalStorageConfiguration() {
		LOCALSTORAGEOBJECT = new LocalStorageManager('homepage_localstorage',
																							 	 'OBJECT')
		LOCALSTORAGEOBJECT.create()
		document.getElementById('randomBackgrounds')
			.checked = LOCALSTORAGEOBJECT.get().randomBackgrounds
		document.getElementById('hideSettingsButton')
			.checked = LOCALSTORAGEOBJECT.get().hideSettingsButton
		document.getElementById('showSearchBar')
			.checked = LOCALSTORAGEOBJECT.get().showSearchBar
		document.getElementById('enableDebugger')
			.checked = LOCALSTORAGEOBJECT.get().enableDebugger
	}

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

	static loadRandomImage() {
		IndexedDBManager.getRandomImage()
		.then(event => {
			if (event && event.target && event.target.result) {
				return HTML5FileAPIManager.convertFileToDataUrl(
					event.target.result
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

/* Load Debugger */
new Debugger()

/*** Setup Document With LocalStorage Configurations ***/
OnLoad.loadLocalStorageConfiguration()

LOCALSTORAGEOBJECT.get().randomBackgrounds ?
	OnLoad.loadRandomImage() : OnLoad.loadLastSetImage()

document.getElementById('settings-button')
	.style.opacity = LOCALSTORAGEOBJECT.get().hideSettingsButton ?
	'.0' : '.5'

if (LOCALSTORAGEOBJECT.get()['search-container-position']) {
	document.getElementById('search-container')
		.style.top = LOCALSTORAGEOBJECT.get()['search-container-position'].top
	document.getElementById('search-container')
		.style.left = LOCALSTORAGEOBJECT.get()['search-container-position'].left
}

document.getElementById('search-container')
	.style.display = LOCALSTORAGEOBJECT.get().showSearchBar ?
	'' : 'none'

	document.getElementById('debugger')
		.style.display = LOCALSTORAGEOBJECT.get().enableDebugger ?
		'' : 'none'
