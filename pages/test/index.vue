<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
			<text class="title" @click="start()">[ 扫描 ]</text>
		</view>

		<view>
			<view v-for="key in list()" @click="connectDevice(key)" style="line-height: 32px; margin-bottom: 8px; border: 1px solid #333;">
				{{devices[key]}}
			</view>
		</view>
		
		<button @click="bindUser">绑定</button>
		<button @click="unbindUser">解绑</button>
		
		<button @click="clickSyncData">【同步】</button>
		
		<button @click="clickStartMeasure('ecg')">心电图</button>
		
		<!-- 心率 -->
		<button @click="clickStartMeasure('heartRate')">心率</button>
		
		<!-- 血压 -->
		<button @click="clickStartMeasure('bloodPressure')">血压</button>
		
		
		<!-- 血氧 -->
		<button @click="clickStartMeasure('bloodOxygen')">血氧</button>
		
		<!-- 呼吸率 -->
		<button @click="clickStartMeasure('respiratoryRate')">呼吸率</button>
		
		<button @click="clickStopMeasure">【停止测量】</button>
		
		<button @click="clickConfig">【获取配置】</button>
		
		<view style="margin-top: 16px;">
			<view v-for="item in logList" style="margin-bottom: 8px;">
				<view style="font-weight: bold;">{{item.type}}</view>
				<view>{{JSON.stringify(item.data)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fitInit,
		onEvent,
		startScan,
		connect,
		bind,
		unbind,
		syncData,
		startMeasure,
		stopMeasure,
		getAllConfig
	} from "../../uni_modules/watch-sdk"
	export default {
		data() {
			return {
				devices: {},
				logList: []
			}
		},
		onLoad() {
			fitInit();
			onEvent((type, data) => {
				if (type === 'onPeripheralDiscovered') {
					this.devices = {
						...this.devices,
						[data.deviceId]: data.deviceName
					}
				}
				if(type === 'onPeripheralConnectedNotification') {
					uni.showModal({
						content: '连接成功'
					})
				}
				if(type === 'onPeripherialConnectFailureNotification') {
					uni.showModal({
						content: data.msg || '连接失败（-3）'
					})
				}
				if(type === 'onLogMessage') {
					return;
				}
				this.logList.unshift({type, data})
			})
		},
		methods: {
			start() {
				startScan()
			},
			list() {
				return Object.keys({
					...this.devices
				})
			},
			connectDevice(id) {
				connect(id)
			},
			bindUser() {
				bind("1000")
			},
			unbindUser() {
				unbind()
			},
			clickSyncData() {
				syncData()
			},
			clickStartMeasure(type) {
				startMeasure(type, 50, 1)
			},
			clickStopMeasure() {
				stopMeasure()
			},
			clickConfig() {
				this.logList.unshift({
					type: "config", 
					data: getAllConfig()
				})
			}
		}
	}
</script>

<style>

</style>