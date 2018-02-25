/*** HTML5 FILE API MANAGER ***/
// NOTE, look into IndexDB and allowing larger localStorage size limit
let localStorageImageManager = new LocalStorageManager(LOCALSTORAGE_IMAGECACHENAME, 'ARRAY')

const storeImage = (file) => {
		var reader = new FileReader();
		reader.onload = (event) => {
			the_url = event.target.result
      localStorageImageManager.append(the_url)
      document.getElementById('body').background=the_url
		}
		reader.readAsDataURL(file)
	}

const handleFileUpload = (files) => {
  storeImage(document.getElementById('file').files[0])
}

document.getElementById('file').addEventListener('change', handleFileUpload, false)
