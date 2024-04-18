import apawn from './images/a/apawn.png'
import arook from './images/a/arook.png'
import aknight from './images/a/aknight.png'
import aking from './images/a/aking.png'
import aqueen from './images/a/aqueen.png'
import abishop from './images/a/abishop.png'
import ahighlight from './images/a/ah.png'

import bpawn from './images/b/bpawn.png'
import brook from './images/b/brook.png'
import bknight from './images/b/bknight.png'
import bking from './images/b/bking.png'
import bqueen from './images/b/bqueen.png'
import bbishop from './images/b/bbishop.png'
import bhighlight from './images/b/bh.png'

import { bishopClick, highlightClick, kingClick, knightClick, pawnClick, queenClick, rookClick } from './function'
import { useContext, useEffect, useState } from 'react'
import { ChessContext } from './Context'
import { useSearchParams } from 'react-router-dom'

export default function Chess(){
    const {grid,setGrid,setTurn} = useContext(ChessContext);
    return(
        <>
            <div className="chess-outer">
                {grid && grid.map((row,i)=><ChessBoxRow key={i} row={row} rowindex={i}/>)}
            </div>
        </>
    )
}

export function ChessBoxRow({row,rowindex}){
    return(
        <div className="chess-row-outer">
            {row.map((ele,i)=><ChessBoxWithImage key={i} element={ele} rowindex={rowindex} index={i}/>)}
        </div>
    )
}

export function ChessBoxWithImage({rowindex,index,element}){
    const {grid,setGrid,active,setActive,turn,setTurn} = useContext(ChessContext);
    const [aclass,setAclass] = useState('aimg');
    const [bclass,setBclass] = useState('bimg');

    let tempInd = index;
    if(rowindex%2===0){tempInd++;}
    function checkTurn(expected){
        if(turn == expected){
            return true;
        }else{
            // window.alert("Other player's turn")
            return false;
        }
    }
    useEffect(()=>{
        if(aclass.length > 5){
            setAclass('aimg');
            setBclass('bimg');
        }else{
            setAclass('aimg rot');
            setBclass('bimg rot');
        }
    },[turn])
    return(
        <>
            <div style={tempInd%2===0?{background:"black"}:{background:"rgb(235 223 208)   "}}  className="chess-box-outer">
                {element.name.length!==0 &&
                    <>
                        {/* player a render */}
                        {element.name==='apawn' && <img className={aclass} onClick={()=>{
                            if(checkTurn('a')){
                                pawnClick(grid,setGrid,rowindex,index,1,'a',setActive,active)
                            }
                            }} src={apawn}/>}
                        {element.name==='arook' && <img className={aclass} onClick={()=>{
                            if(checkTurn('a')){
                                rookClick(grid,setGrid,rowindex,index,1,'a',setActive,active)}} 
                            }
                            src={arook}/>}
                        {element.name==='aknight' && <img className={aclass} onClick={()=>{
                            if(checkTurn('a')){
                                knightClick(grid,setGrid,rowindex,index,1,'a',setActive,active)}}  
                            }
                            src={aknight}/>}
                        {element.name==='abishop' && <img className={aclass} onClick={()=>{
                            if(checkTurn('a')){
                                bishopClick(grid,setGrid,rowindex,index,1,'a',setActive,active)}} 
                             }
                            src={abishop}/>}
                        {element.name==='aking' && <img className={aclass} onClick={()=>{
                            if(checkTurn('a')){
                                kingClick(grid,setGrid,rowindex,index,1,'a',setActive,active)}} 
                             }
                            src={aking}/>}
                        {element.name==='aqueen' && <img className={aclass} onClick={()=>{
                            if(checkTurn('a')){
                                queenClick(grid,setGrid,rowindex,index,1,'a',setActive,active)}}  
                            }
                            src={aqueen}/>}

                        {/* player b render */}
                        {element.name==='bpawn' && <img className={bclass} onClick={()=>{

                            if(checkTurn('b')){
                                pawnClick(grid,setGrid,rowindex,index,-1,'b',setActive,active)}} 
                            }
                            src={bpawn}/>}
                        {element.name==='brook' && <img className={bclass} onClick={()=>{
                            if(checkTurn('b')){
                              rookClick(grid,setGrid,rowindex,index,-1,'b',setActive,active)}} 
                             }
                            src={brook}/>}
                        {element.name==='bknight' && <img className={bclass} onClick={()=>{
                            if(checkTurn('b')){
                              knightClick(grid,setGrid,rowindex,index,1,'b',setActive,active)}} 
                             }
                            src={bknight}/>}
                        {element.name==='bbishop' && <img className={bclass}  onClick={()=>{
                            if(checkTurn('b')){
                              bishopClick(grid,setGrid,rowindex,index,-1,'b',setActive,active)}} 
                             }
                            src={bbishop}/>}
                        {element.name==='bking' && <img className={bclass} onClick={()=>{
                            if(checkTurn('b')){
                              kingClick(grid,setGrid,rowindex,index,-1,'b',setActive,active)}} 
                             }
                            src={bking}/>}
                        {element.name==='bqueen' && <img className={bclass} onClick={()=>{
                            if(checkTurn('b')){
                                queenClick(grid,setGrid,rowindex,index,-1,'b',setActive,active)}}  
                             }
                            src={bqueen}/>}

                        {/* hightlight render */}
                        {element.name==='ahighlight' && <img onClick={()=>{
                            setTurn('b')
                            highlightClick(grid,setGrid,rowindex,index,active,setActive,'a')}} src={ahighlight}/>}
                        {element.name==='bhighlight' && <img onClick={()=>{
                            setTurn('a')
                            highlightClick(grid,setGrid,rowindex,index,active,setActive,'b')}}  src={bhighlight}/>}
                        {/* kill highlight */}
                        {element.kill && element.kill ==='akill' && 
                            <>
                                <img src={ahighlight}></img>
                                <div onClick={()=>{
                                    setTurn('b')
                                    highlightClick(grid,setGrid,rowindex,index,active,setActive,'a')}
                                    } className='kill-div'></div>
                            </>
                        }
                        {element.kill && element.kill ==='bkill' && 
                        <>
                                <img  src={bhighlight}></img>
                                <div onClick={()=>{
                                    setTurn('a')
                                    highlightClick(grid,setGrid,rowindex,index,active,setActive,'b')
                                    }}  className='kill-div'></div>
                            </>
                        }
                    </>
                }
            </div>  
        </>
    );
}
