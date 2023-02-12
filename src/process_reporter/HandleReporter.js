const CHESS_ENUM = {
    EMPTY: "null",
    PAWN: "Pawn",
    ROOK: "Rook",
    KNIGHT: "Knight",
    BISHOP: "Bishop",
    QUEEN: "Queen",
    KING: "King"
}


const CHESS_COLOR = {
    WHITE: 0,
    BLACK: 1,
    NONE: 2
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ChessPiece {
    constructor(chess_enum, chess_color, isBlackColor) {
        this.chess_enum = chess_enum;
        this.chess_color = chess_color;
        this.chessSpot = this.createChessSpot(isBlackColor);
        this.createChessImg();
    }
    //#region  rule
    CanMove(start, end, chess_color, reporter_index, map) {
        if (chess_color !== undefined && reporter_index !== undefined && this.chess_enum === CHESS_ENUM.PAWN)
            return this.CheckPawnMove(start, end, chess_color, reporter_index);
        if (map !== undefined) {
            return this.CheckRookMove(start, end, map);
        }
        switch (this.chess_enum) {
            case CHESS_ENUM.KNIGHT:
                return this.CheckKnightMove(start, end);
            case CHESS_ENUM.BISHOP:
                return this.CheckBiShopMove(start, end);
            case CHESS_ENUM.QUEEN:
                return this.CheckQueenMove(start, end);
            case CHESS_ENUM.KING:
                return this.ChessKingMove(start, end);

        }
    }
    CheckKnightMove(start, end) {
        let dx = Math.abs(end.x - start.x);
        let dy = Math.abs(end.y - start.y);
        return dx * dy == 2 && dx + dy == 3;
    }
    CheckBiShopMove(start, end) {
        let dx = end.x - start.x;
        let dy = end.y - start.y;
        return dy != 0 && Math.abs(dx / dy) == 1;
    }
    CheckRookMove(start, end, map) {
        let dx = Math.abs(end.x - start.x);
        let dy = Math.abs(end.y - start.y);
        if (dx * dy == 0 && dx + dy != 0) {
            if (map !== undefined) {
                let starttemp = new Point(start.x, start.y)
                if (dx == 0)
                    return map.checkEmpty(starttemp, end, new Point(0, (end.y - start.y) / dy));
                else
                    return map.checkEmpty(starttemp, end, new Point((end.x - start.x) / dx, 0));
            }
            else return true;
        }
        return false;

    }
    CheckQueenMove(start, end) {
        return this.CheckBiShopMove(start, end) || this.CheckRookMove(start, end);
    }
    ChessKingMove(start, end) {
        let dx = Math.abs(end.x - start.x);
        let dy = Math.abs(end.y - start.y);

        return dx <= 1 && dy <= 1 && dx + dy > 0;
    }
    CheckPawnMove(start, end, chess_color, reporter_index) {
        if (reporter_index % 2 !== this.chess_color)
            return false;
        let dx = Math.abs(end.x - start.x);
        let dy = Math.abs(end.y - start.y);
        if (chess_color + this.chess_color == 1
            && dx == 1 && dy == 1)
            return true;
        if ((start.y == 1 || start.y == 6) && dy == 2)
            return true;
        return (dy == 1 && dx == 0)


    }
    //#endregion
    createChessSpot(isBlackColor) {
        const div = document.createElement('div');
        div.className = 'chess-spot'
        div.style.backgroundColor = !isBlackColor ? "#eeeed2" : "#769656";
        return div;
    }
    updateChessPiece(chess_enum, chess_color) {
        this.chess_enum = chess_enum;
        this.chess_color = chess_color;
        this.createChessImg();
    }
    
    createChessImg() {
        if (this.chess_color == CHESS_COLOR.NONE && this.chess_enum == CHESS_ENUM.EMPTY) {
            this.chessSpot.style.backgroundImage = null;
            return;
        }
        let route = 'url(';
        if(this.chess_color == CHESS_COLOR.WHITE){
            switch (this.chess_enum) {
                case CHESS_ENUM.KNIGHT:
                    route += 'https://drive.google.com/uc?export=view&id=15taIav87fJRbgYAEqc-abx4sVL_LdFMN';
                    break;
                case CHESS_ENUM.ROOK:
                    route += 'https://drive.google.com/uc?export=view&id=1miIVoNxx8z2LNIy42UyCwaXyD2SLZpjg';
                    break;
                case CHESS_ENUM.BISHOP:
                    route += 'https://drive.google.com/uc?export=view&id=1B6KZUbD_540K0MuqvhWiSHM7c1tvolmz';
                    break;
                case CHESS_ENUM.QUEEN:
                    route += 'https://drive.google.com/uc?export=view&id=1a5Bb8ZCP8DsA0z0BvWaMqy0bxjfqfk7H';
                    break;
                case CHESS_ENUM.KING:
                    route += 'https://drive.google.com/uc?export=view&id=1IeTgdoMc8VME1-u9qVA86vUhEhwmZF7u';
                    break;
                case CHESS_ENUM.PAWN:
                    route += 'https://drive.google.com/uc?export=view&id=1dmeMqHX4rTtsj3Rh26XzuZvyZcYvpzIk';
                    break;
            }
        }else if(this.chess_color == CHESS_COLOR.BLACK){
            switch (this.chess_enum) {
                case CHESS_ENUM.KNIGHT:
                    route += 'https://drive.google.com/uc?export=view&id=1iya_hvZVQx9fHXxpgdwPY_lvGO5b1IFO';
                    break;
                case CHESS_ENUM.ROOK:
                    route += 'https://drive.google.com/uc?export=view&id=1WbzwdNxFS98CXvdfZ52a-56fhJs9SpJO';
                    break;
                case CHESS_ENUM.BISHOP:
                    route += 'https://drive.google.com/uc?export=view&id=1WGQVlvqLHmYbtU0iRgRF7xGmCm18b6o5';
                    break;
                case CHESS_ENUM.QUEEN:
                    route += 'https://drive.google.com/uc?export=view&id=1mpDBO5oEvIV9FVkIf3O6ttSIi6EQqjn0';
                    break;
                case CHESS_ENUM.KING:
                    route += 'https://drive.google.com/uc?export=view&id=1zSpmvUQWgnF74Kf4m8LKyLPKEjuwY3j3';
                    break;
                case CHESS_ENUM.PAWN:
                    route += 'https://drive.google.com/uc?export=view&id=1qMkFZDmN5lfR8AYIHnTlIcKhGSFJGsmQ';
                    break;
            }
        }
        route += ')';
        this.chessSpot.style.backgroundImage = route;
    }
}
export class ChessBoard {
    constructor(board) {
        const map = [];
        const n = 8;
        for (let i = 0; i < n; i++) {
            map.push([])
            for (let j = 0; j < n; j++) {
                let isBlackColor = (i + j) % 2 == 0 ? false : true;
                let chessPiece = new ChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE, isBlackColor);
                map[i].push(chessPiece);
                board.appendChild(chessPiece.chessSpot);
            }
        }
        this.map = map.reverse();
        this.createChessPiece(map);
        this.map = map;
    }
    checkEmpty(start, end, delta) {
        while (true) {
            start.x += delta.x;
            start.y += delta.y;
            if (start.x == end.x && start.y == end.y)
                break;
            if (this.map[start.y][start.x].chess_enum !== CHESS_ENUM.EMPTY
                && start.x >= 0 && start.x < 8 && start.y >= 0 && start.y < 8)
                return false;
        }
        return true;
    }
    createChessPiece(map) {
        for (let i = 0; i < 8; i++) {
            map[1][i].updateChessPiece(CHESS_ENUM.PAWN, CHESS_COLOR.WHITE);
            map[6][i].updateChessPiece(CHESS_ENUM.PAWN, CHESS_COLOR.BLACK);
        }
        // //#region Quan den
        map[0][0].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.WHITE);
        map[0][7].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.WHITE);
        map[0][1].updateChessPiece(CHESS_ENUM.KNIGHT, CHESS_COLOR.WHITE);
        map[0][6].updateChessPiece(CHESS_ENUM.KNIGHT, CHESS_COLOR.WHITE);
        map[0][2].updateChessPiece(CHESS_ENUM.BISHOP, CHESS_COLOR.WHITE);
        map[0][5].updateChessPiece(CHESS_ENUM.BISHOP, CHESS_COLOR.WHITE);
        map[0][3].updateChessPiece(CHESS_ENUM.QUEEN, CHESS_COLOR.WHITE);
        map[0][4].updateChessPiece(CHESS_ENUM.KING, CHESS_COLOR.WHITE);

        // //#endregion
        // //#region Quan trang
        map[7][0].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.BLACK);
        map[7][7].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.BLACK);
        map[7][1].updateChessPiece(CHESS_ENUM.KNIGHT, CHESS_COLOR.BLACK);
        map[7][6].updateChessPiece(CHESS_ENUM.KNIGHT, CHESS_COLOR.BLACK);
        map[7][2].updateChessPiece(CHESS_ENUM.BISHOP, CHESS_COLOR.BLACK);
        map[7][5].updateChessPiece(CHESS_ENUM.BISHOP, CHESS_COLOR.BLACK);
        map[7][3].updateChessPiece(CHESS_ENUM.QUEEN, CHESS_COLOR.BLACK);
        map[7][4].updateChessPiece(CHESS_ENUM.KING, CHESS_COLOR.BLACK);
    }

    findPawnPoint(row, col, chess_color, reporter_index, colStart) {
        let min = 19;
        let chessPoint = new Point(-1, -1);
        for (let i = 0; i < 8; i++) {
            if (colStart !== undefined) {
                let start = new Point(colStart, i);
                if (this.map[i][colStart].chess_enum === CHESS_ENUM.PAWN
                    && this.map[i][colStart].CanMove(start, new Point(col, row), chess_color, reporter_index)) {
                    let delta = Math.sqrt(Math.pow(Math.abs(i - row), 2) + Math.pow(Math.abs(colStart - col), 2));
                    if (min > delta) {
                        min = delta;
                        chessPoint = start;
                    }
                }
            }
            else {
                for (let j = 0; j < 8; j++) {
                    let start = new Point(j, i);
                    if (this.map[i][j].chess_enum === CHESS_ENUM.PAWN &&
                        this.map[i][j].CanMove(start, new Point(col, row), chess_color, reporter_index)) {
                        let delta = Math.sqrt(Math.pow(Math.abs(i - row), 2) + Math.pow(Math.abs(j - col), 2));
                        if (min > delta) {
                            min = delta;
                            chessPoint = start;
                        }
                    }
                }
            }

        }
        return chessPoint;
    }

    findPiece(row, col, reporter_index, chess_enum, colStart) {
        let temp = undefined, temp1 = undefined;
        for (let i = 0; i < 8; i++) {
            if (colStart !== undefined) {
                let start = new Point(colStart, i);
                let maptemp = this.map[i][colStart].chess_enum === CHESS_ENUM.ROOK ? this : undefined;
                if (this.map[i][colStart].CanMove(start, new Point(col, row), temp, temp1, maptemp)
                    && this.map[i][colStart].chess_enum === chess_enum &&
                    reporter_index % 2 === this.map[i][colStart].chess_color) {
                    return start;
                }
            }
            else {
                for (let j = 0; j < 8; j++) {
                    let start = new Point(j, i);
                    let maptemp = this.map[i][j].chess_enum === CHESS_ENUM.ROOK ? this : undefined;
                    if (this.map[i][j].CanMove(start, new Point(col, row), temp, temp1, maptemp)
                        && this.map[i][j].chess_enum === chess_enum &&
                        reporter_index % 2 === this.map[i][j].chess_color) {
                        return start;
                    }
                }
            }

        }
    }
    getChessEnum(c) {
        switch (c) {
            case 'R':
                return CHESS_ENUM.ROOK;
            case 'B':
                return CHESS_ENUM.BISHOP;
            case 'N':
                return CHESS_ENUM.KNIGHT;
            case 'Q':
                return CHESS_ENUM.QUEEN;
            case 'K':
                return CHESS_ENUM.KING;
        }
    }

    updateChessBoard(reporter_item, reporter_index) {
        if (reporter_item.indexOf('O-O') == 0)
            this.castleProcess(reporter_item, reporter_index);
        else {
            let col, row, start, chess_enum = CHESS_ENUM.PAWN;
            // xử lý quân Tốt
            if (reporter_item.length == 2 ||
                (reporter_item.length == 4 && reporter_item[0] >= 'a'
                    && reporter_item[0] <= 'h')) {
                col = reporter_item.charCodeAt(reporter_item.length - 2) - 97;
                row = reporter_item[reporter_item.length - 1] * 1 - 1;
                if (reporter_item.length == 4) {
                    let colStart = reporter_item.charCodeAt(0) - 97;
                    start = this.findPawnPoint(row, col, this.map[row][col].chess_color, reporter_index, colStart);
                }
                else
                    start = this.findPawnPoint(row, col, this.map[row][col].chess_color, reporter_index);
            }
            //xử lý phong cấp
            else if (reporter_item.charCodeAt(reporter_item.length - 1) >= 65
                && reporter_item.charCodeAt(reporter_item.length - 1) <= 90) {
                col = reporter_item.charCodeAt(0) - 97;
                row = reporter_item[1] * 1 - 1;
                chess_enum = this.getChessEnum(reporter_item[reporter_item.length - 1]);
                start = this.findPawnPoint(row, col, this.map[row][col].chess_color, reporter_index);
            }
            //Xử lý quân cờ lớn
            else if (reporter_item.length == 3 ||
                (reporter_item.length == 4 && reporter_item.charCodeAt(reporter_item.charCodeAt(0) >= 65
                    && reporter_item.charCodeAt(0) <= 90))) {
                chess_enum = this.getChessEnum(reporter_item[0]);
                col = reporter_item.charCodeAt(reporter_item.length - 2) - 97;
                row = reporter_item[reporter_item.length - 1] * 1 - 1;
                if (reporter_item.length == 4 && reporter_item[1] !== 'x') {
                    let colStart = reporter_item.charCodeAt(1) - 97;
                    start = this.findPiece(row, col, reporter_index, chess_enum, colStart)
                }
                else
                    start = this.findPiece(row, col, reporter_index, chess_enum);
            }
            else if (reporter_item.length == 5) {
                chess_enum = this.getChessEnum(reporter_item[0]);
                col = reporter_item.charCodeAt(reporter_item.length - 2) - 97;
                row = reporter_item[reporter_item.length - 1] * 1 - 1;
                let colStart = reporter_item.charCodeAt(1) - 97;
                if (reporter_item[2] !== 'x') {
                    let rowStart = reporter_item[2] * 1 - 1;
                    start = new Point(colStart, rowStart);
                }
                else
                    start = this.findPiece(row, col, reporter_index, chess_enum, colStart);

            }
            else if (reporter_item.length == 6) {
                chess_enum = this.getChessEnum(reporter_item[0]);
                col = reporter_item.charCodeAt(reporter_item.length - 2) - 97;
                row = reporter_item[reporter_item.length - 1] * 1 - 1;
                let colStart = reporter_item.charCodeAt(1) - 97;
                let rowStart = row = reporter_item[2] * 1 - 1;
                start = new Point(colStart, rowStart);
            }
            this.map[row][col].updateChessPiece(chess_enum, reporter_index % 2 == 0 ? CHESS_COLOR.WHITE : CHESS_COLOR.BLACK);
            this.map[start.y][start.x].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
        }


    }

    castleProcess(reporter_item, reporter_index) {
        if (reporter_item === 'O-O') {
            if (reporter_index % 2 != 0) {
                this.map[7][6].updateChessPiece(CHESS_ENUM.KING, CHESS_COLOR.BLACK);
                this.map[7][4].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
                this.map[7][5].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.BLACK);
                this.map[7][7].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
            }
            else {
                this.map[0][6].updateChessPiece(CHESS_ENUM.KING, CHESS_COLOR.WHITE);
                this.map[0][4].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
                this.map[0][5].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.WHITE);
                this.map[0][7].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
            }
        }
        else if (reporter_item === 'O-O-O')
            if (reporter_index % 2 != 0) {
                this.map[7][2].updateChessPiece(CHESS_ENUM.KING, CHESS_COLOR.BLACK);
                this.map[7][4].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
                this.map[7][3].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.BLACK);
                this.map[7][0].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
            }
            else {
                this.map[0][2].updateChessPiece(CHESS_ENUM.KING, CHESS_COLOR.WHITE);
                this.map[0][4].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
                this.map[0][3].updateChessPiece(CHESS_ENUM.ROOK, CHESS_COLOR.WHITE);
                this.map[0][0].updateChessPiece(CHESS_ENUM.EMPTY, CHESS_COLOR.NONE);
            }
    }
}

// module.exports = CHESS_COLOR;
// module.exports = Point;
// module.exports = ChessPiece;
// module.exports = ChessBoard;
// module.exports = CHESS_ENUM;
