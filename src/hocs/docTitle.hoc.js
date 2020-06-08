import React, { useEffect } from 'react';
import { docTitle, mapRoutesToName } from '../constants';
import { useLocation } from 'react-router-dom';


function withDocTitle(WrappedComponent){
  return (props) => {
    const location =  useLocation();
    const { pathname } = location;

    useEffect(() => {
      let title = mapRoutesToName[pathname]?
                     mapRoutesToName[pathname]:
                     pathname.split('/')[1];
        document.title=`${title}${docTitle}`;
      },[pathname]);

     return <WrappedComponent {...props} />
    
  };
}

export default withDocTitle;
