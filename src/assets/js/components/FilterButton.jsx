import React, { Component, PropTypes } from 'react';
import FilterIcon from 'material-ui/lib/svg-icons/content/filter-list';

function FilterButton(){
  return (
    <div className='toolbar__element toolbar__icon'><FilterIcon style={{height: '100%',width: 'auto',fill:'white'}}/></div>
  )
}

export default FilterButton;
