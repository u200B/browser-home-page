/* eslint no-unused-vars: [2, {'varsIgnorePattern':'DragElement'}] */

class DragElement {
  static dragElement(elmnt, elmntDragger, localStorageKey) {
    let element = document.getElementById(elmnt)
    const elementMouseDrag = (e) => {
      e = e || window.event
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      element.style.top = (element.offsetTop - pos2) + "px"
      element.style.left = (element.offsetLeft - pos1) + "px"
    }

    const elementTouchDrag = (e) => {
      e = e || window.event
      pos1 = pos3 - e.touches[0].clientX
      pos2 = pos4 - e.touches[0].clientY
      pos3 = e.touches[0].clientX
      pos4 = e.touches[0].clientY
      element.style.top = (element.offsetTop - pos2) + "px"
      element.style.left = (element.offsetLeft - pos1) + "px"
    }

    const closeDragElement = () => {
      document.onmouseup = null
      document.ontouchend = null
      document.onmousemove = null
      document.ontouchmove = null

      LOCALSTORAGEOBJECT.addKeyValue(localStorageKey, {
        top: element.style.top,
        left: element.style.left
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
    if (document.getElementById(elmntDragger)) {
      document.getElementById(elmntDragger).onmousedown = dragMouseDown
      document.getElementById(elmntDragger).ontouchstart = dragTouchDown
    } else {
      elmnt.onmousedown = dragMouseDown
      elmnt.ontouchstart = dragTouchDown
    }
  }
}
