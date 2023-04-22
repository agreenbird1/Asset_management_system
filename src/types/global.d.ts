import { MessageApiInjection } from 'naive-ui'

declare global {
  //设置全局属性
  interface Window {
    //window对象属性
    $message: MessageApiInjection
  }
}
