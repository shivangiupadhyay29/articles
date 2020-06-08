import React  from 'react';
import { Pagination } from 'react-bootstrap';
import './index.css';

const paginationBasic = (paginationTabCount, limit, offset, nextTabClickHandler, loading) => {

let items = [];

const calculateOffset = (number,limit) => {
    if(number === 1)
    return number-1;
    else 
    return (number-1)*limit;
}

const currentNumber = (offset,limit) => (offset/limit)+1;
for (let number = 1; number <= paginationTabCount; number++) {
      items.push(
        <Pagination.Item classType={'paginationChild'} key={number} active={number === ( currentNumber(offset,limit) )}
         onClick={   nextTabClickHandler(calculateOffset(number,limit)) }>
          { number}
        </Pagination.Item>,
      );
    }
    
return (
  <div style={{display:'inline-flex'}}>
      <div>
         {loading && <h6 style={{textAlign:'center'}}>{'Loading......'}</h6>}
        <Pagination style={{'flexWrap':'wrap'}}>
            {items}
        </Pagination>
        </div>
  </div>
)};

const PaginationTabs = ({ paginationTabCount, limit, offset, nextTabClickHandler, loading }) => {
    return (paginationBasic(paginationTabCount , limit, offset, nextTabClickHandler, loading ))
}

export default  PaginationTabs;