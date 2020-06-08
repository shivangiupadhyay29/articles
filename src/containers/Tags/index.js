import React, { useEffect } from 'react';
import action from '../../redux';
import { useSelector,useDispatch} from 'react-redux';
import TagChip from '../../components/Tags';
import './index.css';

function Tags( { click }){
    const { tags:{ getTags }} = action;
    const tags = useSelector(state => state.tag.tags);
    const loading = useSelector(state => state.tag.loading);

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getTags());
    },[]);

    if(tags === [] && !loading)
    return <h6>{'No tags yet.....' }</h6>
    else if(!loading)
    return <TagChip tagList={tags} filterClicked={click}/>
    else 
    return <h6>{'Loading.....' }</h6>
}

export default Tags;