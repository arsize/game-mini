let instance
import Pool from "./base/pool"

/**
 * 全局状态管理器
 */
export default class DataBus {
  animations: any
  enemys: any
  pool: any
  bullets: any
  score!: number
  frame!: number
  gameOver!: boolean
  constructor() {
    if (instance) return instance
    this.pool = new Pool()
    this.reset()
  }

  reset() {
    this.frame = 0
    this.score = 0
    this.bullets = []
    this.enemys = []
    this.animations = []
    this.gameOver = false
  }
  /**
   * 进入对象池
   * 此后不进入帧循环
   */
  removeEnemey(enemy) {
    const temp = this.enemys.shift()
    temp.visible = false

    this.pool.recover("enemy", enemy)
  }

  /**
   * 进入对象池
   * 此后不进入帧循环
   */
  removeBullets(bullet) {
    const temp = this.bullets.shift()
    temp.visible = false

    this.pool.recover("bullet", bullet)
  }
}
