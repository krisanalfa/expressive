import * as $ from 'jquery'

$(document).ready(_ => {
  console.log('Document ready')
})

// Required on each 'page' module to make HMR works
// If you create a page, make sure you add below line,
// otherwise, HMR will not working
module.hot && module.hot.accept()
