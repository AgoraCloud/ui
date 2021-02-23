import * as React from "react"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { WORKSPACES_STORE } from "app/constants";
import { observer, inject } from "mobx-react";
import { WorkspacesStore } from "app/stores";
import { Workspace } from "app/models";
import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, SelectProps } from "@material-ui/core";
import { BaseFormModel } from "app/forms";



const useStyles = makeStyles(theme => ({
    root: {
        color: "white",
        "& .MuiOutlinedInput-notchedOutline": {
            color: "white",
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
        },
    },
    input: {
        "&::selection": {
            // backgroundColor: "lightgreen",
            color: "white"
        }
    }
}));
const useLabelStyles = makeStyles({
    root: {
        color: "white",
        "&.Mui-focused": {
            color: "white"
        }
    }
});




export const WorkspaceSelect = inject(WORKSPACES_STORE)(observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const options = store.workspaces.workspaces
    const classes = useStyles();
    const labelClasses = useLabelStyles()

    const onChange = (option, values) => {
        store.selectedWorkspace = values

    }
    const loading = store.state !== 'loaded'


    // this is temporary because of an uncontrolled -> controlled error that I can't debug rn
    if (loading) return null
    return <Autocomplete
        id="combo-box-demo"
        loading={loading}
        classes={classes}
        value={store.selectedWorkspace}
        onChange={onChange}
        options={options}
        getOptionLabel={(option: Workspace) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField
            {...params}
            InputLabelProps={{ classes: labelClasses }}
            label="Select Workspace..."
            variant="outlined" />}
    />
}))




interface BaseSelectProps extends SelectProps{
    // value: any
    // handleChange: (value: any)=>any
    form: BaseFormModel<any, any>
    id: string
    options: {label: string, value: any}[]
}

export const BaseSelect = (props: BaseSelectProps) => {
    // const { value, handleChange, options, ...rest } = props
    const { form, id, options, ...rest } = props
    const value = form.data[id]
    return <Select
        // native
        value={value}
        style={{ width: "100%" }}
        onChange={form.onInputChange(id)}

        variant="outlined"
        {...rest}
    >
        {options.map((option)=>{
            return <MenuItem key={option.label} value={option.value}>
                {option.label}
            </MenuItem>
        })}

    </Select>
}

const images = [
    {
        label: "Code Server v3.8.0",
        value: {
            "name": "linuxserver/code-server",
            "tag": "version-v3.8.0"
        }
    }
]
export const ImageSelect = (props: {
    form: BaseFormModel<any, any>
    id: string
}) => {

    return <BaseSelect {...props}
    label="Image"
    defaultValue=""
    options={images}/>
}