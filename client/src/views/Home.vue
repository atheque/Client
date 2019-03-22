<template>
  <div class="home">
    <my-navbar
      @show-modal="showModal('username')"/>
    <username-modal/>
    <room-list/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import MyNavbar from '@/components/navbar.vue'
import UsernameModal from '@/components/enterUsername.vue'
import { mapMutations, mapState, mapActions } from 'vuex'
import RoomList from '@/components/roomList.vue'

export default {
  name: 'home',
  components: {
    MyNavbar,
    UsernameModal,
    RoomList
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
        $('#modalLoginAvatar').modal('toggle')
      }
    }
  }
}
</script>
