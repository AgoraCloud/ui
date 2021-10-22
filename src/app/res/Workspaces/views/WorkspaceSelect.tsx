import { rootStore } from 'app/stores';
import { observer } from 'mobx-react';
import * as React from 'react';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { WorkspaceModel } from '../models';
import { useStores } from 'app/stores';

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

export const WorkspaceSelect = observer(() => {
  const { workspacesstore } = useStores();
  const classes = useStyles();
  const labelClasses = useLabelStyles();
  const workspaces = workspacesstore.workspaces;

  const options = workspaces.workspaces;
  const loading = workspaces.state !== 'loaded';
  const selectedWorkspace = workspacesstore.selectedWorkspace;
  const onChange = (option, values) => {
    workspacesstore.selectedWorkspace = values;
    // workspacesstore.selectWorkspace(option)
  };
  return (
    <div>
      <Autocomplete
        id="combo-box-demo"
        loading={loading}
        classes={classes}
        value={selectedWorkspace}
        onChange={onChange}
        options={options}
        getOptionLabel={(option: WorkspaceModel) => option.name}
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
    </div>
  );
});
