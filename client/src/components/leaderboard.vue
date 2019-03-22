<template>
    <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-trophy"></i> Leaderboard</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="card-body">
                <ul class="list-group">
                <li v-for="(player, index) in listPlayers" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                    {{(index + 1)}}. {{player.name}}
                    <span style="cursor: default">
                    <span class="badge badge-primary badge-pill mr-2">{{player.score}}</span>   
                    <span v-if="player.status" class="badge badge-success badge-pill">online</span>
                    <span v-if="!player.status" class="badge badge-light badge-pill">offline</span>
                    </span>
                </li>
                </ul>
            </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>

import db from '@/api/firebase.js'

export default {
    data(){
        return {
            listPlayers: []
        }
    },
    created(){
        db.collection("Users")
            .onSnapshot((querySnapshot) => {
                this.listPlayers = []
                querySnapshot.forEach(doc => {
                    this.listPlayers.push({
                        name: doc.id,
                        score: doc.data().score,
                        status: doc.data().status
                    })
                });
                this.listPlayers = this.listPlayers.sort((before, after) => after.score - before.score)
                this.listPlayers = this.listPlayers.slice(0, 9)
            }, (error) => {
                console.log(error)
            });
    }
}

</script>
