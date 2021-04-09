import { observable, action } from "mobx";
import * as _ from 'lodash'

export class BaseModel<T extends {id: string}>{
    @observable state: 'loaded' | 'error' | 'loading' | 'unloaded' | 'reloading'
    @observable response: Response
    @observable options: RequestInit
    @observable responseData: T = {} as T
    dependents: BaseModel<any>[] = [] // 
    constructor() {
        this.state = 'unloaded'
        this.options = {}
    }

    get id(){
        return this.responseData.id
    }

    get status() {
        return this.response?.status
    }

    public async load(url: string, json=true): Promise<boolean> {
        this.state = 'loading'
        this.response = await fetch(url, this.options)
        if(json) this.responseData = await this.response.json() 
        else this.responseData = await this.response.text() as any

        if (this.response.status >= 200 && this.response.status < 300) {
            for(const dependent of this.dependents){
                console.log("dependent", dependent)
                await dependent.load()
            }
            this.state = 'loaded'
            return true
        } else {
            this.state = 'error'
            return false
        }
    }
}

export class BaseModelCollection<C extends BaseModelItem<any>> extends BaseModel<any>{
    /**
     * This is a colletion of items
     */

    @observable collection: C[] = []
    iteratorKey?: string = undefined // 'users' ex. nested 'info.users'
    constructor(public ItemModel: new (parent, data) => BaseModelItem<any>) {
        super()
    }

    public async load(url: string) {
        // await super.load(url) // Can't do this because it sets the loaded flag before it's actually loaded
        this.state = this.state === 'loaded' ? 'reloading' : 'loading'
        // this.state = 'loading'

        this.response = await fetch(url, this.options)
        this.responseData = await this.response.json()
        // console.log(url, this.responseData)

        if (this.response.status >= 200 && this.response.status < 300) {
            if(this.iteratorKey) this.collection = _.get(this.responseData, this.iteratorKey).map((data) => new this.ItemModel(this, data))
            else this.collection = this.responseData.map((data) => new this.ItemModel(this, data))
            // console.log(url, this.collection)
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

export class BaseModelCollectionAsync<C extends BaseModelItemAsync<any>> extends BaseModelCollection<C>{
    constructor(ItemModel: new (parent, data) => BaseModelItem<any>) {
        super(ItemModel)
    }
    public async load(url: string) {
        // await super.load(url) // Can't do this because it sets the loaded flag before it's actually loaded
        this.state = this.state === 'loaded' ? 'reloading' : 'loading'
        // this.state = 'loading'

        this.response = await fetch(url, this.options)
        this.responseData = await this.response.json()
        // console.log(url, this.responseData)

        if (this.response.status >= 200 && this.response.status < 300) {
            if(this.iteratorKey) this.collection = _.get(this.responseData, this.iteratorKey).map((data) => new this.ItemModel(this, data))
            else this.collection = this.responseData.map((data) => new this.ItemModel(this, data))
            // console.log(url, this.collection)
            for(const item of this.collection){
                await item.load()
            }
            this.state = 'loaded'
        } else {
            this.state = 'error'
        }
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

export class BaseModelItemAsync<T extends {id: string}> extends BaseModelItem<T>{
    load = async () => {
        throw {name: 'NotImplementedError', message: 'load func not implemented'}
    }
}


/**
 * Playing around with an idea to replace all the fetch functions in the models
 * ex. Deployment.delete, UserModel.verify...
 */
export class ApiCallsBase{
    meta: any 
    constructor(url: string){
        this.meta = {
            calls: {
                'DELETE' : {options: {method: 'DELETE'}}
            }
        }
    }
}