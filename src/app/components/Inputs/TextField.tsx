import * as React from 'react'
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { BaseFormModel } from 'app/forms';
import { observer } from 'mobx-react';

interface InputProps extends StandardTextFieldProps {
    form: BaseFormModel<any, any>
    id: string
}
export const Input = observer((props: InputProps) => {
    const { form, id, ...rest } = props
    const val = form.data[id]
    return <TextField
        onChange={form.onInputChange(id)}
        error={form.getError(id) != undefined && val != ""}
        helperText={val != "" ? form.getError(id) : undefined} // to be implemented (currently all errors are just 'error')
        value={val}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={id}
        name={id}
        {...rest}
    />
})