<template>
  <div>
    <h3>Hello, {{ name }}!</h3>

    <div class="form-group">
      <label>What's your name?</label>
      <input type="text" class="form-control" v-model="name" @click="selectAll">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      name: 'John Doe'
    }
  },

  methods: {
    selectAll (event: { target: HTMLInputElement }) {
      event.target.setSelectionRange(0, this.name.length)
    }
  }
})
</script>
