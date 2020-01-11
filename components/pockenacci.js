import React, { useState } from 'react'
import {
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Flex,
  Box
} from '@chakra-ui/core'
import ActionOption from '../components/actionOption'
import { encrypt, decrypt } from 'pockenacci'

export default function Pockenacci () {
  const [action, setAction] = useState('encrypt')
  const [input, setInput] = useState('')
  const [mac, setMac] = useState('')
  const [key, setKey] = useState('')
  const [formError, setFormError] = useState('')

  function onFormChange (key, val) {
    setFormError('')
    switch (key) {
      case 'input':
        setInput(val)
        break
      case 'mac':
        setMac(val)
        break
      case 'key':
        setKey(val)
        break
      case 'action':
        setAction(val)
        break
      default:
        break
    }
  }

  function onSubmit (e) {
    e.preventDefault()
    switch (action) {
      case 'encrypt': {
        try {
          const { ciphertext, mac } = encrypt(input, key)
          setAction('decrypt')
          setInput(ciphertext)
          setMac(mac)
        } catch (e) {
          setFormError(e.message)
        }
        break
      }
      case 'decrypt': {
        try {
          const { plaintext } = decrypt(input, mac, key)
          setAction('encrypt')
          setInput(plaintext)
          setMac('')
        } catch (e) {
          console.error(e)
          setFormError(e.message)
        }
        break
      }
      default: {
        throw new Error('Something went wrong')
      }
    }
  }

  return (
    <FormControl isInvalid={formError}>
      <form onSubmit={onSubmit}>
        <Box>
          <FormLabel htmlFor='input'>{action === 'encrypt' ? 'Plaintext' : 'Ciphertext'}</FormLabel>
          <Textarea
            value={input}
            name='input'
            placeholder='Type your message here...'
            onChange={e => onFormChange('input', e.target.value)}
          />
        </Box>
        <Box d={(action === 'encrypt') && 'none'}>
          <FormLabel htmlFor='mac'>MAC</FormLabel>
          <Textarea
            value={mac}
            name='mac'
            placeholder='Type your MAC here...'
            isDisabled={action === 'encrypt'}
            onChange={e => onFormChange('mac', e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel htmlFor='key'>Key</FormLabel>
          <Input
            isInvalid={key.length && key.length < 6}
            value={key}
            name='key'
            placeholder='Type your key here...'
            autoComplete='off'
            onChange={e => onFormChange('key', e.target.value)}
          />
          {key.length > 0 && key.length < 6 && (
            <FormHelperText>
              Key must be at least 6 letters long.
            </FormHelperText>
          )}
        </Box>
        <FormErrorMessage>{formError}</FormErrorMessage>
        <Flex align='center' mt={3} justifyContent='space-between'>
          <ActionOption
            value={action}
            onChange={a => onFormChange('action', a)}
          />
          <Button ml={3} variantColor='teal' type='submit'>
              Submit
          </Button>
        </Flex>
      </form>
    </FormControl>
  )
}
