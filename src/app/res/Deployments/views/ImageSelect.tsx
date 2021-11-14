import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseSelect } from 'app/components/inputs';
import { DeploymentImagesModel } from 'app/res/Workspaces/models/DeploymentImages';
import { FormModel } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';

export const ImageSelect = observer(
  (props: { workspace: WorkspaceModel; form: FormModel, disableImage?: boolean }) => {
    const { form, workspace } = props;
    const images = workspace.deploymentImages;
    const types = images.getTypes();
    const type = form.get('type') || images.types[0];
    const version = form.get('version');
    const versions = images.getVersions(type);
    // console.log("YOOOO", types, versions, type, version)

    const onChange = (id) => {
      return (e) => {
        form.onChange(id)(e.target.value);
        // form.onChange(id)(JSON.parse(e.target.value));
      };
    };

    const onChangeType = (e) => {
      form.onChange('version')(undefined);
      return onChange('type')(e);
    };

    const onChangeVersion = (e) => {
      return onChange('version')(e);
    };

    return (
      <>
        <BaseSelect
          {...props}
          disabled={props.disableImage ? props.disableImage : false}
          id="type"
          label="Type"
          defaultValue={types[0]}
          options={types}
          onChange={onChangeType}
          value={type}
        />
        <BaseSelect
          {...props}
          id="version"
          label="Version"
          defaultValue={versions[0]}
          options={versions}
          onChange={onChangeVersion}
          value={version}
        />
      </>
    );
  },
);
