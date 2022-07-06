import * as React from 'react';
import './App.scss';
import {BoardComponent} from "./components/BoardComponent/BoardComponent";
import {Board} from "./models/Board";
import {useCallback, useEffect, useState} from "react";

function App() {
    const [board, setBoard] = useState(new Board())


    useEffect(() => {
        restart()
    }, [])


    const restart = useCallback(() => {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures()
        setBoard(newBoard)
    }, [setBoard])

    const onClickSetBoard = useCallback((board:Board)=>{
        setBoard(board)
    },[setBoard])


    return (
        <div className="app">
            <BoardComponent board={board} setBoard={onClickSetBoard}/>
        </div>
    );
}

export default App;
