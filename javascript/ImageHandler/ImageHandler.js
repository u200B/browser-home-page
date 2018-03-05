/* eslint no-unused-vars: [2, {'varsIgnorePattern':'ImageHandler'}] */

class ImageHandler {
  static upload(file) {
    IndexedDBManager.storeImage(file)
      .then(event => {
        return IndexedDBManager.getImageByKey(event.target.result)
      })
      .then(event => {
        return HTML5FileAPIManager.convertFileToDataUrl(event.target.result)
      })
      .then(dataUrl => {
        document.getElementById('body').background = dataUrl
      })
      .catch(() => {
        return HTML5FileAPIManager.convertFileToDataUrl(file)
      })
      .then(dataUrl => {
        LOCALSTORAGEOBJECT.addKeyValue('fallbackImage', dataUrl)
        document.getElementById('body').background = dataUrl
        location.reload()
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  static clearAllImages() {
    IndexedDBManager.clearAllImages()
      .then(() => {
        location.reload()
      })
      .catch(error => {
        location.reload()
        throw new Error(error)
      })
  }
}
