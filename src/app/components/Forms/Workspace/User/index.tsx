import * as React from 'react'
import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import { USER_STORE } from 'app/constants'
import { UserStore } from 'app/stores';



export const UpdateUserForm = inject(USER_STORE)(observer((props) => {
    const store = props[USER_STORE] as UserStore
    const form = store.updateUserForm
    return <div>
        <Typography variant="h4">
            Edit Profile
        </Typography>
        <Typography variant="h6" style={{marginTop: "20px"}}>
            Full Name
        </Typography>
        <TextField
            autoFocus
            onChange={form.onInputChange("fullName")}
            error={form.getError("fullName") != undefined && form.data["fullName"] != ""}
            helperText={form.data["fullName"] != "" ? form.getError("fullName") : undefined} // to be implemented (currently all errors are just 'error')
            defaultValue={store.userFullName}
            variant="outlined"
            margin="dense"
            type="text"
            label="Required"
            required
            fullWidth
            id="fullName"
            name="fullName"
        />
        <div style={{float: 'right'}}>
            <Button color="primary">
                Cancel
            </Button>

            <Button onClick={store.updateUser} disabled={!form.isValid} color="primary">
                Save
            </Button>
        </div>
    </div>
}))