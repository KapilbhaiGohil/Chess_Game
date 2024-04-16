import { createContext, useEffect, useState } from "react";

export const ChessContext = createContext({
    grid:[],
    setGrid:()=>{},
    turn:'',
    setTurn:()=>{},
    active:{},
    setActive:()=>{}
});
export function initialBoard(){
    let initial =[];
    for (let i = 0; i < 8; i++) {
        initial[i] = Array(8);
        for(let j = 0; j < 8; j++){
            initial[i][j] = {name:''}
        }
    }
    //for player 1 set up
    for(let i =0; i < 8;i++){
        initial[1][i].name='apawn';
    }
    initial[0][0].name = 'arook'
    initial[0][7].name = 'arook'
    initial[0][1].name = 'aknight'
    initial[0][6].name = 'aknight'
    initial[0][2].name = 'abishop'
    initial[0][5].name = 'abishop'
    initial[0][3].name = 'aqueen'
    initial[0][4].name = 'aking'

    //for player 2 set up
    for(let i =0; i < 8;i++){
        initial[6][i].name='bpawn';
    }
    initial[7][0].name = 'brook'
    initial[7][7].name = 'brook'
    initial[7][1].name = 'bknight'
    initial[7][6].name = 'bknight'
    initial[7][2].name = 'bbishop'
    initial[7][5].name = 'bbishop'
    initial[7][3].name = 'bqueen'
    initial[7][4].name = 'bking'
    return initial;
}
export function ChessContextProvider({children}){
   

    const [grid,setGrid] = useState(initialBoard());
    const [turn,setTurn] = useState('a');
    const [active,setActive] = useState({name:'',i:-1,j:-1});

    // useEffect(()=>{
    //     console.log(grid)
    // },[grid])

    return(
        <>
            <ChessContext.Provider value={{grid,setGrid,turn,setTurn,active,setActive}}>
                {children}
            </ChessContext.Provider>
        </>
    )
}