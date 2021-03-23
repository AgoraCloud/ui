import { observable } from "mobx";
import { ConfirmDelete } from "app/forms/ConfirmDelete";
import { RootStore } from "./RootStore";

export class AdminStore{

    constructor(public rootStore: RootStore){
        console.log("# ADMIN STORE INIT")
    }

}