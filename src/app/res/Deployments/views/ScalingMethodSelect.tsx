import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseSelect } from 'app/components/inputs';
import { DeploymentImagesModel } from 'app/res/Workspaces/models/DeploymentImages';
import { FormModel } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { DeploymentLabelingUtil } from '@agoracloud/common';

export const ScalingMethodSelect = observer((props: { form: FormModel }) => {
  const { form } = props;
  const options = [
    {
      value: 'ALWAYS_ON',
      label: 'Always On',
      // label: DeploymentLabelingUtil.generateScalingMethodLabel("ALWAYS_ON")
    },
    {
      value: 'ON_DEMAND',
      label: 'On Demand',
      // label: DeploymentLabelingUtil.generateScalingMethodLabel("ON_DEMAND")
    },
  ];
  const scalingMethod = form.get('scalingMethod');

  const onChange = (id) => {
    return (e) => {
      form.onChange(id)(e.target.value);
    };
  };

  return (
    <>
      <BaseSelect
        {...props}
        id="scalingType"
        label="Type"
        defaultValue={options[0]}
        options={options}
        onChange={onChange('scalingMethod')}
        value={scalingMethod}
      />
    </>
  );
});
