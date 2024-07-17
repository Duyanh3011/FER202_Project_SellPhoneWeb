import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Headers from './Headers'

export default function Profile() {
  return (
    <div>
        <Headers />
        <Container style={{ paddingTop: 50 }}>
      <h1>Profile</h1>
      </Container>
      <Footer/>
    </div>
  )
}
