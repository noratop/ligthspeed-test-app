import React, { Component, PropTypes } from 'react';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import FilterButton from './FilterButton';
import SortButton from './SortButton';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';

function ContactToolBar({userSelection}) {
  return (
    <div className='toolbar'>
      <AddButton/>
      <DeleteButton userSelection={userSelection}/>
      <FilterButton/>
      <SortButton/>
    </div>
  )
}

export default ContactToolBar;
