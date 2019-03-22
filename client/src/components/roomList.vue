<template>
    <div class="container">

        <div class="row">

        <div class="col">

            <div class="card card-bordered" style="z-index:-4">
            <div class="card-header" style="background-color: skyblue;"><p>Rooms</p></div>
            <div class="card-body" style="z-index:-3">
                <div style="display:flex; z-index:-2">
                <div class="card-header col-sm-2">No</div>
                <div class="card-header col-sm-8">Room Name</div>
                <div class="card-header col-sm-2">Players</div>
                </div>
                
                <div v-for="(room, index) in rooms" :key="index" class="clickable">
                    <div v-if="room.currentPlayer > 0 || room.currentPlayer === room.maxPlayer" style="display:flex; z-index:-1">
                        <div class="card col-sm-2" style="z-index: -1" >
                            <div class="card-body">{{ index + 1 }}</div>
                        </div>

                        <div class="card col-sm-8">
                            <div class="card-body">{{ room.name }}</div>
                        </div>
                        
                        <div class="card col-sm-2">
                            <div class="card-body">{{ room.currentPlayer }} / {{ room.maxPlayer }} </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ['rooms']
}

</script>

<style scoped>

.clickable:hover {
    background-color: lightblue !important;
    z-index: 1;
    cursor: pointer
}

</style>