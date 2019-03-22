<template>
  <div class="home">
    <my-navbar
      @show-modal="showModal('username')"/>
    <username-modal/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import MyNavbar from '@/components/navbar.vue'
import UsernameModal from '@/components/enterUsername.vue'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    MyNavbar,
    UsernameModal
  },
  data() {
    return {
      modal: ''
    }
  },
  created() {
    if(localStorage.getItem('username')) {
      this.validateLogin()
    }
  },
  computed: {
    ...mapState([
      'username',
      'isLogin'
    ])
  },
  methods: {
    ...mapActions([
      'validateLogin'
    ]),
    showModal (param) {
      if(param === 'username') {
        console.log(param)
        $('#modalLoginAvatar').modal('toggle')
      }
    }
  }
}
</script>
