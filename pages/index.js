import React from 'react'
import Head from 'next/head'
import {
  Heading,
  Grid
} from '@chakra-ui/core'
import Pockenacci from '../components/pockenacci'
import Footer from '../components/footer'

export default function Home () {
  return (
    <>
      <Head>
        <title>Pockenacci</title>
      </Head>
      <Grid minHeight='100vh' gridTemplateColumns='20% 1fr 20%' gridTemplateRows='20% 1fr auto'>
        <Heading alignSelf='center' size='2xl' gridColumn={2}>Pockenacci</Heading>
        <Grid gridColumn={2}>
          <Pockenacci />
        </Grid>
        <Grid gridColumn='span 3'>
          <Footer />
        </Grid>
      </Grid>
    </>
  )
}
