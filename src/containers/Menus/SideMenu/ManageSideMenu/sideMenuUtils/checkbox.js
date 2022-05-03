import React, { useState } from 'react'
import { FormControlLabel, Checkbox, Grid } from '@material-ui/core'

export default function ChecboxInput({ labelName, name, selected, ...props }) {

  const [checked, setChecked] = useState(selected)
  const fieldsData = props;
  return (
    <>
      <Grid item>
        <FormControlLabel
          name={name}
          control={<Checkbox color="primary"
            inputRef={props?.props?.register ? props.props.register({ required: fieldsData.required }) : null}
            name={name} {...props}
            checked={checked}
            onChange={event => setChecked(event.target.checked)}
          />}
          label={labelName}
        />
      </Grid>
    </>
  )
}
