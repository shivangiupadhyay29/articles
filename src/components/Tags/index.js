import React from 'react';
// import {Container, Row, Col} from 'react-bootstrap';
import './index.css';

export default ({ tagList, click, filterClicked }) => {
    const clickHandler = (element) => filterClicked?filterClicked(element):null;
    return  (<div onClick={click ? click:''}>
                <ul style={{ marginTop: 2.5+'rem', cursor: 'pointer'}}> 
                {tagList.map(element => <li  
                   className={ filterClicked?'tag-chip tag-chip-spacing chip-color-change' :'tag-chip tag-chip-spacing'}
                   onClick={clickHandler(element)}>{element}</li>)}
                </ul>
    </div>);
}