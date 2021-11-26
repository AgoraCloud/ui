import * as React from 'react';
import { observer } from 'mobx-react';
import { BaseSelect } from 'app/components/inputs';
import {
  DeploymentImagesModel,
  label_i,
} from 'app/res/Workspaces/models/DeploymentImages';
import { FormModel } from '@mars-man/models';
import { WorkspaceModel } from 'app/res/Workspaces/models';
import { DeploymentModel } from 'app/res/Deployments';

export const ImageSelectBase = observer(
  (props: {
    workspace: WorkspaceModel;
    form: FormModel;
    disableImage?: boolean;
    disableVersion?: boolean;
    types: label_i[];
    versions: label_i[];
  }) => {
    const { form, workspace, types, versions } = props;
    const images = workspace.deploymentImages;
    const type = form.get('type') || images.types[0];
    const version = form.get('version');

    return (
      <>
        <BaseSelect
          {...props}
          disabled={props.disableImage ? props.disableImage : false}
          id="imageType"
          label="Type"
          defaultValue={types[0]}
          options={types}
          onChange={form.onChange('type')}
          value={type}
        />
        <BaseSelect
          {...props}
          disabled={props.disableVersion ? props.disableVersion : false}
          id="imageVersion"
          label="Version"
          defaultValue={versions[0]}
          options={versions}
          onChange={form.onChange('version')}
          value={version}
        />
      </>
    );
  },
);

export const ImageSelect = observer(
  (props: {
    workspace: WorkspaceModel;
    form: FormModel;
    disableImage?: boolean;
  }) => {
    const { form, workspace } = props;
    const images = workspace.deploymentImages;
    const types = images.getTypes();
    const type = form.get('type') || images.types[0];
    // const version = form.get('version');
    const versions = images.getVersions(type);

    // const onChange = (id) => {
    //   return (e) => {
    //     form.onChange(id)(e.target.value);
    //   };
    // };

    return <ImageSelectBase {...props} types={types} versions={versions} />;
  },
);

export const UpdateImageSelect = observer(
  (props: {
    workspace: WorkspaceModel;
    deployment: DeploymentModel;
    form: FormModel;
  }) => {
    const { form, workspace, deployment } = props;
    const images = workspace.deploymentImages;
    const types = images.getTypes();
    const type = form.get('type') || images.types[0];
    const version = form.get('version');
    const versions = images.getHigherVersions(
      type,
      deployment.data.properties.image.version,
    );
    return (
      <ImageSelectBase
        {...props}
        types={types}
        versions={versions}
        disableImage={true}
        disableVersion={versions.length === 1}
      />
    );
  },
);
