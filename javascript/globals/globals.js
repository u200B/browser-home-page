/* eslint no-unused-vars: [2, {'varsIgnorePattern':'search'}] */

let LOCALSTORAGEOBJECT

const search = (event) => {
  if (event.button === 1 || event.button === 0 || event.key === "Enter") {
    event.preventDefault();
    window.open('https://www.google.com/search?query=' +
      document.getElementById('search-input').value);
    document.getElementById('search-input').value='';
  }
}

const dragElement = (elmnt, localStorageKey) => {
  const elementMouseDrag = (e) => {
    e = e || window.event
    pos1 = pos3 - e.clientX
    pos2 = pos4 - e.clientY
    pos3 = e.clientX
    pos4 = e.clientY
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
  }

  const elementTouchDrag = (e) => {
    e = e || window.event
    pos1 = pos3 - e.touches[0].clientX
    pos2 = pos4 - e.touches[0].clientY
    pos3 = e.touches[0].clientX
    pos4 = e.touches[0].clientY
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
  }

  const closeDragElement = () => {
    document.onmouseup = null
    document.ontouchend = null
    document.onmousemove = null
    document.ontouchmove = null

    LOCALSTORAGEOBJECT.addKeyValue(localStorageKey, {
      top: elmnt.style.top,
      left: elmnt.style.left
    })
  }

  const dragMouseDown = (e) => {
    e = e || window.event
    pos3 = e.clientX
    pos4 = e.clientY
    document.onmouseup = closeDragElement
    document.onmousemove = elementMouseDrag
  }

  const dragTouchDown = (e) => {
    e = e || window.event
    pos3 = e.touches[0].clientX
    pos4 = e.touches[0].clientY
    document.ontouchmove = elementTouchDrag
    document.ontouchend = closeDragElement
  }

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-drag-section")) {
    document.getElementById(elmnt.id + "-drag-section").onmousedown = dragMouseDown
    document.getElementById(elmnt.id + "-drag-section").ontouchstart = dragTouchDown
  } else {
    elmnt.onmousedown = dragMouseDown
    elmnt.ontouchstart = dragTouchDown
  }
}

dragElement(document.getElementById(("search-container")), 'search-container-position');
