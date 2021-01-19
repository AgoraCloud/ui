import { RootStore } from 'app/stores/RootStore';
import { observable } from 'mobx';

export class AuthStore {


   @observable state: 'loading'|'loggedin'|'unauthed'
   constructor (private rootStore: RootStore){
      this.state = 'unauthed'
   }
}

export default AuthStore;