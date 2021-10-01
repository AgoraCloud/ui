import * as React from 'react';
import TextField, { StandardTextFieldProps } from '@material-ui/core/TextField';
import { observer } from 'mobx-react';

interface InputProps extends StandardTextFieldProps {
  form: FormModel;
  id: string;
  workspaceCheck?: boolean;
  defaultVal?: number;
}
export const Input = observer((props: InputProps) => {
  const { form, id, children, workspaceCheck, defaultVal, ...rest } = props;
  let value = form.get(id);
  // const error = form.getError(id)
  const error = form.errors[id]
  // console.log(id, error, val)
  if (workspaceCheck) {
    // val = String(defaultVal);
  }
  return (
    <TextField
      onChange={form.onChange(id)}
      error={value && error != undefined}
      helperText={value ? error : undefined} // to be implemented (currently all errors are just 'error')
      value={value}
      variant="outlined"
      margin="normal"
      autoComplete="off"
      required
      fullWidth
      id={id}
      name={id}
      defaultValue={workspaceCheck && Number(value)}
      {...rest}
    >
      {children}
    </TextField>
  );
});



import MemoryIcon from '@material-ui/icons/Memory';
import MoneyIcon from '@material-ui/icons/Money';
import StorageIcon from '@material-ui/icons/Storage';
import {
  InputAdornment,
  makeStyles,
  Checkbox,
  Typography,
} from '@material-ui/core';
import { FormModel } from '@mars-man/models';

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

export const ResourceInput = (props: { form: FormModel }) => {
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
  form: FormModel<{cpuCount: number, memoryCount: number}>
}) => {
  const classes = useStyles();
  const { form } = props;
  return (
    <>
      <Input
        form={form}
        className={classes.margin}
        margin="dense"
        id='cpuCount'
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
        defaultVal={form.data['cpuCount']}
      />
      <Input
        form={form}
        className={classes.margin}
        margin="dense"
        id='memoryCount'
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
        defaultVal={form.data['memoryCount']}
      />
    </>
  );
};
