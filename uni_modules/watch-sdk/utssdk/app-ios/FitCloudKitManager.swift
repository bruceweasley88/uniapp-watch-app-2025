import DCloudUTSFoundation
import FitCloudKit
import Foundation
import ObjectiveC

public class FitCloudKitManager: NSObject {
  public static let shared = FitCloudKitManager()

  private var callback: ((String, UTSJSONObject) -> Void)?

  private var discoveredDevices: [FitCloudPeripheral] = []

  /** 初始化 */
  public func initialize() {

    let option = FitCloudOption()
    option.debugMode = false
    option.shouldAutoReconnectWhenAppLaunch = true
    FitCloudKit.initWith(option, callback: self)

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(FitCloudKitManager.shared.onPeripheralDiscovered(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_PERIPHERAL_DISCOVERED_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(FitCloudKitManager.shared.onPeripheralDiscovered(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_PERIPHERAL_DISCOVERED_UPDATED_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(FitCloudKitManager.shared.onPeripheralConnectedNotification(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_PERIPHERAL_CONNECTED_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(FitCloudKitManager.shared.onPeripherialConnectFailureNotification(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_PERIPHERAL_CONNECT_FAILURE_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(onFitCloudLoginUserObjectBegin(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_LOGINUSEROBJECT_BEGIN_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(onFitCloudLoginUserObjectResult(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_LOGINUSEROBJECT_RESULT_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(onFitCloudGetAllConfigBegin(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_GETALLCONFIG_BEGIN_NOTIFY),
      object: nil
    )

    NotificationCenter.default.addObserver(
      FitCloudKitManager.shared,
      selector: #selector(onFitCloudGetAllConfigResult(_:)),
      name: NSNotification.Name(FITCLOUDEVENT_GETALLCONFIG_RESULT_NOTIFY),
      object: nil
    )

    console.log("-----初始化完成-----")
  }

  /** 监听事件 */
  public static func onEvent(
    callback: @escaping (String, UTSJSONObject) -> Void
  ) {
    FitCloudKitManager.shared.callback = callback
  }

  /** 开始扫描 */
  public static func startScanning() {
    console.log("开始扫描..")
    shared.discoveredDevices.removeAll()
    FitCloudKit.scanPeripherals()
    console.log("等待扫描结果...")
  }

  /** 停止扫描 */
  public static func stopScan() {
    console.log("停止搜索")
    FitCloudKit.stopScan()
  }

  /** 连接设备 */
  public static func connect(deviceId: String) {
    if let device = shared.discoveredDevices.first(where: {
      $0.peripheral.identifier.uuidString == deviceId
    }) {
      FitCloudKit.connect(device.peripheral)
    } else {
      shared.callback?(
        "onPeripherialConnectFailureNotification",
        UTSJSONObject([
          "msg": "连接失败（-1）"
        ]))
    }
  }

  /** 连接设备 */
  public static func bind(userId: String) {
    console.log("开始绑定" + userId)
    FitCloudKit.bindUserObject(userId, randomCode: nil, abortIfExist: false) { succeed, _ in
      shared.callback?(
        "onBindUserObject",
        UTSJSONObject([
          "succeed": succeed,
          "macAddr": FitCloudKit.macAddr()
        ]))
    }
  }

  /** 解绑 */
  public static func unbind() {
    FitCloudKit.unbindUserObject(true) { succeed, _ in
      shared.callback?(
        "onUnbindUserObject",
        UTSJSONObject([
          "succeed": succeed
        ]))
    }
  }

	/** 获取全部配置 */
	public static func getAllConfig() -> UTSJSONObject {
    let allConfig = FitCloudKit.allConfig()
    
    // 修复类型错误：先取 OptionSet 的 rawValue（UInt32），再兜底 0
    let hardwareSupported: UInt32 = allConfig?.firmware?.hardwareSupported.rawValue ?? 0
    
    // 直接用官方定义的数值（避开枚举成员名适配坑），保留 OC 按位运算风格
    let isHeartRateSupported = (hardwareSupported & 1) != 0          // FITCLOUDHARDWARE_HEARTRATE = 1
    let isBloodOxygenSupported = (hardwareSupported & (1 << 1)) != 0 // FITCLOUDHARDWARE_BLOODOXYGEN = 1<<1 = 2
    let isBloodPressureSupported = (hardwareSupported & (1 << 2)) != 0 // FITCLOUDHARDWARE_BLOODPRESSURE = 1<<2 = 4
    let isRespiratoryRateSupported = (hardwareSupported & (1 << 3)) != 0 // FITCLOUDHARDWARE_RESPIRATORYRATE = 1<<3 = 8
    let isECGSupported = (hardwareSupported & (1 << 5)) != 0         // FITCLOUDHARDWARE_ECG = 1<<5 = 32
    
    let dataDict: [String: Any] = [
      "allConfig": allConfig ?? NSNull(),
      "hardwareSupportedRaw": hardwareSupported,
      "isHeartRateSupported": isHeartRateSupported,
      "isBloodPressureSupported": isBloodPressureSupported,
      "isBloodOxygenSupported": isBloodOxygenSupported,
      "isRespiratoryRateSupported": isRespiratoryRateSupported,
      "isECGSupported": isECGSupported,
      "macAddr": FitCloudKit.macAddr()
    ]
    
    return UTSJSONObject(dataDict)
	}

  /** 同步数据 */
  public static func syncData() {
    FitCloudKit.manualSyncData(
      with: .ALL,
      progress: { _, _ in },
      block: { succeed, _, records, _ in
        // 失败场景处理
        guard succeed else {
          shared.callback?(
            "onSyncData",
            UTSJSONObject([
              "success": false,
              "msg": "同步失败",
              "list": [],
            ]))
          return
        }

        // 核心：按具体类型强转，原样返回所有数据（无任何转换）
        var dataList = [[String: Any]]()
        guard let syncRecords = records else {
          shared.callback?(
            "onSyncData",
            UTSJSONObject([
              "success": true,
              "msg": "无同步数据",
              "list": [],
            ]))
          return
        }

        for record in syncRecords {
          var recordData = [String: Any]()

          // 1. 计步记录：FitCloudStepRecordObject（原样返回）
          if let stepRecord = record as? FitCloudStepRecordObject {
            recordData["recordType"] = "FitCloudStepRecordObject"
            recordData["begin"] = stepRecord.begin  // 原样返回Date（OC的NSDate桥接）
            recordData["interval"] = stepRecord.interval  // 原样返回TimeInterval

            // 原样返回items数组（无类型转换）
            let items = stepRecord.items as? [FitCloudStepItemObject] ?? []
            recordData["itemsCount"] = items.count

            var itemsData = [[String: Any]]()
            for item in items {
              itemsData.append([
                "moment": item.moment,  // 原样返回Date
                "manualAtWatch": item.manualAtWatch,
                "baseOnPneumaticpump": item.baseOnPneumaticpump,
                "steps": item.steps,  // 原样返回UInt16
                "distance": item.distance,  // 原样返回NSNumber?
                "calorie": item.calorie,  // 原样返回NSNumber?
                "duration": item.duration,  // 原样返回NSNumber?
              ])
            }
            recordData["items"] = itemsData
            // 总步数也原样累加（UInt16）
            recordData["totalSteps"] = items.reduce(0) { $0 + $1.steps }

            // 2. 心率记录：FitCloudHRRecordObject（原样返回）
          } else if let hrRecord = record as? FitCloudHRRecordObject {
            recordData["recordType"] = "FitCloudHRRecordObject"
            recordData["begin"] = hrRecord.begin  // 原样返回Date
            recordData["interval"] = hrRecord.interval  // 原样返回TimeInterval

            let items = hrRecord.items as? [FitCloudHRItemObject] ?? []
            recordData["itemsCount"] = items.count

            var itemsData = [[String: Any]]()
            for item in items {
              itemsData.append([
                "moment": item.moment,  // 原样返回Date
                "manualAtWatch": item.manualAtWatch,
                "baseOnPneumaticpump": item.baseOnPneumaticpump,
                "value": item.value,  // 原样返回UInt8
              ])
            }
            recordData["items"] = itemsData

            // 3. 血氧记录：FitCloudBORecordObject（原样返回）
          } else if let boRecord = record as? FitCloudBORecordObject {
            recordData["recordType"] = "FitCloudBORecordObject"
            recordData["begin"] = boRecord.begin  // 原样返回Date
            recordData["interval"] = boRecord.interval  // 原样返回TimeInterval

            let items = boRecord.items as? [FitCloudBOItemObject] ?? []
            recordData["itemsCount"] = items.count

            var itemsData = [[String: Any]]()
            for item in items {
              itemsData.append([
                "moment": item.moment,  // 原样返回Date
                "manualAtWatch": item.manualAtWatch,
                "baseOnPneumaticpump": item.baseOnPneumaticpump,
                "value": item.value,  // 原样返回UInt8
              ])
            }
            recordData["items"] = itemsData

            // 4. 血压记录：FitCloudBPRecordObject（原样返回）
          } else if let bpRecord = record as? FitCloudBPRecordObject {
            recordData["recordType"] = "FitCloudBPRecordObject"
            recordData["begin"] = bpRecord.begin  // 原样返回Date
            recordData["interval"] = bpRecord.interval  // 原样返回TimeInterval

            let items = bpRecord.items as? [FitCloudBPItemObject] ?? []
            recordData["itemsCount"] = items.count

            var itemsData = [[String: Any]]()
            for item in items {
              itemsData.append([
                "moment": item.moment,  // 原样返回Date
                "manualAtWatch": item.manualAtWatch,
                "baseOnPneumaticpump": item.baseOnPneumaticpump,
                "diastolic": item.diastolic,  // 原样返回UInt8
                "systolic": item.systolic,  // 原样返回UInt8
                "heartRateIfBaseOnPneumaticpump": item.heartRateIfBaseOnPneumaticpump,  // 原样返回UInt8
              ])
            }
            recordData["items"] = itemsData

            // 5. 睡眠记录：FitCloudSleepRecordObject（仅返回原始枚举值）
          } else if let sleepRecord = record as? FitCloudSleepRecordObject {
            recordData["recordType"] = "FitCloudSleepRecordObject"
            recordData["begin"] = sleepRecord.begin  // 原样返回Date
            recordData["interval"] = sleepRecord.interval  // 原样返回TimeInterval

            let items = sleepRecord.items as? [FitCloudSleepItemObject] ?? []
            recordData["itemsCount"] = items.count

            var itemsData = [[String: Any]]()
            for item in items {
              itemsData.append([
                "moment": item.moment,  // 原样返回Date
                "manualAtWatch": item.manualAtWatch,
                "baseOnPneumaticpump": item.baseOnPneumaticpump,
                "quality": item.quality.rawValue,  // 仅返回原始枚举值，不转换
              ])
            }
            recordData["items"] = itemsData

            // 6. 心电记录：FitCloudECGRecordObject（原样返回）
          } else if let ecgRecord = record as? FitCloudECGRecordObject {
            recordData["recordType"] = "FitCloudECGRecordObject"
            recordData["begin"] = ecgRecord.begin  // 原样返回Date
            recordData["interval"] = ecgRecord.interval  // 原样返回TimeInterval

            let items = ecgRecord.items as? [FitCloudECGItemObject] ?? []
            recordData["itemsCount"] = items.count

            var itemsData = [[String: Any]]()
            for item in items {
              itemsData.append([
                "moment": item.moment,  // 原样返回Date
                "manualAtWatch": item.manualAtWatch,
                "baseOnPneumaticpump": item.baseOnPneumaticpump,
                "value": item.value,  // 原样返回UInt16
              ])
            }
            recordData["items"] = itemsData

            // 其他类型兜底（原样返回基础信息）
          } else {
            recordData["recordType"] = NSStringFromClass(type(of: record))
            recordData["items"] = []
            recordData["itemsCount"] = 0
          }

          dataList.append(recordData)
        }

        // 回调返回原样数据
        shared.callback?(
          "onSyncData",
          UTSJSONObject([
            "success": true,
            "msg": "同步成功，共 \(dataList.count) 条健康记录",
            "list": dataList,
          ]))
      }, finished: {})
  }

  /// 启动单个实时健康测量项（参数为字符串）
  public static func startMeasure(measureType: String, interval: UInt8, minutes: UInt8) {
    // 1. 字符串映射到OptionSet类型的测量项（修复.NONE报错）
    let item: FITCLOUDREALTIMEMHEALTHEASUREITEM = {
      switch measureType.lowercased() {
      case "heartrate", "heartRate": return .HEARTRATE
      case "bloodpressure", "bloodPressure": return .BLOODPRESSURE
      case "ecg": return .ECG
      case "bloodoxygen", "bloodOxygen": return .BLOODOXYGEN
      case "respiratoryrate", "respiratoryRate": return .RESPIRATORYRATE
      default: return []  // 空OptionSet代替.NONE
      }
    }()

    // 2. 空测量项直接返回（用isEmpty判断，代替.NONE）
    guard !item.isEmpty else { return }

    // 3. 创建参数+调用SDK（核心逻辑不变）
    let param = FitCloudRealTimeHealthMeasuringParam()
    param.item = item
    param.interval = interval
    param.maxMeasuringMinutes = minutes
    FitCloudKit.requestRealTimeHealthMeasuring(param) { succeed, error in
      shared.callback?(
        "onStartMeasure",
        UTSJSONObject([
          "success": succeed,
          "msg": error?.localizedDescription ?? "",
        ]))
    }
  }

  /** 停止测量 */
  public static func stopMeasure() {
    let param = FitCloudRealTimeHealthMeasuringParam()
    param.item = []
    param.interval = 50
    param.maxMeasuringMinutes = 1
    FitCloudKit.requestRealTimeHealthMeasuring(param) { succeed, error in
      shared.callback?(
        "onStopMeasure",
        UTSJSONObject([
          "success": succeed,
          "msg": error?.localizedDescription ?? "",
        ]))
    }
  }

  @objc private func onPeripheralDiscovered(_ notification: Notification) {
    guard let device = notification.object as? FitCloudPeripheral else { return }

    let deviceId = device.peripheral.identifier.uuidString
    let deviceName = device.peripheral.name ?? "Unknown Device"
    let macAddress = device.macAddr

    // 添加到数组，避免重复
    if !discoveredDevices.contains(where: { $0.peripheral.identifier.uuidString == deviceId }) {
      discoveredDevices.append(device)
    }

    callback?(
      "onPeripheralDiscovered",
      UTSJSONObject([
        "deviceId": deviceId,
        "deviceName": deviceName,
        "macAddress": macAddress
      ]))
  }

  @objc private func onPeripheralConnectedNotification(_ notification: Notification) {
    callback?(
      "onPeripheralConnectedNotification",
      UTSJSONObject([
        "data": notification
      ]))
  }

  @objc private func onPeripherialConnectFailureNotification(_ notification: Notification) {
    callback?(
      "onPeripherialConnectFailureNotification",
      UTSJSONObject([
        "msg": "连接失败（-2）"
      ]))
  }

  @objc func onFitCloudLoginUserObjectBegin(_ notification: Notification) {
    callback?(
      "onFitCloudLoginUserObjectBegin",
      UTSJSONObject([
        "data": notification
      ]))
  }

  @objc func onFitCloudLoginUserObjectResult(_ notification: Notification) {
    callback?(
      "onFitCloudLoginUserObjectResult",
      UTSJSONObject([
        "data": notification
      ]))
  }

  @objc func onFitCloudGetAllConfigBegin(_ notification: Notification) {
    callback?(
      "onFitCloudGetAllConfigBegin",
      UTSJSONObject([
        "data": notification
      ]))
  }

  @objc func onFitCloudGetAllConfigResult(_ notification: Notification) {
    callback?(
      "onFitCloudGetAllConfigResult",
      UTSJSONObject([
        "data": notification
      ]))

  }
}

extension FitCloudKitManager: FitCloudCallback {
  public func onFindiPhoneEvent() {
    console.log("触发查找手机")
    callback?("onFindiPhoneEvent", UTSJSONObject([]))
  }

  /** 实时运动健康测量数据（心电数据例外） */
  public func onRealTimeHealthMeasuringData(
    _ records: [FitCloudRealTimeHealthMeasuringResultObject]!
  ) {
    //  // 1. 安全解包整个数组（避免 nil 崩溃）
    //  guard let validRecords = records else {
    //      callback?("onRealTimeHealthMeasuringData", UTSJSONObject(["list": []]))
    //      return
    //  }

    //  // 2. 工具：单个模型转字典（复用逻辑，避免重复代码）
    //  func modelToDict(_ model: FitCloudRealTimeHealthMeasuringResultObject) -> [String: Any] {
    // return Mirror(reflecting: model)
    // 		.children
    // 		.compactMap { label, value -> (String, Any)? in
    // 				// 过滤私有属性（下划线开头）+ 确保有属性名
    // 				guard let label = label, !label.starts(with: "_") else { return nil }
    // 				// 解包可选值（避免 Optional(nil) 或 nil）
    // 				let unwrappedValue = (value as Any?) ?? "--"
    // 				return (label, unwrappedValue)
    // 		}
    // 		.reduce([:]) { $0.merging([$1.0: $1.1]) { $1 } } // 转成标准字典
    //  }

    //  let dictArray = validRecords.map { modelToDict($0) }

    callback?(
      "onRealTimeHealthMeasuringData",
      UTSJSONObject([
        "list": records  // 外层键为 "list"，值为批量数据数组
      ]))
  }

  /** 心电实时测量结果 */
  public func onRealTimeECGData(_ ecgDataArray: [NSNumber]!, interval: Int) {
    callback?(
      "onRealTimeECGData",
      UTSJSONObject([
        "ecgDataArray": ecgDataArray,
        "interval": interval,
      ]))
  }
  /** 心电图结束 */
  public func onRealTimeECGStop() {
    callback?("onRealTimeECGStop", UTSJSONObject([]))
  }
  /** 触发拍照 */
  public func onTakePhotoCtrl() {
    callback?("onTakePhotoCtrl", UTSJSONObject([]))
  }
  /** 收到手表的活跃通知(当前手表与手机连接还活跃着) */
  public func onBraceletAlive() {
    callback?("onBraceletAlive", UTSJSONObject([]))
  }
  /** 日志信息回调 */
  public func onLogMessage(_ message: String!, level: FITCLOUDKITLOGLEVEL) {
    callback?(
      "onLogMessage",
      UTSJSONObject([
        "msg": message
      ]))
  }
}
