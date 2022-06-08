import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon';
import { idText } from 'typescript';
import axios from 'axios';
import {encode, decode, labels} from 'windows-1250';

import * as windows1250 from 'windows-1250';


type Props = {}





const Obed = (props: Props) => {
  
  let actionB = false
  const name = 'Josh Perez';
  const element = [<h1>Hello, {name}</h1>];
  const [aktual, setAktual] = useState(element)

  function NewlineText() {
    axios.get(
        `http://localhost:3000/obed.txt`
      ).then(response =>{
        const text = response.data
        const newText = text.split('\n').map((str: any) => <><h2 className='obed'>{str}</h2></>);
        setAktual(newText)
      })
    
    
    
    
  }

  useEffect(()=>{
    setInterval(()=>{
        NewlineText()
    }, 1000)
  }, []); 
 
  

  
  return (
    <>
    <div className='obed'>
    <h2 className='obed'>{aktual}</h2><br /><br />
    </div>
    </>
  )
}

export default Obed