import React from 'react';
import { getFormatDate } from '../../utils';


export default ({ link, createdAt, authorUsername, inline=null}) => {
    return(
    <div style={inline?{display:'inline-flex'}:{}}>
        <a style={ link ?
            {...link, display: 'block', textAlign:'center', marginRight:0.5+"rem", marginLeft: 0.5+"rem",color:'green'}
            :{ display: 'block', textAlign:'center', color:'white', marginRight:0.5+"rem", marginLeft: 0.5+"rem" }
            } 
        href={`/@${ authorUsername }`}>{authorUsername}</a>
        <span style={{ color: '#bbb',fontSize: .8+'rem',display: 'block, marginRight:0.5+"rem", marginLeft: 0.5+"rem" '}}>{getFormatDate(createdAt)}</span>
    </div>)
}