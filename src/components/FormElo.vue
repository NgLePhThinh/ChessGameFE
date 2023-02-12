<template>
    <Form @submit="submitReporter()" class="formreporter">

        <div class="form-group ">
            <label for="whiteplayer">Player</label>
            <input type="text" name="whiteplayer" v-model="WhiteName" class="display-flex">
            <div v-for="(item, i) in listPlayer1" :key="i" class="display-flex">
                <div class="listPlayer" @click="setPlayerWhite(item)">{{ item.firstName }} {{ item.lastName }}</div>
            </div>
        </div>
        <div class="form-group ">
            <label for="date">Date</label>
            <input type="text" name="date" v-model="chesseloLocal.date" class="display-flex">
        </div>
        <div class="form-group">
            <label for="std">Std</label>
            <input type="text" name="std" v-model="chesseloLocal.std">
        </div>
        <div class="form-group">
            <label for="reapid">Rapid</label>
            <input class="display-flex" type="text" name="rapid" v-model="chesseloLocal.rapid">
        </div>
        <div class="form-group">
            <label for="blitz">Blitz</label>
            <input class="display-flex" type="text" name="blitz" v-model="chesseloLocal.blitz">
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
    emits: ["submit:chesselo"],
    data() {
        return {
            WhiteName: '',
            listPlayer1: [],
            listPlayer11: [],
            chesseloLocal: {
                idPlayer: '',
                date: [],
                std: [],
                rapid: [],
                blitz: []
            }
        };
    },
    methods: {
        async getListPlayer() {
            try {
                const result = await axios.get('http://localhost:3000/api/players');
                this.listPlayer11 = result.data;
            } catch (err) {
                console.log(err);
            }
        },
        convert(str) {
            // str = str.replace(/\t/g, '');
            str = str.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            return str;
        },
        submitReporter() {
            this.chesseloLocal.date = this.chesseloLocal.date.replace(/\t/g,'').split(',');
            this.chesseloLocal.std = this.convert(this.chesseloLocal.std);
            this.chesseloLocal.rapid =this.convert(this.chesseloLocal.rapid);
            this.chesseloLocal.blitz =this.convert(this.chesseloLocal.blitz);
            console.log(this.chesseloLocal);
            this.$emit("submit:chesselo",this.chesseloLocal);
        },
        setPlayerWhite(player) {
            this.chesseloLocal.idPlayer = player._id;
            for (let i = 0; i < this.listPlayer1.length; i++) {
                let str = this.listPlayer1[i].firstName + ' ' + this.listPlayer1[i].lastName
                if (str.localeCompare(player.firstName + ' ' + player.lastName) == 0) {
                    this.listPlayer1.unshift(this.listPlayer1[i]);
                    break;
                }
            }
            while (this.listPlayer1.length > 1)
                this.listPlayer1.pop();
        },
    },
    watch: {
        WhiteName: function () {
            this.listPlayer1 = []
            this.listPlayer11.forEach(item => {
                var str = item.firstName + ' ' + item.lastName
                if (str.indexOf(this.WhiteName) >= 0) {
                    this.listPlayer1.push(item)
                }
            })
        },
    }
}
</script>

<style scoped>
.formreporter {
    width: 100%;
}

.formreporter>div {
    width: 100%;
}

.display-flex {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
}

textarea {
    width: 100%;
    outline: none;
}

input {
    width: 100%;
    height: 30px;
    font-size: 1em;
    outline: none;
}

.listPlayer:hover {
    background-color: rgb(163, 176, 176);
}

.listPlayer {
    width: 100%;
    padding-left: 5px;
    margin-bottom: 2px;
    box-sizing: border-box;
}

.listPlayer:nth-child(2n) {
    background-color: aqua;
}

button {
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

