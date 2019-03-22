<template>
    <div>
        <div class="modal fade" id="modalLoginAvatar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
            aria-hidden="true">
            <div class="modal-dialog cascading-modal modal-avatar modal-sm" role="document">
                <!--Content-->
                <div class="modal-content">

                <!--Header-->
                <div class="modal-header">
                    <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.jpg" alt="avatar" class="rounded-circle img-responsive">
                </div>
                <!--Body-->
                <div class="modal-body text-center mb-1">

                    <div class="md-form ml-0 mr-0">
                    <input type="text" id="form29" class="form-control form-control-sm validate ml-0" placeholder="Username" v-model="usernameForm">
                    <label data-error="wrong" data-success="right" for="form29" class="ml-0"></label>
                    </div>

                    <div class="text-center mt-4">
                    <button class="btn btn-cyan mt-1" @click="validateForm(usernameForm)">Submit<i class="fas fa-sign-in ml-1"></i></button>
                    </div>
                </div>

                </div>
                <!--/.Content-->
            </div>
        </div>
        <!--Modal: Login with Avatar Form-->

        <!-- BUTTON -->
        <!-- <div class="text-center">
        <a href="" class="btn btn-default btn-rounded" data-toggle="modal" data-target="#modalLoginAvatar">Enter Username</a>
        </div> -->
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'


export default {
    data() {
        return {
            usernameForm: ''
        }
    },
    computed: {
        ...mapState([
            'isLogin',
            'username'
        ])
    },
    watch: {
        isLogin() {
            this.usernameForm = ''
        }
    },
    methods: {
        ...mapMutations([
            'SET_LOGIN',
            'SET_USERNAME'
        ]),
        ...mapActions([
            'validateForm'
        ])
    }
}

</script>
