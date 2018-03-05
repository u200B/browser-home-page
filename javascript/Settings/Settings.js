/* eslint no-unused-vars: [2, {'varsIgnorePattern':'Settings'}] */

class Settings {
  static upload(file) {
    ImageHandler.upload(file)
  }

  static loadCurrentBackgroundImagesSection() {
    return new Promise((resolve, reject) => {
      let documentString = `Current Background Images`
      IndexedDBManager.getAllImagesWithKeys()
        .then(images => {
          let promiseArray = []
          images.forEach(image => {
            promiseArray.push(new Promise((resolve,reject) => {
              HTML5FileAPIManager.convertFileToDataUrl(image.value)
                .then(dataUrl => {
                  resolve({key: image.key, dataUrl: dataUrl})
                })
                .catch(error => {
                  reject(error)
                })
            }))
          })

          Promise.all(promiseArray)
            .then(dataUrls => {
              dataUrls.forEach((dataUrl, index) => {
                documentString += LOCALSTORAGEOBJECT.get()
                  .backgroundImageKey === dataUrl.key ?
                  `</br><dd>CurrentBackground:<dd>` : ``
                documentString += (
                  LOCALSTORAGEOBJECT.get().backgroundImageKey === dataUrl.key &&
                  LOCALSTORAGEOBJECT.get().randomBackgrounds
                ) ?
                  `<dd>(Disable Random Background To Use This Image)<dd>` : ``
                documentString += `
                  <dd>
                    <div style='vertical-align: middle; float: left'>${index}</div>
                    <image src=${dataUrl.dataUrl} style='height: 50px; width: 80px'>
                    <input id='selectBackground' onclick='Settings.updateSettings("backgroundImageKey", ${dataUrl.key})' type='button' value='Set As Background'>
                    <input id='deleteImage' onclick='Settings.clearImageByKey(${dataUrl.key})' type='button' value='Delete Image'><br>
                  </dd>
                `
              })
              document.getElementById('currentBackgroundImagesSection')
                .innerHTML = documentString
              document.getElementById('loadCurrentBackgroundImagesSection')
                .outerHTML = ''
              resolve()
            })
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  static clearImageByKey(key) {
    if (LOCALSTORAGEOBJECT.get().backgroundImageKey === key) {
      LOCALSTORAGEOBJECT.addKeyValue('backgroundImageKey', -1)
    }
    ImageHandler.clearImageByKey(key)
  }
  
  static clearAllImages() {
    ImageHandler.clearAllImages()
  }

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
    location.reload()
  }

  static clearAllSettings() {
    LOCALSTORAGEOBJECT.destroy()
    this.clearAllImages()
  }
}
