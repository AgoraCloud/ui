import { observable } from "mobx"
import * as _ from "lodash"
import {classToClass} from 'class-transformer'
import {validate, ValidationError} from 'class-validator'

export const getErrors = async (v: any): Promise<{[key: string]: string}> => {
    /**
     * v is a Validator Class (idk how to type it w/ out the inheritance)
     * This helper function transforms the class using class-transformer
     *     in order to utilize the @Type decorator and then calls class-validator
     * 
     * it recurses in order to find all the errors within the nested validator classes
     * 
     * 
     * ex. output
     * {
     *      displayName: "error",
     *      contact.email: "error"
     * }
     */
    const c = classToClass(v)
    const errors = await validate(c)
    let out: any = {}
    const recurse = (root: string, errors: ValidationError[]) => {
        for(const error of errors){
            const property = [root, error.property].filter(val=>val!="").join('.')
            recurse(property, error.children)
            // todo extract the error message from the contraint
            // const contraints = Object.values(error.constraints || {})
            out[property] = "error"
        }
    }
    recurse("", errors)
    return out
}


export class BaseFormModel<FormInterface, DBInterface>{
    @observable errors: {}
    @observable data: FormInterface
    func: any

    @observable
    state: {
        loaded: boolean
        loading: boolean
    }

    @observable
    response: any
    constructor(private validator?: new () => any){
        this.errors = {} 
        this.data = {

        } as FormInterface

        this.state = {
            loaded: false,
            loading: false
        }

        // this.func = _.debounce(this.validate, 200, {leading: true})
    }

    onChange = (key: string) => {
        /**
         * key can be nested "contact.phone"
         */
        return (value) => {
            console.log(key, value)
            _.set(this.data, key, value)
            this.validate()
        }
    }


    get(key){
        return _.get(this.data, key)
    }

    getError(key){
        return _.get(this.errors, key)
    }

    copy(data){
        return _.cloneDeep(data)
    }
    onInputChange = (key: string) => {
        return (e) => {
            const value = e.target.value
            _.set(this.data, key, value)
            this.validate()
        }
    }

    toDB = (): DBInterface => {
        /**
         * To Be Impemented!
         * 
         * use to export to db interface
         */
        return (this.data as unknown) as DBInterface

    }
    fromDB = (data: DBInterface) => {
        /**
         * To Be Impemented!
         * 
         * use to import from db interface
         */
        _.merge(this.data, data)
    }

    validate = _.debounce(async (): Promise<boolean> => {
        // use toDB because the validator is based on the toDB Value
        if(this.validator == undefined){
            // if you can't validate form
            // i.e. public user info form
            return true
        }

        const data = _.cloneDeep(this.toDB())
        const v = new this.validator()
        Object.assign(v, data)
        const errors = await getErrors(v)
        this.errors = errors
        console.warn(errors)
        return Object.keys(errors).length == 0
    }, 200, {leading: true})
}