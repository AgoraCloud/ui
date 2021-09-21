import { rootStore } from 'app/stores';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

export const NewWorkspaceSelect = observer(() => {
  const { workspacesstore } = rootStore.stores;
  console.log(workspacesstore);
  return (
    <div>
      <button onClick={() => (workspacesstore.count += 1)}>Click</button>
      new workspace select {workspacesstore.count}
    </div>
  );
});
