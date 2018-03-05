/* eslint no-unused-vars: [2, {'varsIgnorePattern':'OnLoad'}] */

class OnLoad {
  static loadLocalStorageConfiguration() {
    LOCALSTORAGEOBJECT = new LocalStorageManager('homepage_localstorage',
      'OBJECT')
    LOCALSTORAGEOBJECT.create()
    document.getElementById('randomBackgrounds')
      .checked = LOCALSTORAGEOBJECT.get().randomBackgrounds
    document.getElementById('hideSettingsButton')
      .checked = LOCALSTORAGEOBJECT.get().hideSettingsButton
    document.getElementById('stopSettingsButtonAnimation')
      .checked = LOCALSTORAGEOBJECT.get().stopSettingsButtonAnimation
    document.getElementById('showSearchBar')
      .checked = LOCALSTORAGEOBJECT.get().showSearchBar
    document.getElementById('enableDebugger')
      .checked = LOCALSTORAGEOBJECT.get().enableDebugger
    document.getElementById('showLinkContainer')
      .checked = LOCALSTORAGEOBJECT.get().showLinkContainer
  }

  static settingsClickMonitor() {
    document.addEventListener('click', (event) => {
      var isClickInside = document.getElementById('settings-container').contains(event.target) || document.getElementById('settings-button').contains(event.target)
      if (!isClickInside) {
        Settings.toggleSettingsVisibility(true)
      }
    })
  }

  static loadLastSetImage(imageKey) {
    IndexedDBManager.getAllImagesWithKeys()
      .then(images => {
        let imageIndex = images.length - 1
        if (images.length) {
          if (imageKey) {
            images.forEach((image, index) => {
              if (imageKey === image.key) {
                imageIndex = index
              }
            })
          }
          return HTML5FileAPIManager.convertFileToDataUrl(
            images[imageIndex].value
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

  static loadUserLinks() {
    let userLinksSection = ``
    LOCALSTORAGEOBJECT.get().userLinks.forEach(userLink => {
      userLinksSection += `<a href=${userLink.url} target='_blank'>${userLink.commonName}</a></br>`
    })
    document.getElementById('userLinksSection').innerHTML = userLinksSection
  }
}
