import DCloudUTSFoundation
import RoomPlan
public typealias FitInit = () -> Void
public typealias onEventFunction = (_ callback: @escaping (_ type: String, _ data: Any) -> Void) -> Void
public typealias ScanFunction = () -> Void
public typealias StopScanFunction = () -> Void
public typealias ConnectFunction = (_ deviceId: String) -> Void
public typealias BindFunction = (_ userId: String) -> Void
public typealias StartMeasureFunction = (_ type: String, _ interval: UInt8, _ minutes: UInt8) -> Void
public var fitInit: FitInit = {
() -> Void in
FitCloudKitManager.shared.initialize()
}
public var onEvent: onEventFunction = {
(_ callbackParam: @escaping (_ type: String, _ data: UTSJSONObject) -> Void) -> Void in
FitCloudKitManager.onEvent(callback: {
(_ type: String, _ data: UTSJSONObject) -> Void in
if (type != "onLogMessage") {
    console.log("|||", type, data)
}
callbackParam(type, data)
})
}
public var startScan: ScanFunction = {
() -> Void in
FitCloudKitManager.startScanning()
}
public var stopScan: StopScanFunction = {
() -> Void in
FitCloudKitManager.stopScan()
}
public var connect: ConnectFunction = {
(_ deviceIdParam) -> Void in
FitCloudKitManager.connect(deviceId: deviceIdParam)
}
public var bind: BindFunction = {
(_ userIdParam) -> Void in
FitCloudKitManager.bind(userId: userIdParam)
}
public var unbind = {
() -> Void in
FitCloudKitManager.unbind()
}
public var syncData = {
() -> Void in
FitCloudKitManager.syncData()
}
public var startMeasure: StartMeasureFunction = {
(_ type, _ intervalParam, _ minutesParam) -> Void in
FitCloudKitManager.startMeasure(measureType: type, interval: intervalParam, minutes: minutesParam)
}
public var stopMeasure = {
() -> Void in
FitCloudKitManager.stopMeasure()
}
public var getAllConfig = {
() -> UTSJSONObject in
return FitCloudKitManager.getAllConfig()
}
public func fitInitByJs() -> Void {
    return fitInit()
}
public func onEventByJs(_ callback: UTSCallback) -> Void {
    return onEvent({
    (type: String, data: Any) -> Void in
    callback(type, data)
    })
}
public func startScanByJs() -> Void {
    return startScan()
}
public func stopScanByJs() -> Void {
    return stopScan()
}
public func connectByJs(_ deviceId: String) -> Void {
    return connect(deviceId)
}
public func bindByJs(_ userId: String) -> Void {
    return bind(userId)
}
public func unbindByJs() -> Void {
    return unbind()
}
public func syncDataByJs() -> Void {
    return syncData()
}
public func startMeasureByJs(_ type: String, _ interval: UInt8, _ minutes: UInt8) -> Void {
    return startMeasure(type, interval, minutes)
}
public func stopMeasureByJs() -> Void {
    return stopMeasure()
}
public func getAllConfigByJs() -> UTSJSONObject {
    return getAllConfig()
}
@objc(UTSSDKModulesWatchSdkIndexSwift)
@objcMembers
public class UTSSDKModulesWatchSdkIndexSwift : NSObject {
    public static func s_fitInitByJs() -> Void {
        return fitInitByJs()
    }
    public static func s_onEventByJs(_ callback: UTSCallback) -> Void {
        return onEventByJs(callback)
    }
    public static func s_startScanByJs() -> Void {
        return startScanByJs()
    }
    public static func s_stopScanByJs() -> Void {
        return stopScanByJs()
    }
    public static func s_connectByJs(_ deviceId: String) -> Void {
        return connectByJs(deviceId)
    }
    public static func s_bindByJs(_ userId: String) -> Void {
        return bindByJs(userId)
    }
    public static func s_unbindByJs() -> Void {
        return unbindByJs()
    }
    public static func s_syncDataByJs() -> Void {
        return syncDataByJs()
    }
    public static func s_startMeasureByJs(_ type: String, _ interval: UInt8, _ minutes: UInt8) -> Void {
        return startMeasureByJs(type, interval, minutes)
    }
    public static func s_stopMeasureByJs() -> Void {
        return stopMeasureByJs()
    }
    public static func s_getAllConfigByJs() -> UTSJSONObject {
        return getAllConfigByJs()
    }
}
