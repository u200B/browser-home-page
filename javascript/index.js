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
			return HTML5FileAPIManager.convertFileToDataUrl(file)
		})
		.then(dataUrl => {
			document.getElementById('body').background = dataUrl
		})
		.catch(error => {
			throw new Error(error)
		})
	}
}
