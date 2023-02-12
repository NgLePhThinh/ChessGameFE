<template>
    <div v-if="player" class="container profile">
        <div class="profile-title">
            PROFILE INFO
        </div>
        <div class="profile-top">
            <div class="profile-top_left">
                <div>
                    <img class="img-profile" :src="player.avatar" alt="">
                </div>
                <img :src="player.fedImg" alt="" class="img-fed">
            </div>
            <div class="profile-top_right">
                <div class="profile-top-title">
                    {{ player.firstName }} , {{ player.lastName }}
                </div>
                <div class="profile-top-info">
                    <div class="profile-top-block">
                        <div class="profile-top-block-row">
                            <div class="profile-top-block-row-title">
                                World Rank (Active):
                            </div>
                            <div class="profile-top-block-row-info">
                                {{ player.WorldRank }}
                            </div>
                        </div>
                        <div class="profile-top-block-row">
                            <div class="profile-top-block-row-title">
                                Federation:
                            </div>
                            <div class="profile-top-block-row-info">
                                {{ player.federation }}
                            </div>
                        </div>
                        <div class="profile-top-block-row">
                            <div class="profile-top-block-row-title">
                                FIDE ID:
                            </div>
                            <div class="profile-top-block-row-info">
                                12563782
                            </div>
                        </div>
                    </div>
                    <div class="profile-top-block">
                        <div class="profile-top-block-row">
                            <div class="profile-top-block-row-title">
                                B-Year:
                            </div>
                            <div class="profile-top-block-row-info">
                                {{ player.B_Year }}
                            </div>
                        </div>
                        <div class="profile-top-block-row">
                            <div class="profile-top-block-row-title">
                                Sex
                            </div>
                            <div class="profile-top-block-row-info">
                                {{ player.Sex }}
                            </div>
                        </div>
                        <div class="profile-top-block-row">
                            <div class="profile-top-block-row-title">
                                FIDE title:
                            </div>
                            <div class="profile-top-block-row-info">
                                {{ player.FIDETitle }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="profile-top-rating">
                    <div class="profile-top-title">
                        Rating
                    </div>
                    <div class="profile-top-rating-info">
                        <div class="profile-top-rating-info-std">
                            <span>std</span>
                            {{ player.std }}
                        </div>
                        <div class="profile-top-rating-info-rapid">
                            <span>rapid</span>
                            {{ player.rapid }}
                        </div>
                        <div class="profile-top-rating-info-blitz">
                            <span>blitz</span>
                            {{ player.blitz }}
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="profile-bottom">
            <div v-if="isfinish">
                <ProfileChartVue :chesselo="chesselo" />
            </div>
            <div class="profile-bottom-rating">
                <table v-if="(chesselodata.date.length > 0)">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>RTNG</th>
                            <th>RAPID RTNG</th>
                            <th>BLITZ RTNG</th>
                        </tr>
                    </thead>
                    <tr v-for="(item, i) in chesselodata" :key="i">
                        <td> {{ item.date }} </td>
                        <td> {{ item.std }} </td>
                        <td> {{ item.rapid }} </td>
                        <td> {{ item.blitz }} </td>
                    </tr>

                </table>
            </div>
        </div>

    </div>


</template>
<script>
import ProfileChartVue from '../components/ProfileChart.vue';
import PlayerService from '../services/player.service'
import axios from 'axios';
export default {
    components: { ProfileChartVue },
    async created() {
        try {
            const result = await axios.get(`http://localhost:3000/api/players/${this.$route.params.id}`);
            this.player = result.data;
            const result1 = await axios.get(`http://localhost:3000/api/chesselo/${this.player._id}`);
            this.chesselo = result1.data;
            this.createchesselodata();
        } catch (err) {
            console.log(err);
        }
    },
    data() {
        return {
            isfinish: false,
            player: null,
            chesselo: null,
            chesselodata: {
                date: [],
                std: [],
                rapid: [],
                blitz: []
            }
        }
    },
    methods: {
        createchesselodata() {
            this.chesselo.date = this.chesselo.date.reverse();
            this.chesselo.std = this.chesselo.std.reverse();
            this.chesselo.rapid = this.chesselo.rapid.reverse();
            this.chesselo.blitz = this.chesselo.blitz.reverse();
            let i;
            for (i = 0; i < this.chesselo.rapid.length; i++) {
                this.chesselodata.date.push(this.chesselo.date[i]);
                this.chesselodata.std.push(this.chesselo.std[i]);
                this.chesselodata.rapid.push(this.chesselo.rapid[i]);
                this.chesselodata.blitz.push(this.chesselo.blitz[i]);
            }
            for (let j = i; j < this.chesselo.date.length; j++) {
                this.chesselodata.date.push(this.chesselo.date[j]);
                this.chesselodata.std.push(this.chesselo.std[j]);
                this.chesselodata.rapid.push('');
                this.chesselodata.blitz.push('');
            }
            this.isfinish = true;
        }
    }
}
</script>
<style scoped>
.container {
    padding: 0px 10%;
    background-color: #efefef;
}

.profile-title {
    width: fit-content;
    background-color: #50618d;
    color: #fff;
    padding: 0.6em;
    font-size: 1.5em;
}

.profile-top {
    display: flex;
    background-color: #fff;
}

.img-profile {
    width: 100%;
}

.profile-top_left {
    position: relative;
    width: fit-content;
    overflow: hidden;
    margin: 1em;
    width: 22%;
}

.img-fed {
    position: absolute;
    height: 50px;
    right: 0;
    bottom: 4px;
}

.profile-top_right {
    margin: 1em;
    width: 70%;
}

.profile-top-title {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.profile-top-info {
    display: flex;
    flex-wrap: wrap;
}

.profile-top-block {
    margin-right: 5px;
}

.profile-top-block-row {
    display: flex;
}

.profile-top-block-row-title {
    background-color: #efeff6;
    width: 190px;
    margin: 1px;
    line-height: 1em;
    font-size: 1em;
    padding: 1em 0px 1em 0.5em;
}

.profile-top-block-row-info {
    background-color: #fff;
    width: 190px;
    margin: 1px;
    border: #efeff6 0.5px solid;
    border-right: none;
    line-height: 1em;
    font-size: 1em;
    padding: 1em 0px 1em 0.5em;
}

.profile-top-rating {
    margin-top: 10px;
}

.profile-top-rating-info {
    display: flex;
    justify-content: space-between;
    color: white;
    font-size: 1.5em;
}

.profile-top-rating-info span {
    font-size: 0.6em;
    font-weight: normal;
}

.profile-top-rating-info div {
    width: calc((100% - 10px)/3);
    padding: 0.5em 0px;
    text-align: center;
    font-weight: bold;
}

.profile-top-rating-info-std {
    background-color: #aeb9cd;
}

.profile-top-rating-info-rapid {
    background-color: #e76766;
}

.profile-top-rating-info-blitz {
    background-color: #4c67ac;
}

.profile-bottom-rating table {
    width: 100%;
    text-align: center;
    border-collapse: collapse
}

.profile-bottom-rating td {
    padding: 4px 0px;
}

.profile-bottom-rating thead {
    background-color: #334166;
    color: white;
    border-color: #334166;
    padding: 1em 0px;
    height: 2em;
}

.profile-bottom-rating thead tr {
    padding: 0.5em 0px;
}

.profile-bottom-rating tr:nth-child(2n) {
    background-color: #dfdfed;
    color: #334166;
}
</style>
