import React, {useState} from "react";
import './paginator.scss';
import cn from 'classnames';

type PropsType = {
    totalItemCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemCount, pageSize, currentPage, onPageChanged, portionSize = 20}) => {

    const pagesCount = Math.ceil(totalItemCount/pageSize);

    let pages: Array<number> = [];
    for(let i=1; i <=pagesCount; i++){
        pages.push(i);
    }

    const portionCount = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className='paginator'>
            {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>prev</button>}

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => (
                <span key={p} className={cn({['activePage']: currentPage === p})}
                      onClick={() => {onPageChanged(p)}}>{`${p} `}</span>
            ))}

            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button>}
        </div>

    )
}

export default Paginator;