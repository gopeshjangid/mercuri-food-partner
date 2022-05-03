import React from 'react'
import { FormControlLabel } from '@material-ui/core'

export default function FormcontrolPreventAction({ Component }) {

  return (
    <>
      <FormControlLabel
        onClick={event => event.stopPropagation()}
        onFocus={event => event.stopPropagation()}
        control={Component}
      />
    </>
  )
}
