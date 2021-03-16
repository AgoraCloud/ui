import { observable } from "mobx";
import { ConfirmDelete } from "app/forms/ConfirmDelete";
import { RootStore } from "./RootStore";

export class UIStore{
    @observable confirmDelete?: ConfirmDelete
    @observable open: boolean
    constructor(public rootStore: RootStore){
        this.open = false
    }



    setDeleteTarget = (name, callBack) => {
        this.confirmDelete = new ConfirmDelete(name, callBack)
        this.open = true
    }


}