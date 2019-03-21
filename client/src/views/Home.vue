<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <black-box></black-box>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import BlackBox from '@/components/BlackBox.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    BlackBox
  }
}
</script>
