'use strict'
const $loadBtn = document.querySelector('#image_picker')
const $brightBtn = document.querySelector('#bright_button')
const $rgbBtn = document.querySelector('#rgb_button')
const $redBtn = document.querySelector('#red_button')
const $greenBtn = document.querySelector('#green_button')
const $blueBtn = document.querySelector('#blue_button')
const $originalBtn = document.querySelector('#show_original')
const $canvas = document.querySelector('#image_holder')
const ctx = $canvas.getContext('2d')
let original

const $ownBtn = document.querySelector('#own_button')
const $editor = ace.edit("fun_editor")
$editor.setTheme("ace/theme/textmate")
$editor.session.setMode("ace/mode/javascript")
$editor.session.setUseWrapMode(true)
$editor.session.setTabSize(2)
$editor.setShowPrintMargin(false)
$editor.setValue('/*\nfunction must return 1 if a is greater than b, 0 if a and b are equal or -1 if a is less than b\n[0] == red, [1] == green, [2] == blue, [3] == alpha\n*/\n(a, b) => {\n\treturn a[0] > b[0] ? 1 : a[0] == b[0] ? 0 : -1\n}')

$loadBtn.addEventListener('change', () => {
  if ($loadBtn.files.length > 0) {
    setImage($loadBtn.files[0])
  }
})
$originalBtn.addEventListener('click', () => {
  showOriginal()
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
    let first = a[1]
    let second = b[1]
    return first > second ? 1 : first == second ? 0 : -1;
  })
})
$blueBtn.addEventListener('click', () => {
  sortImage((a, b) => {
    let first = a[2]
    let second = b[2]
    return first > second ? 1 : first == second ? 0 : -1;
  })
})
$ownBtn.addEventListener('click', () => {
  sortImage(eval($editor.value))
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
    original = ctx.createImageData($canvas.width, $canvas.height)
    original.data.set(ctx.getImageData(0, 0, $canvas.width, $canvas.height).data)
  }
  let url = window.URL.createObjectURL(file)
  image.src = url
}

function sortImage(comparator) {
  if ($canvas.width == 0 || $canvas.height == 0) {
    return;
  }
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

function showOriginal() {
  ctx.putImageData(original, 0, 0)
}