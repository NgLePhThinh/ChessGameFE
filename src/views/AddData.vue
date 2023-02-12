<template>
    <div class="add-data">
        <ul class="add-option">
            <li @click="togglePlayer()">Add Player</li>
            <li @click="toggleElo()">Add Player Elo</li>
            <li @click="toggleReporter()">Add Reporter</li>
        </ul>
        <FormPlayer  @submit:player="createPlayer"  v-if="isFormPlayer"/>
        <FormElo @submit:chesselo="createChesselo"  v-if="isFormElo"/>
        <FormReporter @submit:reporter="createReporter" v-if="isFormReporter" />
        <p>{{ message }}</p>
    </div>

</template>



<script>
import axios from 'axios';
import FormPlayer from '../components/FormPlayer.vue';
import FormReporter from '../components/FormReporter.vue'
import FormElo from '../components/FormElo.vue'
import ChessReporterService from '../services/chessreporter.service'
import PlayerService from '../services/player.service';
export default{
    components:{
        FormPlayer,
        FormReporter,
        FormElo,
    },
    created(){
        this.massage = "";
    },
    data() {
        return{
            isFormPlayer: true,
            isFormReporter: false,
            isFormElo: false,
            message: "", 
        };
    },
    methods:{
        async createReporter(data) {
            try {
                await ChessReporterService.create(data);
                this.message = "The reporter have been created!!!";
            } catch (error) {
                console.log(error);
            }
        },
        togglePlayer(){
            this.isFormPlayer = true;
            this.isFormReporter = false;
            this.isFormElo = false;
        },
        toggleElo(){
            this.isFormPlayer =false ;
            this.isFormReporter = false;
            this.isFormElo = true;
        },
        toggleReporter(){
            this.isFormPlayer = false;
            this.isFormReporter = true;
            this.isFormElo = false;
        },
        async createPlayer(data){
            try {
                await PlayerService.create(data);
                this.message = "The player have been created!!!";
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
<style scoped>
.add-data{
    padding: 0 10%;
    background-color: #f5f4f9;
}
.add-option{
    list-style: none;
    display: flex;
    align-items: center;
}
.add-option li{
    width: fit-content;
    font-size: 1.5em;
    line-height: 1.5em;
    padding: 0.5em 1em 0.5em 0.5em;
    margin-right: 20px;
    background-color: #334166;
    color: white;
}

</style>