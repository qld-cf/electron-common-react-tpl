// const  = window.require('electron-store')
import Store from 'electron-store'
const store = new Store()
class AppStore {
  //   constructor() {}
  public get(name: string): string {
    return store.get(name)
  }
  public save(key: string, val: any) {
    store.set(key, val)
  }
}
export default new AppStore()
