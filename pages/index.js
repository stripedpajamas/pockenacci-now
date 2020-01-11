import React, { useState } from 'react'
import Head from 'next/head'
import { useForm, Controller } from 'react-hook-form'
import {
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Button,
  Flex
} from '@chakra-ui/core'
import ActionOption from '../components/actionOption'
import { encrypt, decrypt } from 'pockenacci'

export default function Home () {
  const { handleSubmit, register, control, setValue } = useForm()
  const [isEncrypt, setIsEncrypt] = useState(true)

  function onActionChange ([action]) {
    setIsEncrypt(action === 'encrypt')
    return { value: action }
  }

  function onSubmit ({ action, input, mac, key }) {
    console.log(action, input, key)
    if (action === 'encrypt') {
      const { ciphertext, mac } = encrypt(input, key)
      setValue('action', 'decrypt')
      onActionChange(['decrypt'])
      setValue('input', ciphertext)
      setValue('mac', mac)
    } else {
      const { plaintext } = decrypt(input, mac, key)
      setValue('input', plaintext)
      setValue('mac', '')
      setValue('action', 'encrypt')
      onActionChange(['encrypt'])
    }
  }

  return (
    <>
      <Head>
        <title>Pockenacci</title>
      </Head>
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel htmlFor='input'>Plaintext</FormLabel>
            <Textarea
              name='input'
              placeholder='Type your message here...'
              ref={register}
            />
            {!isEncrypt && (
              <>
                <FormLabel htmlFor='mac'>MAC</FormLabel>
                <Textarea
                  name='mac'
                  placeholder='Type your MAC here...'
                  isDisabled={isEncrypt}
                  ref={register}
                />
              </>
            )}
            <FormLabel htmlFor='key'>Key</FormLabel>
            <Input
              name='key'
              placeholder='Type your key here...'
              ref={register}
            />
          </FormControl>
          <Flex align='center'>
            <Controller
              as={ActionOption}
              name='action'
              control={control}
              onChange={onActionChange}
              defaultValue='encrypt'
            />
            <Button ml={3} variantColor='teal' type='submit'>
          Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  )
}
