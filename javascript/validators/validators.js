const HTML5FileAPISupport = () => {
  return window.File && window.FileReader && window.FileList && window.Blob ?
    true : false
}

const IndexDBSupport = () => {
  return window.indexDB ? true : false
}
