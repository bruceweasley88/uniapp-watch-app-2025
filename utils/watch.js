// #ifdef APP-PLUS
import {
  fitInit,
  onEvent,
} from "../uni_modules/watch-sdk";
// #endif
export let currentConnect = false;

export let currentBindUser = null

export function init() {
  // #ifdef APP-PLUS
  fitInit();
  onEvent((type, data) => {
    if (type === 'onLogMessage') {
      return;
    }

    if (type === 'onPeripheralConnectedNotification') {
      currentConnect = true
    }

    if (type === 'onPeripherialConnectFailureNotification') {
      currentConnect = false
    }

    if (type === 'onFitCloudLoginUserObjectResult') {
      currentBindUser = data;
    }
    console.log(type, data)
    uni.$emit(type, data)

    // if (type === 'onPeripheralDiscovered') {
    //   this.devices = {
    //     ...this.devices,
    //     [data.deviceId]: data.deviceName
    //   }
    // }
    // if (type === 'onPeripheralConnectedNotification') {
    //   uni.showModal({
    //     content: '连接成功'
    //   })
    // }
    // if (type === 'onPeripherialConnectFailureNotification') {
    //   uni.showModal({
    //     content: data.msg || '连接失败（-3）'
    //   })
    // }
    // if (type === 'onLogMessage') {
    //   return;
    // }
    // this.logList.unshift({ type, data })
  })
  // #endif
}


// #ifdef APP-PLUS
export {
  startScan,
  stopScan,
  connect,
  bind,
  unbind,
  syncData,
  startMeasure,
  stopMeasure,
  getAllConfig
} from "../uni_modules/watch-sdk";
// #endif