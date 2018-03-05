/*** Load Debugger ***/
new Debugger()

/*** Setup Document With LocalStorage Configurations ***/
OnLoad.loadLocalStorageConfiguration()

if (LOCALSTORAGEOBJECT.get().fallbackImage) {
  document.getElementById('body')
    .background = LOCALSTORAGEOBJECT.get().fallbackImage
  document.getElementById('fileLoader').disabled = true
  document.getElementById('backgroundImageUploaderTitle')
    .innerHTML += ` (Multiple Images Not Supported For Your Browser,
                     Reset All Settings To Try Again, Subsequent Settings Will
                     Likely Fail On Your Browser...
                    )`
} else {
  LOCALSTORAGEOBJECT.get().randomBackgrounds ?
    OnLoad.loadRandomImage() : OnLoad.loadLastSetImage(
      LOCALSTORAGEOBJECT.get().backgroundImageKey
    )
}

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
