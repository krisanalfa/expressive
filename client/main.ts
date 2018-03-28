/// <reference types="webpack-env" />

import './bootstrap'
import Vue from 'vue'
import { Components } from './components'

Vue.config.productionTip = false

Vue.use(new Components())

export const app = new Vue({ el: '#app', mounted () { this.$el.style.display = '' } })

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install()
} else {
  // require('offline-plugin/runtime').uninstall()
  module.hot && module.hot.accept()
}
