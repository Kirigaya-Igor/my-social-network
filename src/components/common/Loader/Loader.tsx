import React from "react";
import loader from "../../assets/images/Rolling-1s-200px.svg";

const Loader: React.FC = () => {
    return (
        <div className='loader'>
            <img src={loader}/>
        </div>
    )
}

export default Loader;