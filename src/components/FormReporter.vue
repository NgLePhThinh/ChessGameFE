<template>
    <Form @submit="submitReporter()" class="formreporter" >
    <div class="display-flex">
        <div class="form-group">
            <label for="whiteplayer">White Player</label>
            <input type="text" name="whiteplayer" id="WhiteName" v-model="WhiteName">
            <div v-for="(item, i) in listPlayer1" :key="i">
                <div class="listPlayer" @click="setPlayerWhite(item)">{{ item.firstName }} {{ item.lastName }}</div>
            </div>
        </div>
        <div class="form-group">
            <label for="blackplayer">Black Player</label>
            <input type="text" name="blackplayer" id="BlackName" v-model="BlackName">
            <div v-for="(item, i) in listPlayer2" :key="i">
                <div class="listPlayer" @click="setPlayerBlack(item)">{{ item.firstName }} {{ item.lastName }}</div>
            </div>
        </div>
    </div>
    <div class="display-flex">
        <div class="form-group">
            <label for="whiteelo">White ELo</label>
            <input type="text" name="whiteelo"  v-model="reporterLocal.WhiteElo">
        </div>
        <div class="form-group">
            <label for="balckelo">Black Elo</label>
            <input class="display-flex" type="text" name="balckelo"  v-model="reporterLocal.BlackElo">
        </div>
    </div>
    <div class="form-group">
        <label for="event">Event</label>
        <input type="text" name="event"  v-model="reporterLocal.Event">
    </div >
    <div class="form-group">
        <label for="reporter">Reporter</label>
        <textarea cols="100" rows="10" class="display-flex" type="text" name="reporter"  v-model="reporterLocal.Reporter"></textarea>
    </div>
    <div class="form-group">
        <label for="result">Result</label>
        <input class="display-flex" type="text" name="result"  v-model="reporterLocal.Result">
    </div>
    <div class="form-group">
        <label for="reporter">Date</label>
        <input class="display-flex" type="text" name="reporter"  v-model="reporterLocal.Date">
    </div>
    <div>
        <button>Add</button>
    </div>
</Form>
</template>



<script>
import axios from 'axios';
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    created() {
        this.getListPlayer();
    },
    emits: ["submit:reporter"],
    data() {
        return {
            listPlayer1: [],
            listPlayer11: [],
            listPlayer2: [],
            listPlayer22: [],
            White: {},
            WhiteName: '',
            Black: {},
            BlackName: '',
            reporterLocal: {
                Event: '',
                White: '',
                Black: '',
                WhiteID: '',
                BlackID: '',
                Result: '',
                Date:'',
                Reporter:'',
                BlackElo: '',
                WhiteElo:'',
            }
        };
    },
    methods: {
        async getListPlayer() {
            try {
                const result = await axios.get('http://localhost:3000/api/players');
                console.log(result);
                this.listPlayer11 = result.data;
                this.listPlayer22 = result.data;

            } catch (err) {
                console.log(err);
            }
        },
        submitReporter(){
            this.$emit("submit:reporter",this.reporterLocal);
        },
        setPlayerWhite(player){
            this.reporterLocal.WhiteID = player._id;
            this.reporterLocal.White = player.firstName + ', ' + player.lastName;
            for(let i = 0; i < this.listPlayer1.length; i ++){
                let str = this.listPlayer1[i].firstName + ' ' + this.listPlayer1[i].lastName
                if( str.localeCompare(player.firstName +' '+ player.lastName) == 0){
                   this.listPlayer1.unshift(this.listPlayer1[i]);
                    break;
                }
            }
            while(this.listPlayer1.length > 1)
                this.listPlayer1.pop();
        },
        setPlayerBlack(player){
            this.reporterLocal.BlackID = player._id;
            this.reporterLocal.Black = player.firstName + ', ' + player.lastName;
            for(let i = 0; i < this.listPlayer2.length; i ++){
                let str = this.listPlayer2[i].firstName + ' ' + this.listPlayer2[i].lastName
                if( str.localeCompare(player.firstName +' '+ player.lastName) == 0){
                   this.listPlayer2.unshift(this.listPlayer2[i]);
                    break;
                }
            }
            while(this.listPlayer2.length > 1)
                this.listPlayer2.pop();
        }
    },
    watch: {
        WhiteName: function(){
            this.listPlayer1 = []
            this.listPlayer11.forEach(item=>{
                var str = item.firstName +' '+ item.lastName
                if(str.indexOf(this.WhiteName)>=0){
                    this.listPlayer1.push(item)
                }
            })
        },
        BlackName: function(){
            this.listPlayer2 = []
            this.listPlayer22.forEach(item=>{
                var str = item.firstName +' '+ item.lastName
                if(str.indexOf(this.WhiteName)>=0){
                    this.listPlayer2.push(item)
                }
                
            })
        }
    }
}
</script>

<style scoped>
.formreporter{
    width: 100%;
}
.formreporter > div{
    width: 100%;
}
.display-flex {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
}
.display-flex > div{
    width: calc(100% /2 - 10px);
}
label{
    font-weight: bold;
    margin-bottom: 5px;
}
textarea{
    width: 100%;
    outline: none;
}
input{
    width: 100%;
    height: 30px;
    font-size: 1em;
    outline: none;
}
.listPlayer:hover{
    background-color: rgb(163, 176, 176);
}
.listPlayer{
    width: 100%;
    padding-left: 5px;
    margin-bottom: 2px;
    box-sizing: border-box;
}
.listPlayer:nth-child(2n){
    background-color: aqua;
}
button{
    margin-top: 10px;
    padding: 0.3em 0.5em;
    border: none;
    outline: none;
    background-color: #334166;
    color: white;
    font-size: 1em;
    height: 50px;
    width: 100px;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    font-size: 1.2em;
    cursor: pointer; 
}
</style>

