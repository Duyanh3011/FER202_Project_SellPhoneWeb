import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from './Footer'
import Headers from './Headers'
import Content from './Content'


export default function Home() {
  return (
    <>
    <Headers/>
    <Container>
      <Content/>
    </Container>
    <Footer/>
    </>
  )
}
