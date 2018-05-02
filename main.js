'use strict'
const $loadBtn = document.querySelector('#image_picker')
const $sortBtn = document.querySelector('#sort_button')
const $canvas = document.querySelector('#image_holder')
const ctx = $canvas.getContext('2d')

$loadBtn.addEventListener('change', () => {
  if ($loadBtn.files.length > 0) {
    setImage($loadBtn.files[0])
  }
})

$sortBtn.addEventListener('click', () => {
  sortImage()
})

function setImage(file) {
  let image = new Image()
  image.onerror = () => {
    console.log('Failed to load an image')
  }
  image.onload = () => {
    $canvas.width = image.width
    $canvas.height = image.height
    ctx.drawImage(image, 0, 0)
  }
  let url = window.URL.createObjectURL(file)
  image.src = url
}

function sortImage() {
  
}