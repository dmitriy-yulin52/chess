import * as React from 'react';
import {Board} from "../../models/Board";
import {FC, memo, ReactElement, useCallback, useEffect, useState} from "react";
import {CellComponent} from "../CellComponent/CellComponent";
import {Cell} from "../../models/Cell";
import styles from './BoardComponent.module.scss'

type BoardComponentProps = {
    board: Board;
    setBoard: (board: Board) => void;
};
export const BoardComponent: FC<BoardComponentProps> = memo((props): ReactElement => {
    const {board, setBoard} = props

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)


    const onClickSelectedCell = useCallback((cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
        }
        if (cell.figure) {
            setSelectedCell(cell)
        }
    }, [setSelectedCell, selectedCell])


    const updateBoard = useCallback(() => {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }, [setBoard, board])

    const highlightCells = useCallback(() => {
        board.highlightCells(selectedCell)
        updateBoard()
    }, [updateBoard, selectedCell, board])

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    return (
        <div className={styles.board}>
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map((cell) =>
                        <CellComponent
                            onSelectedCell={onClickSelectedCell}
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                        />
                    )}
                </React.Fragment>
            )}
        </div>
    );
});