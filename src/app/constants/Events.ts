import * as EventEmitter from 'events'


 

export const eventTypes = {
    WORKSPACE_CRUD: 'WORKSPACE_CRUD',
    WORKSPACE_ERR: 'WORKSPACE_ERR',
    DEPLOYMENT_CRUD: 'DEPLOYMENT_CRUD',
    DEPLOYMENT_ERR: 'DEPLOYMENT_CRUD',
    WIKI_CRUD: 'WIKI_CRUD',
    WIKI_ERR: 'WIKI_CRUD',
    
}

export const events = new EventEmitter()
