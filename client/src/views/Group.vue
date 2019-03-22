<template>
  <div>
    <div class="container">
      <button>ok</button>
      <div class="row-sm-2">
        <!--  -->
        <div class="room col-md-9">
          <div class="soal">
            <div class="simple-login-container">
              <h2>Login Form</h2>
              <div class="row">
                <div class="col-md-12 form-group">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur porro sapiente impedit animi repudiandae quod asperiores voluptas iure omnis dolore, recusandae voluptatibus, nostrum ex quos? Eligendi necessitatibus sit autem incidunt, aliquid tenetur aspernatur, mollitia qui repellat cum officiis delectus ex nostrum quia soluta perspiciatis sunt ab ea eos sequi animi?</p>
                </div>
                <div class="jawaban jawabA col-md-6 form-group">
                  <h1>A</h1>
                </div>
                <div class="jawaban jawabA col-md-6 form-group">
                  <h1>b</h1>
                </div>
                <div class="jawaban jawabA col-md-6 form-group">
                  <h1>c</h1>
                </div>
                <div class="jawaban jawabA col-md-6 form-group">
                  <h1>d</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="online col-md-3">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <h3 class="panel-title">
                <span class="glyphicon glyphicon-circle-arrow-right"></span>friends online
              </h3>
            </div>

            <div class="panel-footer">
              <div v-for="item in data">
                <h5>{{item.username}}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/api/firebase.js";

export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    tambah() {}
  },
  beforeMount() {
    db.collection("online")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(`${doc.id} => ${doc.data()}`);
          this.data.push(doc.data());
        });
      });
  }
};
</script>

<style>
.jawabA {
  background-color: #3caea3;
}

.jawabA:active {
  background-color: whitesmoke;
}

.jawaban {
  border: 5px solid #dedede;
}
.online {
  position: relative;
  height: 500px;
  border: 5px solid #dedede;
}
.room {
  position: relative;
  height: 500px;
  border: 5px solid #dedede;
}
body {
  margin-top: 20px;
  background-color: whitesmoke;
}
.panel-body:not(.two-col) {
  padding: 0px;
}
.glyphicon {
  margin-right: 5px;
}
.glyphicon-new-window {
  margin-left: 5px;
}
.panel-body .radio,
.panel-body .checkbox {
  margin-top: 0px;
  margin-bottom: 0px;
}
.panel-body .list-group {
  margin-bottom: 0;
}
.margin-bottom-none {
  margin-bottom: 0;
}
.panel-body .radio label,
.panel-body .checkbox label {
  display: block;
}
</style>
