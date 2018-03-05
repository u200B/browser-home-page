/* eslint no-unused-vars: [2, {'varsIgnorePattern':'HTML5FileAPIManager'}] */

class HTML5FileAPIManager {
  static convertFileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target.result)
      }
      reader.onerror = (error) => {
        reject(error)
      }
      reader.readAsDataURL(file)
    })
  }
}
