import * as React from 'react';
import {Cell} from "../../models/Cell";
import {FC, memo, ReactElement, useCallback} from "react";
import styles from './CellComponent.module.scss'
import classNames from "classnames";

type CellComponentProps = {
    cell: Cell
    selected: boolean
    onSelectedCell: (cell: Cell) => void
};
export const CellComponent: FC<CellComponentProps> = memo((props: CellComponentProps): ReactElement => {
    const {cell, selected, onSelectedCell} = props


    const onClickHandler = useCallback(() => {
        onSelectedCell(cell)
    }, [onSelectedCell,cell])

    return (
        <div
            className={classNames(styles.cell,cell.color,{
                [styles.selected] : selected,
                [styles.background]:cell.available && cell.figure
            })}
            onClick={onClickHandler}
        >
            {cell.available && !cell.figure && <div className={styles.available}/>}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="figure"/>}
        </div>
    );
});