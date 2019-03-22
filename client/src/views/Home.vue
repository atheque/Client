<template>
  <div class="home">
    <my-navbar
      @show-modal="showModal('username')"
      @show-leaderboard="showModal('leaderboard')"
      @create-room="showModal('createRoom')"/>
    <create-room/>
    <username-modal/>
    <room-list
      :rooms="rooms"/>
    <leaderboard/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

import MyNavbar from '@/components/navbar.vue'
import UsernameModal from '@/components/enterUsername.vue'
import { mapMutations, mapState, mapActions } from 'vuex'
import RoomList from '@/components/roomList.vue'
import Leaderboard from '@/components/leaderboard.vue'
import CreateRoom from '@/components/modalCreate.vue'
import db from '@/api/firebase.js'

export default {
  name: 'home',
  components: {
    MyNavbar,
    UsernameModal,
    RoomList,
    Leaderboard,
    CreateRoom
  },
  data() {
    return {
      modal: '',
      rooms: []
    }
  },
  created() {
    if(localStorage.getItem('username')) {
      this.validateLogin()
    }
    db.collection("Rooms")
      .onSnapshot((querySnapshot) => {
          this.rooms = []
          querySnapshot.forEach(doc => {
            this.rooms.push({
              name: doc.id,
              currentPlayer: doc.data().players.length,
              maxPlayer: doc.data().maxPlayer
            })
          });
          console.log(this.rooms)
      }, (error) => {
          console.log(error)
      });
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
      } else if(param === 'leaderboard') {
        $('#basicExampleModal').modal('toggle')
      } else if(param === 'createRoom') {
        $('#modalLRForm').modal('toggle')
      }
    }
  }
}
</script>
