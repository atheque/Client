<template>
    <div class="container">
        <!--Modal: Login / Register Form-->
        <div class="modal fade" id="modalLRForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog cascading-modal" role="document">
            <!--Content-->
            <div class="modal-content">

            <!--Modal cascading tabs-->
            <div class="modal-c-tabs">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" data-toggle="tab" href="#panel7" role="tab" @click.prevent="private = false">
                    Public</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="tab" href="#panel8" role="tab" @click.prevent="private = true">
                    Private</a>
                </li>
                </ul>

                <!-- Tab panels -->
                <div class="tab-content">
                <!--Panel 7-->
                <div class="tab-pane fade in show active" id="panel7" role="tabpanel">

                    <!--Body-->
                    <div class="modal-body mb-1">
                    <div class="md-form form-sm mb-5">
                        <input type="text" id="modalLRInput10" class="form-control form-control-sm validate" placeholder="Room Name" v-model="roomname">
                        <label data-error="wrong" data-success="right" for="modalLRInput10"></label>
                    </div>

                    <div class="md-form form-sm mb-4">
                        <select class="browser-default custom-select" v-model="maxPlayer">
                            <option selected>Select Person</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">Four</option>
                            <option value="5">Five</option>
                            <option value="6">Six</option>
                            <option value="7">Seven</option>
                            <option value="8">Eight</option>
                            <option value="9">Nine</option>
                            <option value="10">Ten</option>
                        </select>
                    </div>
                    <div class="text-center mt-2">
                        <button class="btn btn-info" @click.prevent="createRoom">Create</button>
                    </div>
                    </div>
                    <!--Footer-->
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                    </div>

                </div>
                <!--/.Panel 7-->

                <!--Panel 8-->
                <div class="tab-pane fade" id="panel8" role="tabpanel">

                    <!--Body-->
                    <div class="modal-body">
                    <div class="md-form form-sm mb-5">
                        <input type="text" id="modalLRInput12" class="form-control form-control-sm validate" placeholder="Room Name" v-model="roomname">
                        <label data-error="wrong" data-success="right" for="modalLRInput12"></label>
                    </div>

                    <div class="md-form form-sm mb-5">
                        <input type="text" id="modalLRInput13" class="form-control form-control-sm validate" placeholder="Room Password" v-model="password">
                        <label data-error="wrong" data-success="right" for="modalLRInput13"></label>
                    </div>

                    <div class="md-form form-sm mb-4">
                        <select class="browser-default custom-select" v-model="maxPlayer">
                            <option selected>Select Person</option>
                            <option value="2" :value="2">Two</option>
                            <option value="3" :value="3">Three</option>
                            <option value="4" :value="4">Four</option>
                            <option value="5" :value="5">Five</option>
                            <option value="6" :value="6">Six</option>
                            <option value="7" :value="7">Seven</option>
                            <option value="8" :value="8">Eight</option>
                            <option value="9" :value="9">Nine</option>
                            <option value="10" :value="10">Ten</option>
                        </select>
                    </div>

                    <div class="text-center form-sm mt-2">
                        <button class="btn btn-info" @click.prevent="createRoom">Create</button>
                    </div>

                    </div>
                    <!--Footer-->
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-info waves-effect ml-auto" data-dismiss="modal">Close</button>
                    </div>
                </div>
                <!--/.Panel 8-->
                </div>

            </div>
            </div>
            <!--/.Content-->
        </div>
        </div>
        <!--Modal: Login / Register Form-->

        <!-- <div class="text-center">
        <a href="" class="btn btn-default btn-rounded my-3" data-toggle="modal" data-target="#modalLRForm">Create Room</a>
        </div> -->
    </div>
</template>

<script>

import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  name: 'modal-create',
  data () {
    return {
      private: false,
      roomname: '',
      password: '',
      maxPlayer: ''
    }
  },
  computed: {
    ...mapState([
        'roomCreated'
    ])
  },
  watch: {
    roomCreated(value){
        if(value) {
            this.private= false
            this.roomname= ''
            this.password= ''
            this.maxPlayer= ''
            this.CLEAR_FORM()
        }
    }
  },
  methods: {
      ...mapMutations([
          'CLEAR_FORM'
      ]),
      ...mapActions([
          'checkRoom'
      ]),
      createRoom(){
          this.checkRoom({
              roomname: this.roomname,
              maxPlayer: this.maxPlayer,
              private: this.private,
              password: this.password
          })
      }
  }
}
</script>
