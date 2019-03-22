<template>
  <div class="home">
    <black-box></black-box>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import BlackBox from '@/components/BlackBox.vue'

export default {
  name: 'home',
  components: {
    BlackBox
  }
}
</script>
