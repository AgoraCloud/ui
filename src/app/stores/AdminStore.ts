import { RootStore } from "./RootStore";
import { UsersModel } from "app/models";

export class AdminStore{


    users: UsersModel
    constructor(public rootStore: RootStore){
        console.log("# ADMIN STORE INIT")
        this.users = new UsersModel()
    }

}