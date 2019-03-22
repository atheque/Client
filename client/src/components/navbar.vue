<template>
    <!--Navbar -->
    <nav class="mb-3 navbar navbar-expand-lg navbar-dark info-color">
        <div class="container">
            <a class="navbar-brand" href="#">ATheQue</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
                aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
                <ul class="navbar-nav ml-auto">
                <li v-if="isLogin" class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="" style="cursor: default">
                    <i class="fas fa-user"></i>{{username}}</a>
                </li>
                <li v-if="isLogin" class="nav-item active">
                    <a class="nav-link" href="#" @click.prevent="$emit('create-room')">
                        <i class="fas fa-door-open"></i> Create
                        <span class="sr-only">(current)</span>
                    </a>
                </li>
                <li v-if="!isLogin" class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="$emit('show-modal')">
                    <i class="fas fa-user"></i>Username</a>
                </li>
                <li v-if="isLogin" class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="logout">
                    <i class="fas fa-sign-out-alt"></i>Logout</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" @click.prevent="$emit('show-leaderboard')">
                    <i class="fas fa-trophy"></i>Leaderboard</a>
                </li>
                </ul>
            </div>
        </div>
    </nav>
    <!--/.Navbar -->
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState([
            'isLogin',
            'username'
        ])
    },
    methods: {
        ...mapMutations([
            'SET_LOGIN',
            'SET_USERNAME'
        ]),
        ...mapActions([
            'validateForm',
            'updateStatus'
        ]),
        logout() {
            this.updateStatus({
                username: localStorage.getItem('username'), 
                status: false
            })
        }
    }
}

</script>