import React from 'react';
import Button from '@material-ui/core/Button';

/* 
  Button Component
  @param {string} name
  @param {func} handleClick
  @returns button element
 */
export default function MyButton(props){
  const btn_name = 'btn' + props.name;
  return (
    <Button value={btn_name} variant="outlined" color="primary" onClick={e => props.handleClick(btn_name)}>
          {props.name}
    </Button>
  );
}