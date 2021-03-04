import { observable } from "mobx"
import { Workspace } from ".."

export class WikiSections{
    /**
     * Collection of Wiki Sections
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'

    @observable _wikiSections: WikiSection[] = []
    constructor(public workspace: Workspace){
        this.state = 'unloaded'
        this.load()
    }

    load = async ( ) => {
        this.state = 'loading'
        const response = await fetch(`/api/workspaces/${this.workspace.id}/sections`, {

        })

        const data = await response.json()
        console.log("wikis", response, data)
        this._wikiSections = data.map((data)=>new WikiSection(this, data))
        this.state = 'loaded'
    }

    get sections(){
        return this._wikiSections || []
    }


    getById = (id?: string): WikiSection|undefined => {
        return this.sections.filter((w: WikiSection)=>w.id === id)[0]
    }
}

interface wikiSectionData_i{
    name: string
    id: string
}
export class WikiSection{
    /**
     * A single wiki section
     */
    public _wikiPages: WikiPages
    constructor(public wikiSections: WikiSections, public data: wikiSectionData_i){
        this._wikiPages = new WikiPages(this)
    }

    get wikiPages(){
        return this._wikiPages
    }

    get name(){
        return this.data.name
    }

    get id(){
        return this.data.id
    }

    get link(){
        return `${this.wikiSections.workspace.link}wiki/${this.id}/`
    }
}


export class WikiPages{
    /**
     * A collection of wiki pages
     */

    @observable state: 'loaded'|'error'|'loading'|'unloaded'

    @observable _wikiPages: WikiPage[] = []
    constructor(public wikiSection: WikiSection){
        this.state = 'unloaded'
        this.load()
    }

    get pages(){
        return this._wikiPages
    }

    load = async ( ) => {
        this.state = 'loading'
        const wid = this.wikiSection.wikiSections.workspace.id
        const response = await fetch(`/api/workspaces/${wid}/sections/${this.wikiSection.id}/pages`, {

        })

        const data = await response.json()
        console.log("wikis", response, data)
        this._wikiPages = data.map((data)=>new WikiPage(this, data))
        this.state = 'loaded'
    }

    getById = (id?: string): WikiPage|undefined => {
        return this.pages.filter((w: WikiPage)=>w.id === id)[0]
    }
}

interface wikiPageData_i{
    id: string
    title: string
    body: string
}

export class WikiPage{
    /**
     * A single wiki page
     */

    constructor(public wikiPages: WikiPages, public data: wikiPageData_i){

    }

    get body(){
        return this.data.body
    }

    get title(){
        return this.data.title
    }

    get id(){
        return this.data.id
    }
    get link(){
        return `${this.wikiPages.wikiSection.link}pages/${this.id}/`
    }
}