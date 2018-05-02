'use strict'
const $loadBtn = document.querySelector('#image_picker')
const $brightBtn = document.querySelector('#bright_button')
const $rgbBtn = document.querySelector('#rgb_button')
const $redBtn = document.querySelector('#red_button')
const $greenBtn = document.querySelector('#green_button')
const $blueBtn = document.querySelector('#blue_button')
const $canvas = document.querySelector('#image_holder')
const ctx = $canvas.getContext('2d')

$loadBtn.addEventListener('change', () => {
  if ($loadBtn.files.length > 0) {
    setImage($loadBtn.files[0])
  }
})

$brightBtn.addEventListener('click', () => {
  sortImage((a, b) => {
    let first = a[0] + a[1] + a[2]
    let second = b[0] + b[1] + b[2]
    return first > second ? 1 : first == second ? 0 : -1;
  })
})
$rgbBtn.addEventListener('click', () => {
  sortImage((a, b) => {
    let first = a[0] * 0xffff + a[1] * 0xff + a[2]
    let second = b[0] * 0xffff + b[1] * 0xff + b[2]
    return first > second ? 1 : first == second ? 0 : -1;
  })
})
$redBtn.addEventListener('click', () => {
  sortImage((a, b) => {
    let first = a[0]
    let second = b[0]
    return first > second ? 1 : first == second ? 0 : -1;
  })
})
$greenBtn.addEventListener('click', () => {
  sortImage((a, b) => {
    let first = a[0 + 1]
    let second = b[0 + 1]
    return first > second ? 1 : first == second ? 0 : -1;
  })
})
$blueBtn.addEventListener('click', () => {
  sortImage((a, b) => {
    let first = a[0 + 2]
    let second = b[0 + 2]
    return first > second ? 1 : first == second ? 0 : -1;
  })
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

function sortImage(comparator) {
  let imageData = ctx.getImageData(0, 0, $canvas.width, $canvas.height)
  let data = imageData.data

  let tempArray = []

  for (let i = 0; i < data.length; i += 4) {
    tempArray.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
  }
  tempArray.sort(comparator)
  for (let i = 0; i < tempArray.length; i++) {
    data[i * 4] = tempArray[i][0]
    data[i * 4 + 1] = tempArray[i][1]
    data[i * 4 + 2] = tempArray[i][2]
    data[i * 4 + 3] = tempArray[i][3]
  }
  ctx.putImageData(imageData, 0, 0)
}