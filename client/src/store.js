import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'
import db from '@/api/firebase.js'
import router from './router'

function SWAL (type, message) {
  Swal.fire({
    position: 'top-end',
    type: type,
    title: message,
    showConfirmButton: false,
    timer: 1500
  })
}

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    roomCreated: false,
    roomList: []
  },
  mutations: {
    SET_LOGIN(state) {
      state.isLogin = true
    },
    SET_LOGOUT(state) {
      state.isLogin = false
    },
    SET_USERNAME(state, payload) {
      state.username = payload
    },
    ROOM_CREATED(state) {
      state.roomCreated = true
    },
    CLEAR_FORM(state) {
      state.roomCreated = false
    }
  },
  actions: {
    validateLogin({ commit }) {
      let docRef = db.collection('Users').doc(localStorage.getItem('username'))
      docRef.get().then((doc) => {
        if (doc.exists) {
          SWAL('success', `Welcome ${localStorage.getItem('username')}`)
          commit('SET_USERNAME', localStorage.getItem('username'))
          commit('SET_LOGIN')
        }
      })
    },

    validateForm({ commit, dispatch }, username) {
      let docRef = db.collection('Users').doc(username)
      docRef.get().then((doc) => {
        if (doc.exists) {
          if(doc.data().status === true) {
            SWAL('error', `username ${username} has been used`)
          } else {
            dispatch('updateStatus', {
              username: username,
              status: true
            })
          }
        } else {
          dispatch('submitForm', username)
        }
      }).catch(function(error) {
          SWAL('error', error)
      });
    },

    submitForm({ commit, dispatch }, username) {
      db.collection('Users').doc(username).set({
        score: 0,
        status: true
      })
        .then(() => {
          SWAL('success', `Welcome ${username}`)
          $('#modalLoginAvatar').modal('toggle')
          localStorage.setItem('username', username)
          commit('SET_USERNAME', username)
          commit('SET_LOGIN')
        })
        .catch((error) => {
          SWAL(error)
        });
    },

    updateStatus({ commit, dispatch }, payload) {
      db.collection("Users").doc(payload.username).update({
        status: payload.status,
      })
      .then(function() {
        if(payload.status) {
          SWAL('success', `Welcome ${payload.username}`)
          localStorage.setItem('username', payload.username)
          commit('SET_USERNAME', payload.username)
          commit('SET_LOGIN')
          $('#modalLoginAvatar').modal('toggle')
        } else {
          SWAL('success', `See You Again ${payload.username}`)
          commit('SET_USERNAME', '')
          commit('SET_LOGOUT')
          localStorage.removeItem('username')
        }
      });
    },

    checkRoom({ commit, dispatch, state }, payload) {
      let docRef = db.collection('Rooms').doc(payload.roomname)
      docRef.get().then((doc) => {
        if (doc.exists) {
          if(doc.data().players.length > 0) {
            SWAL('error', `roomname ${payload.roomname} has been taken`)
          } else {
            let playersList = doc.data().players
            playersList.push(state.username)
            docRef.set({
              players: playersList
            }, {merge: true})
            .then(() => {
              SWAL('success', `Create room ${payload.roomname} success`)
              $('#modalLRForm').modal('toggle')
              commit('ROOM_CREATED')
              state.$router.push(`group/${payload.roomname}`)
            })
          }
        } else {
          dispatch('createRoom', payload)
        }
      }).catch(function(error) {
          SWAL('error', error)
      });
    },

    createRoom({ commit, dispatch, state }, payload) {
      db.collection('Rooms').doc(payload.roomname).set({
        players: [],
        scores: [],
        message: '',
        musics: [],
        questions: [],
        answers: [],
        options: [],
        playerStatus: false,
        roomStatus: false,
        private: payload.private,
        maxPlayer: Number(payload.maxPlayer)
      })
        .then(() => {
          SWAL('success', `Create room ${payload.roomname} success`)
          $('#modalLRForm').modal('toggle')
          commit('ROOM_CREATED')
          console.log(this)
          console.log(router.push(`/group/${payload.roomname}`))
          console.log(app)
          // this.$router.push(`/group/${payload.roomname}`)
        })
        .catch((error) => {
          SWAL('error', error)
        });
    },

    joinRooms({ commit, dispatch, state }, payload) {
      let docRef = db.collection('Rooms').doc(payload.roomname)
      
      docRef.get()
        .then(doc => {
          let playersList = doc.data().players
            playersList.push(state.username)
            docRef.set({
              players: playersList
            }, {merge: true})
            .then(() => {
              SWAL('success', `Join a room ${payload.roomname} success`)
            })
      })
    },
    leaveRoom({ commit, dispatch, state }, payload) {
      let docRef = db.collection('Rooms').doc(payload.roomname);
      docRef.get()
        .then(doc => {
          let playersList = doc.data().players
            playersList.filter(player => player.username !== state.username)
            docRef.set({
              players: playersList
            }, {merge: true})
            .then(() => {
              SWAL('success', `Leave a room ${payload.roomname} success`)
            })
      })
    }
  }
})
