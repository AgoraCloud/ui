import { observable } from "mobx"

export interface alert_i{
    message: string
    variant: 'success'|'error'|'info'|'default'|''
}

interface storeAlert_i extends alert_i{
    key: number
    autoHideDuration: number
}

export class SnackbarStore{

    @observable
    alerts: storeAlert_i[] = []
    constructor(){}


    push(alert: alert_i){
        this.alerts.push({
            key: new Date().getTime() + Math.random(),
            autoHideDuration: 6000,
            ...alert
        })
    }


    get(): storeAlert_i[]{
        return this.alerts
    }


    remove(alert){
        return () => {
            this.alerts = this.alerts.filter((a)=>{a.key != alert.key})
        }
    }
}