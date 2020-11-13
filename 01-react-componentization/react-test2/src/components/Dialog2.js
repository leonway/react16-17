import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'


export default function Dialog2() {

  // let node = useRef(document.createElement('div')).current
  let node =document.createElement('div')
  document.body.appendChild(node)
  console.log('Dialog2.js');
  return createPortal(<div className='dialog'>dialog</div>,node)
}
