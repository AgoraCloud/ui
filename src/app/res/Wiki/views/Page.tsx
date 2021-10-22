import * as React from 'react';
import style from './style.module.scss';
import { observer } from 'mobx-react';
import { useStores } from 'app/stores';
import { Typography, IconButton, Grid, InputBase } from '@material-ui/core';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import * as Markdown from 'react-markdown';
import SaveIcon from '@material-ui/icons/Save';
import { WikiPageModel } from 'app/res/Wiki';

export const WikiPageHeaderTitle = observer(
  (props: { page: WikiPageModel }) => {
    const { page } = props;

    const { workspacesstore } = useStores();
    const form = page.pageForm;
    if (workspacesstore.wikiEdit)
      return (
        <InputBase
          value={form.get("title")}
          onChange={form.onChange("title")}
          style={{ fontSize: '3rem', letterSpacing: '0rem' }}
        />
      );

    return (
      <Typography variant="h3" style={{ paddingTop: 7 }}>
        {form.get('title')}
      </Typography>
    );
  },
);

export const WikiPageEdit = observer((props: { page: WikiPageModel }) => {
  const { page } = props;
  const handleEditorDidMount = (
    _,
    editor: monaco.editor.IStandaloneCodeEditor,
  ) => {
    // store.editor = editor
    // store.editorDidMount(editor)
    // removes default paste handler from monaco-editor
    // const removePasteHandler = [...editor['_modelData'].view._textAreaHandler._textAreaInput._store._toDispose][21].dispose()
  };
  const form = page.pageForm;

  return (
    <>
      <WikiPageHeader page={page} />
      <div id={style.editorWrapper}>
        <Editor
          language={'markdown'}
          value={form.get('body')}
          loading={<div />}
          onChange={(val, ev) => {
            if (!val) return;
            form.onChange('body')(val);
          }}
          options={{
            wordWrap: 'on',
            lineNumbers: 'off',
            wrappingIndent: 'indent',
          }}
        />
      </div>
    </>
  );
});

export const WikiPageRender = (props: { page: WikiPageModel }) => {
  const { page } = props;
  const form = page.pageForm;

  return (
    <>
      <WikiPageHeader page={page} />
      <Markdown source={form.get('body')} />
    </>
  );
};

export const WikiPage = observer((props) => {
  const {workspacesstore} = useStores()
  const page = workspacesstore.selectedWikiPage;

  if (page == undefined) {
    return <div id={style.wrapper}>Wiki page not found</div>;
  }
  return (
    <div id={style.wrapper}>
      {workspacesstore.wikiEdit ? (
        <WikiPageEdit page={page} />
      ) : (
        <WikiPageRender page={page} />
      )}
    </div>
  );
});

export const WikiPageHeader = (props: { page: WikiPageModel }) => {
  const { page } = props;
  return (
    <Grid container>
      <Grid item xs={9} sm={11}>
        <WikiPageHeaderTitle page={page} />
      </Grid>
      <Grid item xs={3} sm={1}>
        <IconButton onClick={page.onSave}>
          <SaveIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
