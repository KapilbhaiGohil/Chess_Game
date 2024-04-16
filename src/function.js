import { useContext } from "react";
import { ChessContext, initialBoard } from "./Context";
import { act } from "react-dom/test-utils";

function insideGrid(i, j) {
    if (i < 0 || j < 0 || j >= 8 || i >= 8) return false;
    return true;
}
function removeHighlight(grid, turn) {
    const temp = [...grid];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (temp[i][j].name === turn + 'highlight') {
                temp[i][j] = { name: '' }
            }
            if (temp[i][j].kill === turn + 'kill') {
                temp[i][j].kill = ''
            }
        }
    }
    return temp;
}
export function pawnClick(grid, setGrid, i, j, dist, turn, setActive, active) {
    const notTurn = turn === 'a' ? 'b' : 'a';
    let temp = [...grid];
    if (active.i === i && active.j === j) {
        temp = removeHighlight(temp, turn);
        setActive({ name: '', i: -1, j: -1 });
    } else {
        if (active.name !== '') {
            temp = removeHighlight(temp, turn)
        }
        if (insideGrid(i + dist, j) && temp[i + dist][j].name === '') {
            temp[i + dist][j].name = turn + 'highlight'
        }
        if (insideGrid(i + dist, j + 1) && temp[i + dist][j + 1].name !== '' && temp[i + dist][j + 1].name[0] === notTurn) {
            temp[i + dist][j + 1].kill = turn + 'kill'
        }
        if (insideGrid(i + dist, j - 1) && temp[i + dist][j - 1].name !== '' && temp[i + dist][j - 1].name[0] === notTurn) {
            temp[i + dist][j - 1].kill = turn + 'kill';
        }
        if ((i === 1 || i === 6) && temp[i + dist][j].name === turn + 'highlight') {
            if (insideGrid(i + 2 * dist, j) && temp[i + 2 * dist][j].name === '') temp[i + 2 * dist][j].name = turn + 'highlight'
        }
        setActive({ name: turn + 'pawn', i, j });
        setGrid(temp);
    }
}
function isEnemy(turn,cell){
    const notTurn = turn === 'a' ? 'b' : 'a';
    if(cell.name !== '' && cell.name[0]===notTurn){
        return true;
    }else{
        return false;
    }
}
function rookWalkImplementation(temp,turn,i,j){
    for (let k = j + 1; k < 8; k++) {
        if(temp[i][k].name===''){
            temp[i][k].name = turn+'highlight';
        }else if(isEnemy(turn,temp[i][k])){
            temp[i][k].kill = turn+'kill';
            break;
        }else{
            break;
        }
    }
    for (let k = j - 1; k >= 0; k--) {
        if(temp[i][k].name===''){
            temp[i][k].name = turn+'highlight';
        }else if(isEnemy(turn,temp[i][k])){
            temp[i][k].kill = turn+'kill';break;
        }else{
            break;
        }
    }
    for (let k = i + 1; k < 8; k++) {
        if(temp[k][j].name === ''){
            temp[k][j].name = turn+'highlight';
        }else if(isEnemy(turn,temp[k][j])){
            temp[k][j].kill = turn+'kill';
            break;
        }else{
            break;
        }
    }
    for (let k = i - 1; k >= 0; k--) {
        if(temp[k][j].name === ''){
            temp[k][j].name = turn+'highlight';
        }else if(isEnemy(turn,temp[k][j])){
            temp[k][j].kill = turn+'kill';break;
        }else{
            break;
        }
    }
    return temp;
}
function bishopWalkImplementation(temp,turn,i,j){
    let tempi = i-1,tempj = j-1;
    while(insideGrid(tempi,tempj)){
        if(temp[tempi][tempj].name === ''){
            temp[tempi][tempj].name = turn+'highlight';
        }else if(isEnemy(turn,temp[tempi][tempj])){
            temp[tempi][tempj].kill = turn+'kill';break;
        }else{
            break;
        }
        tempi--;
        tempj--;
    }
    tempj = j+1;
    tempi = i+1;
    while(insideGrid(tempi,tempj)){
        if(temp[tempi][tempj].name === ''){
            temp[tempi][tempj].name = turn+'highlight';
        }else if(isEnemy(turn,temp[tempi][tempj])){
            temp[tempi][tempj].kill = turn+'kill';break;
        }else{
            break;
        }
        tempi++;
        tempj++;
    }
    tempi = i-1;
    tempj = j+1;
    while(insideGrid(tempi,tempj)){
        if(temp[tempi][tempj].name === ''){
            temp[tempi][tempj].name = turn+'highlight';
        }else if(isEnemy(turn,temp[tempi][tempj])){
            temp[tempi][tempj].kill = turn+'kill';break;
        }else{
            break;
        }
        tempi--;
        tempj++;
    }
    tempi = i+1;
    tempj = j-1;
    while(insideGrid(tempi,tempj)){
        console.log(tempi,tempj)
        if(temp[tempi][tempj].name === ''){
            temp[tempi][tempj].name = turn+'highlight';
        }else if(isEnemy(turn,temp[tempi][tempj])){
            temp[tempi][tempj].kill = turn+'kill';break;
        }else{
            break;
        }
        tempi++;
        tempj--;
    }
    return temp;
}
export function rookClick(grid, setGrid, i, j, dist, turn, setActive, active) {
    let temp = [...grid];
    temp = removeHighlight(temp, turn);
    if (active.i === i && active.j === j) {
        setActive({ name: '', i: -1, j: -1 });
    } else {
        temp = rookWalkImplementation(temp,turn,i,j)
        setActive({ name: turn + 'rook', i, j });
        setGrid(temp)
    }
}
export function bishopClick(grid, setGrid, i, j, dist, turn, setActive, active){
    let temp = [...grid];
    temp = removeHighlight(temp, turn);
    if (active.i === i && active.j === j) {
        temp = removeHighlight(temp, turn);
        setActive({ name: '', i: -1, j: -1 });
    } else {
        temp = bishopWalkImplementation(temp,turn,i,j)
        setActive({ name: turn + 'bishop', i, j });
        setGrid(temp)
    }
}
export function queenClick(grid, setGrid, i, j, dist, turn, setActive, active){
    let temp = [...grid];
    temp = removeHighlight(temp, turn);
    if (active.i === i && active.j === j) {
        temp = removeHighlight(temp, turn);
        setActive({ name: '', i: -1, j: -1 });
    } else {
        temp = rookWalkImplementation(temp,turn,i,j)
        temp = bishopWalkImplementation(temp,turn,i,j)
        setActive({ name: turn + 'queen', i, j });
        setGrid(temp)
    }
}
export function knightClick(grid, setGrid, i, j, dist, turn, setActive, active){
    let temp = [...grid];
    temp = removeHighlight(temp, turn);
    if (active.i === i && active.j === j) {
        temp = removeHighlight(temp, turn);
        setActive({ name: '', i: -1, j: -1 });
    } else {
        if(insideGrid(i+2,j-1)){
            if(temp[i+2][j-1].name === ''){
                temp[i+2][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+2][j-1])){
                temp[i+2][j-1].kill = turn+'kill';
            }
        }
        if(insideGrid(i+2,j+1)){
            if(temp[i+2][j+1].name === ''){
                temp[i+2][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+2][j+1])){
                temp[i+2][j+1].kill = turn+'kill';
            }
        }
        if(insideGrid(i-2,j-1)){
            if(temp[i-2][j-1].name === ''){
                temp[i-2][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-2][j-1])){
                temp[i-2][j-1].kill = turn+'kill';
            }
        }
        if(insideGrid(i-2,j+1)){
            if(temp[i-2][j+1].name === ''){
                temp[i-2][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-2][j+1])){
                temp[i-2][j+1].kill = turn+'kill';
            }
        }


        if(insideGrid(i+1,j+2)){
            if(temp[i+1][j+2].name === ''){
                temp[i+1][j+2].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j+2])){
                temp[i+1][j+2].kill = turn+'kill';
            }
        }
        if(insideGrid(i-1,j+2)){
            if(temp[i-1][j+2].name === ''){
                temp[i-1][j+2].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j+2])){
                temp[i-1][j+2].kill = turn+'kill';
            }
        }
        if(insideGrid(i+1,j-2)){
            if(temp[i+1][j-2].name === ''){
                temp[i+1][j-2].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j-2])){
                temp[i+1][j-2].kill = turn+'kill';
            }
        }
        if(insideGrid(i-1,j-2)){
            if(temp[i-1][j-2].name === ''){
                temp[i-1][j-2].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j-2])){
                temp[i-1][j-2].kill = turn+'kill';
            }
        }
        setActive({ name: turn + 'knight', i, j });
        setGrid(temp)
    }
}

export function kingClick(grid, setGrid, i, j, dist, turn, setActive, active){
    let temp = [...grid];
    temp = removeHighlight(temp, turn);
    if (active.i === i && active.j === j) {
        temp = removeHighlight(temp, turn);
        setActive({ name: '', i: -1, j: -1 });
    } else {
        if(insideGrid(i+1,j)){
            if(temp[i+1][j].name === ''){
                temp[i+1][j].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j])){
                temp[i+1][j].kill = turn+'kill';
            }
        }
        if(insideGrid(i+1,j-1)){
            if(temp[i+1][j-1].name === ''){
                temp[i+1][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j-1])){
                temp[i+1][j-1].kill = turn+'kill';
            }
        }
        if(insideGrid(i+1,j+1)){
            if(temp[i+1][j+1].name === ''){
                temp[i+1][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j+1])){
                temp[i+1][j+1].kill = turn+'kill';
            }
        }

        if(insideGrid(i-1,j)){
            if(temp[i-1][j].name === ''){
                temp[i-1][j].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j])){
                temp[i-1][j].kill = turn+'kill';
            }
        }
        if(insideGrid(i-1,j-1)){
            if(temp[i-1][j-1].name === ''){
                temp[i-1][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j-1])){
                temp[i-1][j-1].kill = turn+'kill';
            }
        }
        if(insideGrid(i-1,j+1)){
            if(temp[i-1][j+1].name === ''){
                temp[i-1][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j+1])){
                temp[i-1][j+1].kill = turn+'kill';
            }
        }

        if(insideGrid(i,j+1)){
            if(temp[i][j+1].name === ''){
                temp[i][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i][j+1])){
                temp[i][j+1].kill = turn+'kill';
            }
        }
        if(insideGrid(i-1,j+1)){
            if(temp[i-1][j+1].name === ''){
                temp[i-1][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j+1])){
                temp[i-1][j+1].kill = turn+'kill';
            }
        }
        if(insideGrid(i+1,j+1)){
            if(temp[i+1][j+1].name === ''){
                temp[i+1][j+1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j+1])){
                temp[i+1][j+1].kill = turn+'kill';
            }
        }

        if(insideGrid(i,j-1)){
            if(temp[i][j-1].name === ''){
                temp[i][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i][j-1])){
                temp[i][j-1].kill = turn+'kill';
            }
        }
        if(insideGrid(i-1,j-1)){
            if(temp[i-1][j-1].name === ''){
                temp[i-1][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i-1][j-1])){
                temp[i-1][j-1].kill = turn+'kill';
            }
        }
        if(insideGrid(i+1,j-1)){
            if(temp[i+1][j-1].name === ''){
                temp[i+1][j-1].name = turn+'highlight';
            }else if(isEnemy(turn,temp[i+1][j-1])){
                temp[i+1][j-1].kill = turn+'kill';
            }
        }
        setActive({ name: turn + 'king', i, j });
        setGrid(temp)
    }
}

export function highlightClick(grid, setGrid, i, j, active, setActive, turn) {
    let temp = removeHighlight(grid, turn);
    const notTurn = turn === 'a' ? 'b' : 'a';
    if (active.name === '') {
        window.alert('something wrong happend to game pls restart game.')
    } else {
        if(temp[i][j].name===notTurn+'king'){
            window.alert('Player '+turn+' won.');
            setGrid(initialBoard())
            return;
        }
        if (active.name === turn + 'pawn' && (i === 7 || i == 0)) {
            temp[i][j].name = turn + 'queen';
        } else {
            temp[i][j].name = active.name;
        }
        temp[active.i][active.j].name = ''
        setGrid(temp);
    }
}