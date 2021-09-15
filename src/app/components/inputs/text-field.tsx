import * as React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { BaseFormModel } from 'app/forms';
import { observer } from 'mobx-react';

interface InputProps extends StandardTextFieldProps {
  form: BaseFormModel<any, any>;
  id: string;
  workspaceCheck?: boolean;
  defaultVal?: number;
}
export const Input = observer((props: InputProps) => {
  const { form, id, children, workspaceCheck, defaultVal, ...rest } = props;
  let val = form.data[id];
  if (workspaceCheck) {
    val = String(defaultVal);
  }

  return (
    <TextField
      onChange={form.onInputChange(id)}
      error={form.getError(id) != undefined && val != ''}
      helperText={val != '' ? form.getError(id) : undefined} // to be implemented (currently all errors are just 'error')
      value={workspaceCheck ? undefined : val}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={id}
      name={id}
      defaultValue={workspaceCheck && Number(val)}
      {...rest}
    >
      {children}
    </TextField>
  );
});

// icons
import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';
import {
  InputAdornment,
  makeStyles,
  Checkbox,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  subtitle: {
    margin: theme.spacing(1, 0, 1, 0),
    color: 'inherit',
    variant: 'subtitle1',
  },
}));

export const ResourceInput = (props: { form: BaseFormModel<any, any> }) => {
  const classes = useStyles();
  const { form } = props;

  const [persist, setPersist] = React.useState(true);

  const handleCheckbox = () => {
    form.onChange('storageCount')(persist ? undefined : 8);
    setPersist(!persist);
  };

  return (
    <>
      <CPUMemoryInput form={form} />
      <Typography>
        <Checkbox
          checked={persist}
          onChange={handleCheckbox}
          name="checkedB"
          color="primary"
        />
        Persist deployment
      </Typography>
      {persist ? (
        <Input
          form={form}
          className={classes.margin}
          margin="dense"
          id="storageCount"
          label="Storage"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <StorageIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      ) : null}
    </>
  );
};

interface UpdateWorkspaceProps {
  check: boolean;
  values?: {
    cpu: number | undefined;
    ram: number | undefined;
    storage: number | undefined;
  };
}

export const CPUMemoryInput = (props: {
  form: BaseFormModel<any, any>;
  fromWorkspace?: UpdateWorkspaceProps;
}) => {
  const classes = useStyles();
  const { form } = props;
  return (
    <>
      <Input
        form={form}
        className={classes.margin}
        margin="dense"
        id={
          props.fromWorkspace?.check
            ? 'properties.resources.cpuCount'
            : 'cpuCount'
        }
        label="CPU"
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MemoryIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        workspaceCheck={props.fromWorkspace?.check}
        defaultVal={props.fromWorkspace?.values?.cpu}
      />
      <Input
        form={form}
        className={classes.margin}
        margin="dense"
        id={
          props.fromWorkspace?.check
            ? 'properties.resources.memoryCount'
            : 'memoryCount'
        }
        label="RAM"
        type="number"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoneyIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        workspaceCheck={props.fromWorkspace?.check}
        defaultVal={props.fromWorkspace?.values?.ram}
      />
      {props.fromWorkspace?.check && (
        <Input
          form={form}
          className={classes.margin}
          margin="dense"
          id="properties.resources.storageCount"
          label="Storage"
          type="number"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoneyIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          workspaceCheck={props.fromWorkspace?.check}
          defaultVal={props.fromWorkspace?.values?.storage}
        />
      )}
    </>
  );
};
