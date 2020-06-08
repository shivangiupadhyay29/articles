import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";


const Loader = ({ children,loading }) => {
    return loading? ReactDOM.createPortal(<div className={'loading-overlay'}>
                        {children}   
        </div>,document.getElementById('loader-root')):null;

}

export default Loader;