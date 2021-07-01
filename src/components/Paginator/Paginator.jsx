import React, {useState} from "react";
import './paginator.scss';
// import cn from 'classnames';

const Paginator = ({totalItemCount, pageSize, currentPage, onPageChanged, portionSize = 20}) => {

    const pagesCount = Math.ceil(totalItemCount/pageSize);

    let pages = [];
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
                <span key={p} className={currentPage === p ? 'activePage' : ''}
                      onClick={() => {onPageChanged(p)}}>{`${p} `}</span>
            ))}

            {portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>next</button>}
        </div>

    )
}

export default Paginator;