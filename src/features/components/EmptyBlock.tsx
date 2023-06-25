import React from 'react'
import {AiFillProfile} from 'react-icons/ai'

const EmptyBlock = () => {
  return (
    <div style={{textAlign:'center',marginTop: '50px', width: '100%'}}>
        <AiFillProfile style={{fontSize:'5rem'}}/>
        <h3>No Tasks</h3>
        <p>Please add new task</p>
    </div>
  )
}

export default EmptyBlock