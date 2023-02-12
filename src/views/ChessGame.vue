<template>
    <div class="chess-game">
        <div class="chess-game-left " >
            
            <div id="chess-reporter" v-if="(this.reporteractive !== null)">
                <ChessRepoterVue :srcreporter="reporteractive.Reporter" />
            </div>
        </div>
        <div class="chess-game-right">
            <div class="chess-game-info" v-if="white">
                <div class="player">
                    <img class="player-img" :src="white.avatar" alt="">
                    <div class="player-info">
                        <div class="player-info-name" @click="gotoProfilePlayer(white)">
                            <p>{{ white.firstName }}<br>{{ white.lastName }}</p>
                        </div>
                        <div> {{ white.FIDETitle }} </div>
                        <div>{{ whiteelo }}</div>
                        <div>{{ white.federation }}</div>
                    </div>
                </div>
                <div class="chess-game-result" v-if="reporteractive">
                    <div class="chess-game-event">{{ reporteractive.Event }}</div>
                    <div class="result">{{ reporteractive.Result }}</div>

                </div>
                <div class="player">
                    <div class="player-info player-info-black">
                        <div class="player-info-name" @click="gotoProfilePlayer(black)">
                            <p>{{ black.firstName }}<br>{{ black.lastName }} </p>
                        </div>
                        <div> {{ black.FIDETitle }} </div>
                        <div>{{ blackelo }}</div>
                        <div> {{ black.federation }} </div>
                    </div>
                    <img class="player-img" :src="black.avatar" alt="">

                </div>
            </div>
            <div class="search-database">
                <div class="form-search">
                    <input type="text" placeholder="Enter ID Or Name...">
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <button class="advanced-search">
                    <i class="fa-solid fa-plus"></i>
                    <p>Advanced Search</p>
                </button>
            </div>
            <div class="chess-game-list">
                <table>
                    <thead>
                        <th>Year</th>
                        <th>White</th>
                        <th>Elo</th>
                        <th>Black</th>
                        <th>Elo</th>
                        <th>Res..</th>
                        <th>Moves</th>
                    </thead>

                    <tr v-for="(item, i) in listreporter" :key="i"
                        @click="getPlayer(item.WhiteID, item.BlackID, item.Reporter, item.WhiteElo, item.BlackElo, item)">
                        <td>{{ extractYear(item.Date) }}</td>
                        <td>{{ item.White }}</td>
                        <td>{{ item.WhiteElo }}</td>
                        <td>{{ item.Black }}</td>
                        <td>{{ item.BlackElo }}</td>
                        <td>{{ item.Result }}</td>
                        <td>{{ srcreporter.reporter[0] }} - {{ srcreporter.reporter[1] }} - {{ srcreporter.reporter[2]
                        }}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

</template>
<script >
import ChessRepoterVue from '../components/ChessRepoter.vue';
import axios from 'axios';
import { ConvertReporter } from '../process_reporter/ConvertReporter';

export default {
    components: {
        ChessRepoterVue
    },
    created() {
        this.getListReporter();
    },
    emits:{

    },
    data() {
        return {
            listreporter: [],
            white: null,
            black: null,
            whiteelo: '',
            blackelo: '',
            srcreporter: null,
            reporteractive: null
        }
    },
    watch: {
        listreporter: function () {
            this.getPlayer(this.listreporter[0].WhiteID, this.listreporter[0].BlackID,
                this.listreporter[0].Reporter, this.listreporter[0].WhiteElo, this.listreporter[0].BlackElo, this.listreporter[0]);
        },
    },
    methods: {
        async getListReporter() {
            try {
                const result = await axios.get('http://localhost:3000/api/reporter');
                console.log(result.data);
                this.listreporter = result.data;
                this.reporteractive = this.listreporter[0];
            } catch (err) {
                console.log(err);
            }
        },
        async getPlayer(idWhite, idBlack, srcreporter, WhiteElo, BlackElo, reporter) {
            this.reporteractive = null;
            var temp = new ConvertReporter(srcreporter);
            this.srcreporter = {...temp};

            this.whiteelo = WhiteElo;
            this.blackelo = BlackElo;
            try {
                const result = await axios.get('http://localhost:3000/api/players/blackwhite', {
                    params: {
                        WhiteID: idWhite,
                        BlackID: idBlack
                    }
                });
                this.white = result.data.white;
                this.black = result.data.black;
            } catch (err) {
            }
            this.reporteractive = reporter;
        },
        extractYear(date) {
            return date.substring(date.length - 4, date.length);
        },
        gotoProfilePlayer(player) {
            this.$router.push({ name: "Profile", params: { id: player._id } });
        },

    },
}
</script>

<style scoped>
.chess-game-info {
    margin-bottom: 20px;
}

.chess-game {
    display: flex;
    padding: 0px 10%;
    background-color: #f5f4f9;
}

.player {
    display: flex;
    width: 40%;
    flex-grow: 1;
}

.player-info {
    display: inline-block;
    padding-top: 20px;
    width: 50%;
    flex-grow: 1;
    padding-right: 5px;
}

.player-info-black {
    text-align: end;
}

.player-info-name {
    cursor: pointer;
}

.player-info-name:hover {
    color: #2e4a95;
}

.chess-game-info {
    display: flex;
}

.chess-game-info p:first-child {
    font-weight: bold;
}

.player-img {
    width: calc(50%-5px);
    height: 150px;
    border-radius: 3px;
    margin-right: 5px;
}

.chess-game-result {
    padding-top: 10px;
    width: 20%;
    text-align: center;
    flex-grow: 1;
}

.chess-game-event {
    font-weight: bold;
    margin-bottom: 10px;
}

.chess-game-event {
    text-overflow: clip
}

.chess-game-search {
    background-color: #8b99c0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5em 0px;
}

.chess-game-search .chess-game-search-form {
    width: 70%;
    border: none;
    background-color: transparent;
    outline: none;
    height: 100%;
}

.chess-game-search-form input {
    width: 100%;
}

.chess-game-search button {
    width: 20%;
}

.chess-game-list table {
    width: 100%;
}

.chess-game-left {
    margin-right: 20px;
}

.chess-game-right {
    width: 785px;
    float: right;
}

.chess-game-left,
.chess-game-right {
    padding: 2px;
    border-radius: 2px;
}


#chessboard {
    margin: auto;
    width: 400px;
    height: 400px;
    display: flex;
    flex-wrap: wrap;
}

#chessboard .chess-spot {
    width: calc(100% / 8);
    height: calc(100% / 8);
    background-size: contain;
}

#reporter {
    display: flex;
    margin: auto;
    width: 400px;
    flex-wrap: wrap;
    align-items: center;

}

.control-reporter {
    display: flex;
    justify-content: space-between;

}

#reporter .chess-reporter {
    cursor: pointer;
    border-radius: 2px;
    margin: 2px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 16px;
}
#reporter .chess-reporte:hover{
    background-color: rgb(124, 126, 127);
}
#reporter .chess-reporter:nth-child(2n) {
    margin-right: 10px;
}

#reporter .chess-reporter:active {
    background-color: rgb(89, 89, 98);
}

table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

thead {
    background-color: #334166;
    color: white;
    border-color: #334166;
    padding: 0.5em 0px;
    height: 2em;
}

thead tr {
    padding: 0.5em 0px;
    height: 2em;
}

tr:nth-child(2n) {
    background-color: #e0e0ed;
    color: #2e4a95;
}

tr:nth-child(2n+1) {
    background-color: #fff;
    color: #303133;
}
.search-database {
    background-color: #8b99c0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5em 0px;
}
.form-search {
    background-color: white;
    padding: 0.3em 0.5em;
    border-radius: 5px;
    width:50%;
    display: flex;
    align-items: center;
    height: 30px;
}
.form-search button,
.form-search input{
    border: none;
    background-color: transparent;
    outline: none;  
    height: 100%
}
.form-search input{
    width: 100%;
}
.form-search input::placeholder{
    font-size: 1.5em;
}
.form-search button{
    cursor: pointer;
}
.form-search button i{
    color: #50618d;
    font-size: 1.5em;
}
.advanced-search{
    display: flex;
    padding: 0.3em 0.5em;
    border: none;
    outline: none;
    background-color: #334166;
    color: white;
    font-size: 1em;
    height: 40px;
    width: 30%;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    font-size: 1.2em;
    margin-left: 10px;
    cursor: pointer;
}



</style>