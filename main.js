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
  betterSort()
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

// function sortImage() {
//   let imageData = ctx.getImageData(0, 0, $canvas.width, $canvas.height)
//   let data = imageData.data
//   for (let i = 0; i < data.length - 4; i += 4) {
//     for (let j = i + 4; j < data.length; j += 4) {
//       let first = data[i] * 0xffff + data[i + 1] * 0xff + data[i + 2]
//       let second = data[j] * 0xffff + data[j + 1] * 0xff + data[j + 2]
//       if (first > second) {
//         let swap = [data[i], data[i + 1], data[i + 2], data[i + 3]]
//         data[i] = data[j]
//         data[i + 1] = data[j + 1]
//         data[i + 2] = data[j + 2]
//         data[i + 3] = data[j + 3]
//         data[j] = swap[0]
//         data[j + 1] = swap[1]
//         data[j + 2] = swap[2]
//         data[j + 3] = swap[3]
//       }
//     }
//     console.log(i)
//   }
//   ctx.putImageData(imageData, 0, 0)
// }

function betterSort() {
  let imageData = ctx.getImageData(0, 0, $canvas.width, $canvas.height)
  let data = imageData.data

  let tempArray = []

  for (let i = 0; i < data.length; i += 4) {
    tempArray.push([data[i], data[i + 1], data[i + 2], data[i + 3]])
  }
  tempArray.sort((a, b) => {
    let first = a[0] * 0xffff + a[1] * 0xff + a[2]
    let second = b[0] * 0xffff + b[1] * 0xff + b[2]
    return first > second ? 1 : first == second ? 0 : -1;
  })
  for (let i = 0; i < tempArray.length; i++) {
    data[i * 4] = tempArray[i][0]
    data[i * 4 + 1] = tempArray[i][1]
    data[i * 4 + 2] = tempArray[i][2]
    data[i * 4 + 3] = tempArray[i][3]
  }
  ctx.putImageData(imageData, 0, 0)
}