/* eslint no-unused-vars: [2, {'varsIgnorePattern':'LOCALSTORAGEOBJECT|search'}] */

let LOCALSTORAGEOBJECT

const search = (event) => {
  if (event.button === 1 || event.button === 0 || event.key === "Enter") {
    event.preventDefault();
    window.open('https://www.google.com/search?query=' +
      document.getElementById('search-input').value);
    document.getElementById('search-input').value='';
  }
}
