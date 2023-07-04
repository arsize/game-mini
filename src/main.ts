import DataBus from "./databus"
import "./js/weapp-adapter.js"

const ctx = canvas.getContext("2d")
const databus = new DataBus()

export default class Main {
  aniId: number
  constructor() {
    this.aniId = 0
    this.restart()
  }

  restart() {
    databus.reset()
    console.log("start")
    // console.log(ctx)
  }
}
