import DataBus from "./databus"

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
  }
}
