/// <reference types="webpack-env" />

import './bootstrap'
import Vue from 'vue'
import { Components } from './components'

Vue.config.productionTip = false

Vue.use(new Components())

export const app = new Vue({ el: '#app', mounted () { this.$el.style.display = '' } })

// Required on each 'page' module to make HMR works
// If you create a page, make sure you add below line,
// otherwise, HMR will not working
if (process.env.NODE_ENV !== 'production') {
  module.hot && module.hot.accept()
}
