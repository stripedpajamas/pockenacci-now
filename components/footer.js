import React from 'react'
import {
  Grid,
  Link
} from '@chakra-ui/core'

export default function Footer () {
  return (
    <Grid px='2em' py='1em' justifyContent='center' gridTemplateColumns='auto auto' columnGap='2em' fontSize='12px'>
      <span>Copyright © 2020 Peter Squicciarini</span>
      <span>
        <Link href='https://github.com/stripedpajamas/pockenacci-now/blob/master/LICENSE'>MIT License</Link><span> / </span>
        <Link href='https://github.com/stripedpajamas/pockenacci-now'>Github</Link><span> / Made with </span>
        <Link href='http://nextjs.com/'>Next.js</Link> & <Link href='https://chakra-ui.com/'>Chakra UI</Link>
      </span>
    </Grid>
  )
}
