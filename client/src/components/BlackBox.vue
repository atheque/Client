<template>
  <div>

    <iframe
      v-if="musicPlay === true"
      :src="counter === 0 ? musics[total - 1] : musics[total]"
      allow="autoplay"
      style="display: none"
      id="iframeAudio"
    ></iframe>

  </div>
</template>

<script>

import db from '@/api/firestore.js'
import { setInterval } from 'timers'
import axios from 'axios'
export default {
  name: 'boxmusic',
  data () {
    return {
      musics: [],
      counter: 10
    }
  },

  created () {
    // this.playTime()
    this.quiz
  },

  methods: {
    quiz () {
      axios
        .get(`https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple`)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },

    music () {
      axios
        .get('https://deezerdevs-deezer.p.rapidapi.com/search?q=',{
          headers: {
            'X-RapidAPI-Key':
              'QKEExjDMUgmshaUir66B2BjsvQ64p1IygALjsn8aBs19syGJVK',
            Accept: 'text/plain'
          }
        })
        .then(({ data }) => {
        })
        .catch(({ response }) => {
        })
    },

    playTime () {
      // this.counter = 10
      // setInterval(() => {
      //   this.counter -= 1
      //   if (this.startTime > 0) {
      //     this.startTime--
      //   }
      //   if (this.counter < 0) {
      //     // clearInterval(intervalId)
      //   }
      // }, 1000)
    }

  }
}
</script>
