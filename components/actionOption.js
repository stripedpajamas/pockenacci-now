import React from 'react'
import {
  Button,
  RadioButtonGroup
} from '@chakra-ui/core'

const CustomRadio = React.forwardRef((props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? 'teal' : 'gray'}
      aria-checked={isChecked}
      role='radio'
      isDisabled={isDisabled}
      {...rest}
    />
  )
})

export default function ActionOption (props) {
  return (
    <RadioButtonGroup
      defaultValue='encrypt'
      onChange={props.onChange}
      isInline
    >
      <CustomRadio value='encrypt'>Encrypt</CustomRadio>
      <CustomRadio value='decrypt'>Decrypt</CustomRadio>
    </RadioButtonGroup>
  )
}
