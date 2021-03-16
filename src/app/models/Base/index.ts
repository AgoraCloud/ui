import { observable, action } from "mobx";


export class BaseModel<T>{
    @observable state: 'loaded' | 'error' | 'loading' | 'unloaded'
    @observable response: Response
    @observable options: RequestInit
    @observable responseData: T = {} as T
    constructor() {
        this.state = 'unloaded'
        this.options = {}
    }


    get status() {
        return this.response?.status
    }

    public async load(url: string, json=true) {
        this.state = 'loading'
        this.response = await fetch(url, this.options)
        if(json) this.responseData = await this.response.json() 
        else this.responseData = await this.response.text() as any

        if (this.response.status >= 200 && this.response.status < 300) {
            this.state = 'loaded'
        } else {
            this.state = 'error'
        }
    }
}

export class BaseModelCollection<C extends BaseModelItem<any>> extends BaseModel<any>{
    /**
     * This is a colletion of items
     */

    @observable collection: C[] = []
    constructor(private ItemModel: new (parent, data) => BaseModelItem<any>) {
        super()
    }

    public async load(url: string) {
        // await super.load(url) // Can't do this because it sets the loaded flag before it's actually loaded
        this.state = 'loading'
        this.response = await fetch(url, this.options)
        this.responseData = await this.response.json()

        if (this.response.status >= 200 && this.response.status < 300) {
            this.collection = this.responseData.map((data) => new this.ItemModel(this, data))
            console.log(url, this.collection)
            this.state = 'loaded'
        } else {
            this.state = 'error'
        }
    }


    @action
    getById = (id?: string): C | undefined => {
        return this.collection.filter((d: C) => d.id === id)[0]
    }
}


export class BaseModelItem<T extends { id: string }> {
    /**
     * 
     */

    constructor(public parent: BaseModelCollection<any>, public data: T) {

    }


    get id() {
        return this.data.id
    }
}