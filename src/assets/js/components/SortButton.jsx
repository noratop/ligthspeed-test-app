import React, { Component, PropTypes } from 'react';
import SortIcon from 'material-ui/lib/svg-icons/content/sort';

function SortButton(){
  return (
    <div className='toolbar__element toolbar__icon'><SortIcon style={{height: '100%',width: 'auto',fill:'white'}}/></div>
  )
}

export default SortButton;
