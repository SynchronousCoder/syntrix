import React from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import Transparent from './Transparent'

const Footer = ({ btnAnimation }) => {
  return (
    <div>
      <Page1 btnAnimation={btnAnimation} />
      <Transparent />
      <Page2 />
    </div>
  )
}

export default Footer;
