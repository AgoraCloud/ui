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

interface ITask {
  id: string;
  content: string;
}


export const Lanes = inject(WORKSPACES_STORE)(observer((props) => {

  const store = props[WORKSPACES_STORE] as WorkspacesStore
  const project = store.selectedProject
  const lanes = project?.lanes
  var tasks: {[taskId: string]: ITask;} = {}

  if(!project || !lanes) return null

  const givenboardData = {
  items: {
    'item-1': { id: 'item-1', content: 'Content of item 1.'},
    'item-2': { id: 'item-2', content: 'Content of item 2.'},
    'item-3': { id: 'item-3', content: 'Content of item 3.'},
    'item-4': { id: 'item-4', content: 'Content of item 4.'},
    'item-5': { id: 'item-5', content: 'Content of item 5.'},
    'item-6': { id: 'item-6', content: 'Content of item 6.'},
    'item-7': { id: 'item-7', content: 'Content of item 7.'}
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Column 1',
      itemsIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7']
    },
    'column-2': {
      id: 'column-2',
      title: 'Column 2',
      itemsIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Column 3',
      itemsIds: []
    },
    'column-4': {
      id: 'column-4',
      title: 'Column 4',
      itemsIds: []
    }
  },
  columnsOrder: ['column-1', 'column-2', 'column-3', 'column-4']
}

  
  lanes.collection.forEach(lane => {
    lane.tasks.tasks.forEach(task => {
      tasks[task.id] = {id: task.id, content: task.title}
    })
  })

  console.log("LOOK AT THIS")
  console.log(tasks)
  var data: { [laneName: string]: ILane; } = {}
  var lanesOrder: string[] = []

  lanes.collection.forEach(lane => {
    data[lane.name] = {id: lane.id, title: lane.name, itemsIds: lane.tasks.taskIds}
    lanesOrder.push(lane.name)
  })

  console.log("Check this data out")
  console.log(data)

  

  var boardData = {
    items: tasks,
    columns: data,
    columnsOrder: lanesOrder

  }

  console.log(givenboardData.items, 'COMPARISON', boardData.items)

  //work in the projects model and send data from there

  // console.log("yooooooooooooooooooooooooooooooooo")
  // console.log(data)
  // console.log("THIS IS BOARD DATA 2")
  // console.log(boardData)

  return <HomeWrapper>
    <Board data={boardData} />
  </HomeWrapper>
}))

