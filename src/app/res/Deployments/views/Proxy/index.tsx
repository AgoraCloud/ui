import * as React from 'react';
import style from './style.module.scss';
import { inject, observer } from 'mobx-react';
import { WORKSPACES_STORE } from 'app/constants';
import { WorkspacesStore } from 'app/stores';
import { ProxyWrapper } from 'app/components/Wrapper';
import { useStores } from 'app/stores';

export const DeploymentProxy = inject(WORKSPACES_STORE)(
  observer((props) => {
    const { workspacesstore } = useStores();
    const [state, setState] = React.useState('loading');
    const deployment = workspacesstore.selectedDeployment;
    if (!deployment) return null;
    const did = deployment.id;
    return (
      <ProxyWrapper>
        <iframe
          id={style.iframe}
          src={`https://${deployment.proxyUrl}`}
          onLoad={() => {
            setState('loaded');
          }}
        />
      </ProxyWrapper>
    );
  }),
);
