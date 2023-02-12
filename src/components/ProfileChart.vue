<template>
    <div class="chart-elo">
        <div class="row">
            <div class="set-year-query">1 YR</div>
            <div class="set-year-query">2 YR</div>
            <div class="set-year-query">3 YR</div>
            <div class="set-year-query">5 YR</div>
            <div class="set-year-query">ALL YR</div>
        </div>
        <canvas id="myChart" v-if="chesselo"></canvas>
    </div>
</template>
<script >
import Chart from 'chart.js/auto';

export default {
    created() {
    },
    name: 'ProfileChart',
    props: {
        chesselo: { type: Object, required: true }
    },
    methods: {

    },
    mounted() {
        if (this.chesselo) {
            let delta = this.chesselo.date.length - this.chesselo.rapid.length;
            for(let i = 0; i < delta; i ++ ){
                this.chesselo.date.shift();
                this.chesselo.std.shift();
            }
            new Chart("myChart", {
                type: "line",
                data: {
                    labels: this.chesselo.date,
                    datasets: [{
                        label: "rating",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,0,255,1.0)",
                        borderColor: "rgba(0,0,255,0.1)",
                        data: this.chesselo.std
                    },
                    {
                        label: "rapid-rating",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(0,255,0,1.0)",
                        borderColor: "rgba(0,255,0,0.1)",
                        data: this.chesselo.rapid
                    },
                    {
                        label: "blitz-rating",
                        fill: false,
                        lineTension: 0,
                        backgroundColor: "rgba(255,0,0,1.0)",
                        borderColor: "rgba(255,0,0,0.1)",
                        data: this.chesselo.blitz
                    }
                    ]
                },
                options: {
                    legend: {
                        display: true,
                    },

                }
            });
        }


    }
}

</script>
<style scoped>
.chart-elo {
    background-color: white;
    margin: 20px 0px;
}

.row {
    margin: 10px 0px;
    display: flex;
}

.set-year-query {
    cursor: pointer;
    width: 100px;
    outline: 0;
    font-size: 1em;
    line-height: 1em;
    color: white;
    font-weight: bold;
    background-color: #334166;
    margin-right: 10px;
    text-align: center;
    padding: 20px 0px;
}

.set-year-query:hover {
    background-color: #20397c;
}
</style>
