import * as React from 'react'
import * as style from './style.scss'
import { Switch, Route } from "react-router";
import { HomeWrapperBase } from 'app/containers/Home';
import { WikiList } from './List';
import { WORKSPACES_STORE } from 'app/constants';
import { observer, inject } from 'mobx-react';
import { WorkspacesStore } from 'app/stores';
import { Typography, Input, IconButton, Grid } from '@material-ui/core';
import { WikiPageModel } from 'app/models';
import Editor from "@monaco-editor/react";
import * as monaco from 'monaco-editor'
import * as Markdown from 'react-markdown';
import SaveIcon from '@material-ui/icons/Save';



export const WikiPageHeaderTitle = inject(WORKSPACES_STORE)(observer((props: {
    page: WikiPageModel
}) => {
    const {page} = props
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    if (store.wikiEdit) return <Input value={page.editableTitle} style={{ fontSize: "3rem", letterSpacing: "0rem" }} fullWidth onChange={(e) => {
        page.editableTitle = e.target.value
    }} />

    return <Typography variant="h3" style={{ paddingTop: 7 }}>
        {page.title}
    </Typography>

}))

export const WikiPageHeader = (props: {page: WikiPageModel}) => {
    const {page} = props
    return <Grid container>
        <Grid item xs={9} sm={11}>
            <WikiPageHeaderTitle page={page}/>
        </Grid>
        <Grid item xs={3} sm={1}>
            <IconButton onClick={page.onSave}>
                <SaveIcon/>
            </IconButton>
        </Grid>
    </Grid>
}

export const WikiPageEdit = observer((props: { page: WikiPageModel }) => {
    const { page } = props
    const handleEditorDidMount = (_, editor: monaco.editor.IStandaloneCodeEditor) => {
        // store.editor = editor
        // store.editorDidMount(editor)

        // console.log(editor.getDomNode())
        // removes default paste handler from monaco-editor
        // const removePasteHandler = [...editor['_modelData'].view._textAreaHandler._textAreaInput._store._toDispose][21].dispose()
    }
    return <>
        <WikiPageHeader page={page}/>
        <div id={style.editorWrapper}>
            <Editor
                language={"markdown"}
                value={page.editableText}
                // editorDidMount={handleEditorDidMount}
                loading={<div />}
                onChange={(val, ev) => {
                    if (!val) return
                    page.editableText = val
                }}
                options={{
                    wordWrap: "on",
                    lineNumbers: "off",
                    wrappingIndent: "indent",
                }}
            />
        </div>

    </>
})

export const WikiPageRender = (props: { page: WikiPageModel }) => {
    const { page } = props

    return <>
        <WikiPageHeader page={page}/>
        <Markdown source={page.editableText}/>
    </>
}

export const WikiPage = inject(WORKSPACES_STORE)(observer((props) => {
    // todo get current wiki page
    const store = props[WORKSPACES_STORE] as WorkspacesStore
    const page = store.selectedWiki

    // console.log("PAGE", page)
    if (page == undefined) {
        return <div>Wiki page not found</div>
    }
    return <div id={style.wrapper}>
        {store.wikiEdit ? <WikiPageEdit page={page} /> : <WikiPageRender page={page} />}
    </div>
}))

export const WikiPages = () => {
    return null
}
export const WikiSections = () => {
    return null
}

const path = `/w/:wid/wiki/`
export const WikiRoutes = () => {
    return <HomeWrapperBase>
        <WikiList />
        <Switch>
            <Route path={`${path}:sectionId/pages/:pageId/`} component={WikiPage} />
            {/* <Route path={`${path}/:sectionId/pages/new`} component={WikiCreatePage} /> */}
            <Route path={`${path}:sectionId/pages`} component={WikiPages} />
            {/* <Route path={`${path}/new`} component={WikiCreateSection} /> */}
            <Route path={`${path}`} component={WikiSections} />
        </Switch>
    </HomeWrapperBase>
}