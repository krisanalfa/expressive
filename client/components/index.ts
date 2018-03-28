import LogoComponent from './Logo.vue'
import HelloComponent from './Hello.vue'

import { PluginObject, VueConstructor } from 'vue'

export class Components implements PluginObject<any> {
  public install (Vue: VueConstructor, _: any): void {
    Vue.component('hello', HelloComponent)
    Vue.component('logo', LogoComponent)
  }
}
