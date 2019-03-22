<template>
  <div>
    {{ counter === -1 ? musics[total + 1] : musics[total] }}
    <iframe
      v-if="musicPlay === true"
      :src="counter === -1 ? musics[total + 1] : musics[total]"
      allow="autoplay"
      style="display: none"
      id="iframeAudio"
    ></iframe>
  </div>
</template>

<script>

require('dotenv').config()
import db from '@/api/firebase.js'
import { setInterval, clearInterval } from 'timers'
import axios from 'axios'

export default {
  name: 'boxmusic',
  data () {
    return {
      setupData: false,
      fetchData: false,
      counter: 11,
      musicPlay: false,
      musics: [],
      questions: [],
      options: [],
      answers: [],
      timer: null,
      total: 0
    }
  },

  created () {
    this.getQuiz()

    db.collection('rooms')
      .doc('CjSJQvbBKo4HiXo2qnIe')
      .onSnapshot(function(doc) {
        console.log("Current data: ", doc.data())
        this.fetchData = false
    });
  },

  watch: {
    counter(value) {
      if(value < 0) {
        console.log(this.questions[this.total])
        this.total++
        if(this.total === 6) {
          this.total = 0
          this.musicPlay = false
          clearInterval(this.timer)
        } else {
          this.counter = 10
        }
      }
    }
  },

  methods: {
    getQuiz () {
      this.fetchData = true
      this.setupData = true
      axios
        .get(`https://opentdb.com/api.php?amount=5&category=12&difficulty=easy&type=multiple`)
        .then(({ data }) => {
          data.results.forEach(result => {
            this.questions.push(result.question)
            let options = [...result.incorrect_answers, ...[result.correct_answer]]
            this.options.push(options)
            this.answers.push(result.correct_answer)
          })
          let promiseFetch = []
          this.answers.forEach(answer => {
            promiseFetch.push(new Promise((resolve, reject) => {
              this.getMusic(answer)
                .then(({ data }) => {
                  resolve(data.data[0].preview)
                })
                .catch(({ response }) => {
                  reject(response)
                })
            }))
          })
          Promise
            .all(promiseFetch)
            .then(data => {
              this.musics = data
              return this.storeFirestore({
                answers: this.answers,
                options1: this.options[0],
                options2: this.options[1],
                options3: this.options[2],
                options4: this.options[3],
                options5: this.options[4],
                questions: this.questions,
                musics: this.musics
              })
            })
            .then(() => {
              this.fetchData = false
              ///////////////////////////buat mainin lagu kalau udah di load
              // this.musicPlay = true
              this.playTime()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(({ response }) => {
          console.log(response)
        })
    },

    getMusic (keywords) {
      return axios
        .get(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${keywords}`,{
          headers: {
            'X-RapidAPI-Key': 'QKEExjDMUgmshaUir66B2BjsvQ64p1IygALjsn8aBs19syGJVK'
          }
        })
    },

    playTime () {
      this.counter = 11
      this.timer = setInterval(() => {
        this.counter -= 1
        if (this.startTime > 0) {
          this.startTime--
        }
      }, 1000)
    },

    storeFirestore (payload) {
      return db.collection('room')
        .doc('CjSJQvbBKo4HiXo2qnIe')
        .update(payload)
    }

  }
}
</script>
