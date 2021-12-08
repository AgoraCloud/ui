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
  const value = form.get(id);
  // const error = form.getError(id)
  const error = form.errors[id];
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
      // required
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

export const ResourcesInput = (props: {
  form: FormModel;
  resourcesRequired?: boolean;
}) => {
  const classes = useStyles();
  const { form, resourcesRequired } = props;

  const [persist, setPersist] = React.useState(false);

  const handleCheckbox = () => {
    form.onChange('storageCount')(persist ? 8 : undefined);
    setPersist(!persist);
  };

  return (
    <>
      <CPUMemoryInput form={form} cpuMemoryRequired={resourcesRequired} />
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
          label="Storage (GBs)"
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

export const CPUMemoryInput = ({
  form,
  cpuMemoryRequired,
}: {
  form: FormModel<{ cpuCount?: number; memoryCount?: number }>;
  cpuMemoryRequired?: boolean;
}) => {
  return (
    <>
      <CPUInput form={form} cpuRequired={cpuMemoryRequired} />
      <MemoryInput form={form} memoryRequired={cpuMemoryRequired} />
    </>
  );
};

export const StorageInput = ({
  form,
}: {
  form: FormModel<{ storageCount?: number }>;
}) => {
  return (
    <ResourceInput
      form={form}
      id="storageCount"
      label="Storage (GBs)"
      icon={<StorageIcon />}
      inputRequired={false}
    />
  );
};

export const CPUInput = ({
  form,
  cpuRequired,
}: {
  form: FormModel<{ cpuCount?: number }>;
  cpuRequired?: boolean;
}) => {
  return (
    <ResourceInput
      form={form}
      id="cpuCount"
      label="CPU Cores"
      icon={<MemoryIcon />}
      inputRequired={cpuRequired}
    />
  );
};

export const MemoryInput = ({
  form,
  memoryRequired,
}: {
  form: FormModel<{ memoryCount?: number }>;
  memoryRequired?: boolean;
}) => {
  return (
    <ResourceInput
      form={form}
      id="memoryCount"
      label="RAM (GBs)"
      icon={<MoneyIcon />}
      inputRequired={memoryRequired}
    />
  );
};

export const ResourceInput = ({ form, id, icon, label, inputRequired }) => {
  const classes = useStyles();

  return (
    <Input
      form={form}
      className={classes.margin}
      margin="dense"
      id={id}
      label={label}
      type="number"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
      }}
      defaultVal={form.get(id)}
      fullWidth
      required={inputRequired}
    />
  );
};
