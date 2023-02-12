import { slotFlagsText } from "@vue/shared";

export class ConvertReporter {
    constructor(srcreporter) {
        const s = srcreporter;
        const a = s.split('. ') // ['e4 {[%clk 0:00:00]}  e5 {[%clk 0:05:01]} 2', ...]
        a.shift()
        // console.log([a]);
        let lastMove = a.pop()
        this.reporter = [] //Bien ban van co

        for (let i = 0; i < a.length; i++) {
            const data2 = a[i].split('  ')  //cắt 
            // data2 = ['e4 {[%clk 0:00:00]}', 'e5 {[%clk 0:05:01]} 2']
            data2[0] = data2[0].replace("+", '');
            data2[1] = data2[1].replace("+", '');
            data2[0] = data2[0].replace("#", '');
            data2[1] = data2[1].replace("#", '');
            this.reporter.push(data2[0].split(' ')[0])
            this.reporter.push(data2[1].split(' ')[0])
        }
        /* Lấy kết quả ván đấu */
        const index = lastMove.lastIndexOf(' ')
        /* */

        /* Xử lý nước đi cuối */
        lastMove = lastMove.substring(0, index - 1);
        const data2 = lastMove.split('  ')
        this.reporter.push(data2[0].split(' ')[0])
        if (data2.length == 2)
            this.reporter.push(data2[1].split(' ')[0]);
    }

}