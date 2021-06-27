import React from "react";
import './paginator.scss';

const Paginator = ({allUsers, pageSize, currentPage, onPageChanged}) => {

    const pagesCount = Math.ceil(allUsers/pageSize);

    let pages = [];
    for(let i=1; i <=pagesCount; i++){
        pages.push(i);
    }

    return (
        <div>
            {pages.map((p) => (
                <span key={p} className={currentPage === p ? 'activePage' : ''}
                      onClick={() => {onPageChanged(p)}}>{`${p} `}</span>
            ))}
        </div>

    )
}

export default Paginator;