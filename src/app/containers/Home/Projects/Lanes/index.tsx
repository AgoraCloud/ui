import * as React from 'react'
import { WORKSPACES_STORE, ROUTER_STORE, UI_STORE } from 'app/constants'
import { observer, inject } from 'mobx-react'
import { WorkspacesStore, RouterStore, UIStore } from 'app/stores'
import { HomeWrapper } from 'app/containers/Home';
import Board, { moveCard } from "@lourenci/react-kanban";
import "@lourenci/react-kanban/dist/styles.css";

const board = {
    columns: [
      {
        id: 1,
        title: "Backlog",
        cards: [
          {
            id: 1,
            title: "Card title 1",
            description: "Card content"
          },
          {
            id: 2,
            title: "Card title 2",
            description: "Card content"
          },
          {
            id: 3,
            title: "Card title 3",
            description: "Card content"
          }
        ]
      },
      {
        id: 2,
        title: "Doing",
        cards: [
          {
            id: 9,
            title: "Card title 9",
            description: "Card content"
          }
        ]
      },
      {
        id: 3,
        title: "Q&A",
        cards: [
          {
            id: 10,
            title: "Card title 10",
            description: "Card content"
          },
          {
            id: 11,
            title: "Card title 11",
            description: "Card content"
          }
        ]
      },
      {
        id: 4,
        title: "Production",
        cards: [
          {
            id: 12,
            title: "Card title 12",
            description: "Card content"
          },
          {
            id: 13,
            title: "Card title 13",
            description: "Card content"
          }
        ]
      }
    ]
  };

  function UncontrolledBoard() {
    return (
      <Board
        allowRemoveLane
        allowRenameColumn
        allowRemoveCard
        onLaneRemove={console.log}
        onCardRemove={console.log}
        onLaneRename={console.log}
        initialBoard={board}
        allowAddCard={{ on: "top" }}
        onNewCardConfirm={draftCard => ({
          id: new Date().getTime(),
          ...draftCard
        })}
        onCardNew={console.log}
      />
    );
  }

export const Lanes = inject(WORKSPACES_STORE, ROUTER_STORE, UI_STORE)(observer((props) => {

  const store = props[WORKSPACES_STORE] as WorkspacesStore
  const routerStore = props[ROUTER_STORE] as RouterStore
  const uistore = props[UI_STORE] as UIStore
  const workspace = store.selectedWorkspace
  const projects = workspace.projects.projects

  return <HomeWrapper>
    <UncontrolledBoard />
  </HomeWrapper>
}))

