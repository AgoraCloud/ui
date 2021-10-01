import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { WORKSPACES_STORE, roles } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { Workspace } from 'app/workspace/model';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, SelectProps } from '@material-ui/core';
import { FormModel } from '@mars-man/models';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
      color: 'white',
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
  },
  input: {
    '&::selection': {
      // backgroundColor: "lightgreen",
      color: 'white',
    },
  },
}));
const useLabelStyles = makeStyles({
  root: {
    color: 'white',
    '&.Mui-focused': {
      color: 'white',
    },
  },
});

export const WorkspaceSelect = inject(WORKSPACES_STORE)(
  observer((props) => {
    const store = props[WORKSPACES_STORE] as WorkspacesStore;
    const options = store.workspaces.workspaces;
    const classes = useStyles();
    const labelClasses = useLabelStyles();

    const onChange = (option, values) => {
      store.selectedWorkspace = values;
    };
    const loading = store.state !== 'loaded';

    // this is temporary because of an uncontrolled -> controlled error that I can't debug rn
    if (loading) return null;
    return (
      <Autocomplete
        id="combo-box-demo"
        loading={loading}
        classes={classes}
        value={store.selectedWorkspace}
        onChange={onChange}
        options={options}
        getOptionLabel={(option: Workspace) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ classes: labelClasses }}
            label="Select Workspace..."
            variant="outlined"
          />
        )}
      />
    );
  }),
);

interface BaseSelectProps extends SelectProps {
  form: FormModel;
  id: string;
  options: { label: string; value: any }[];
}

export const BaseSelect = observer((props: BaseSelectProps) => {
  /**
   *  Material UI Select doesn't work well with Objects, as such I've casted them to strings using JSON.stringify()
   *  and on change I parse the value back to an object
   *
   *  that means that this only works for Objects currently
   */
  const { form, id, options, ...rest } = props;
  const value = form.get(id);
  const error = form.getError(id);

  return (
    <Select
      // native
      error={value && error != undefined}
      value={value}
      style={{ width: '100%' }}
      onChange={form.onChange(id)}
      variant="outlined"
      {...rest}
    >
      {options.map((option) => {
        // JSON.stringify(option.value) ???
        return (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
});

//  FormModel<{ roles: string[] }, { roles: string[] }>
export const RolesSelect = observer((props: { form: FormModel }) => {
  return <BaseSelect {...props} id="roles" options={roles} multiple />;
});
