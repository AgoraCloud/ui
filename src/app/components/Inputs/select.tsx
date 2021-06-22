import * as React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { WORKSPACES_STORE, roles } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { Workspace } from 'app/workspace/model';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, SelectProps } from '@material-ui/core';
import { BaseFormModel } from 'app/forms';
import { DeploymentFormModel } from 'app/workspace/deployment';

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
  // value: any
  // handleChange: (value: any)=>any
  form: BaseFormModel<any, any>;
  id: string;
  options: { label: string; value: any }[];
}

export const BaseSelect = (props: BaseSelectProps) => {
  /**
   *  Material UI Select doesn't work well with Objects, as such I've casted them to strings using JSON.stringify()
   *  and on change I parse the value back to an object
   *
   *  that means that this only works for Objects currently
   */
  const { form, id, options, ...rest } = props;
  const value = form.get(id);

  return (
    <Select
      // native
      value={value}
      style={{ width: '100%' }}
      onChange={form.onChange(id)}
      variant="outlined"
      {...rest}
    >
      {options.map((option) => {
        return (
          <MenuItem key={option.label} value={JSON.stringify(option.value)}>
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

const images = [
  {
    label: 'Code Server v3.8.0',
    value: {
      name: 'linuxserver/code-server',
      tag: 'version-v3.8.0',
    },
  },
];
export const ImageSelect = observer(
  (props: {
    form: DeploymentFormModel<any, any>;
    id: string;
    // workspace: Workspace
  }) => {
    const { form, id } = props;
    const images = form!.workspace.deploymentImages.images;
    const onChange = (e) => {
      form.onChange(id)(JSON.parse(e.target.value));
    };
    const value = form.get(id);
    return (
      <BaseSelect
        {...props}
        label="Image"
        defaultValue={images[0]}
        options={images}
        onChange={onChange}
        value={JSON.stringify(value)}
      />
    );
  },
);

export const RolesSelect = observer(
  (props: {
    form: BaseFormModel<{ roles: string[] }, { roles: string[] }>;
  }) => {
    return <BaseSelect {...props} id="roles" options={roles} multiple />;
  },
);
