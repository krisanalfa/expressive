/// <reference types="webpack-env" />

import './bootstrap'
import Vue from 'vue'
import { Components } from './components'

Vue.config.productionTip = false

Vue.use(new Components())

export const app = new Vue({ el: '#app' })

module.hot && module.hot.accept()
