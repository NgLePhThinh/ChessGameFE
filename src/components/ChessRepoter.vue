<template>
    <div id="chess-reporter">
        <div id="chessboard">
        </div>
        <!-- <div class="control-reporter">
            <div class="reset-reporter">

            </div>
            <div class="before-reporter">

            </div>
            <div class="next-reporter">
                <i class="fa-solid fa-forward"></i>
            </div>
            <div class="end-reporter">
                <i class="fa-solid fa-forward-fast"></i>
            </div>
        </div> -->
        <div id="reporter">
        </div>
    </div>
</template>



<script >

import { ChessBoard } from '../process_reporter/HandleReporter';
import { ConvertReporter } from '../process_reporter/ConvertReporter';

export default {
    watch: {
        Reporter: function(){
            this.handle();
        }
    },
    props: {
        srcreporter: { type: String, required: true }
    },
    data() {
        return {
            Reporter: null
        }
    },
    methods: {
        async createChessBoard() {
            const divReporter = document.getElementById('reporter');
            if (divReporter !== null) {
                let j = 1, k = 1;
                this.Reporter = await new ConvertReporter(this.srcreporter);
                this.Reporter.reporter.forEach(element => {
                    const div = document.createElement('div');
                    div.className = 'chess-reporter';
                    let content = '';
                    if (j % 2 == 1) {
                        content += `${k}: `;
                        k++;
                    }
                    content += element;
                    div.innerHTML = content;
                    divReporter.appendChild(div);
                    j++;
                });
            }

        },
        isEqual(objA, objB) {
            var aProps = Object.getOwnPropertyNames(objA);
            var bProps = Object.getOwnPropertyNames(objB);

            if (aProps.length != bProps.length) {
                return false;
            }
            for (var i = 0; i < aProps.length; i++) {
                var propName = aProps[i];
                if (objA[propName] !== objB[propName]) {
                    return false;
                }
            }
            return true;
        },
        handle() {
            var childreOfDivReporter = document.getElementsByClassName('chess-reporter');
            for (let i = 0; i < childreOfDivReporter.length; i++) {
                var child = childreOfDivReporter[i];
                let index = -1;
                child.addEventListener('click', () => {
                    for (let j = 0; j < childreOfDivReporter.length; j++) {
                        if (child === childreOfDivReporter[j]) {
                            index = i;
                            break;
                        }
                    }
                    this.updateReporter(index, this.Reporter.reporter);
                    
                });
               
            }
        },
        async updateReporter(index, reporter) {
            let remove = document.getElementById('chessboard');
            remove.remove();
            const chessboard_div = document.createElement('div');
            chessboard_div.id = 'chessboard';
            const chessReporter = document.getElementById('chess-reporter');
            chessReporter.insertBefore(chessboard_div, chessReporter.firstChild);
            let chessBoard = new ChessBoard(chessboard_div);
            for (let i = 0; i <= index; i++) {
                await chessBoard.updateChessBoard(reporter[i], i);
            }
        }
    },
    mounted() {
        if (this.srcreporter.length > 0) {
            let chessBoard = new ChessBoard(document.getElementById('chessboard'));
            this.createChessBoard();
        }
    }


}
</script>

<style>
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

#reporter {
    margin-top: 5px;
    height: 150px;
    max-height: 150px;
    overflow-y: scroll;
    padding: 0px 3px;
    border-radius: 2px;
}

#reporter .chess-reporter {
    cursor: pointer;
    border-radius: 2px;
    margin: 2px;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 16px;
}

#reporter .chess-reporte:hover {
    background-color: rgb(124, 126, 127) !important;
}

#reporter .chess-reporter:nth-child(2n) {
    margin-right: 10px;
}

#reporter .chess-reporter:active {
    background-color: rgb(89, 89, 98);
}
</style>