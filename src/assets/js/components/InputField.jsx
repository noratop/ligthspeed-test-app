import React, { Component, PropTypes } from 'react';

class InputField extends Component {

  render(){
      const {label,type,name,required,defaultValue} = this.props;
    return (
      <div className='dialog__content__row'>
        <label htmlFor={name}><nobr>{label}</nobr></label>
        <input type='text' ref={name} required={required} defaultValue={defaultValue}/>
      </div>
    )
  }
}

export default InputField;
