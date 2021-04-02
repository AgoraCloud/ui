import * as React from 'react'
import { WORKSPACES_STORE, ROUTER_STORE, UI_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'
import { WorkspacesStore, RouterStore, UIStore } from 'app/stores'
import { HomeWrapper } from 'app/containers/Home';
import { Board } from 'app/components/Kanban/board'

interface ILane {
  id: string;
  title: string;
  itemsIds: string[];
}


export const Lanes = inject(WORKSPACES_STORE)(observer((props) => {

  const store = props[WORKSPACES_STORE] as WorkspacesStore
  const project = store.selectedProject
  const lanes = project?.lanes.lanes

  if(!project || !lanes) return null

  var data: { [laneName: string]: ILane; } = {}
  var lanesOrder: string[] = []

  lanes.forEach(lane => {
    data[lane.name] = {id: lane.id, title: lane.name, itemsIds: []}
    lanesOrder.push(lane.name)
  })

  var boardData = {
    items: {
      'item-1': { id: 'item-1', content: 'Content of item 1.'},
      'item-2': { id: 'item-2', content: 'Content of item 2.'},
      'item-3': { id: 'item-3', content: 'Content of item 3.'},
      'item-4': { id: 'item-4', content: 'Content of item 4.'},
      'item-5': { id: 'item-5', content: 'Content of item 5.'},
      'item-6': { id: 'item-6', content: 'Content of item 6.'},
      'item-7': { id: 'item-7', content: 'Content of item 7.'}
    },
    columns: data,
    columnsOrder: lanesOrder

  }

  //work in the projects model and send data from there

  // console.log("yooooooooooooooooooooooooooooooooo")
  // console.log(data)
  // console.log("THIS IS BOARD DATA 2")
  // console.log(boardData)

  return <HomeWrapper>
    <Board data={boardData} />
  </HomeWrapper>
}))

