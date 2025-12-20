<template>
	<view class="page">
		<nav-bar title="Personal Data" button-text="Save" />

		<view class="body">

			<view class="user-head click-active">
				<image src="/static/img/icon_photo.webp" mode="aspectFill" style="width: 100%; height: 100%;" />
			</view>

			<view class="list">
				<view class="item click-active" @click="onModify('nickname')">
					<view class="label">Nickname</view>
					<view :class="getValueClassName('nickname')">{{ form.nickname || 'Fill in' }}</view>
				</view>
				<view class="item click-active" @click="onModify('name')">
					<view class="label">Name</view>
					<view :class="getValueClassName('name')">{{ form.name || 'Fill in' }}</view>
				</view>
				<view class="item click-active" @click="onModify('gender')">
					<view class="label">Gender</view>
					<view :class="getValueClassName('gender')">{{ form.gender || 'Fill in' }}</view>
				</view>
				<view class="item click-active" @click="onModify('age')">
					<view class="label">Age</view>
					<view :class="getValueClassName('age')">{{ form.age || 'Fill in' }}</view>
				</view>
				<view class="item click-active" @click="onModify('height')">
					<view class="label">Height</view>
					<view :class="getValueClassName('height')">{{ form.height || 'Fill in' }}</view>
				</view>
				<view class="item click-active" @click="onModify('weight')">
					<view class="label">Weight</view>
					<view :class="getValueClassName('weight')">{{ form.weight || 'Fill in' }}</view>
				</view>
				<view class="item click-active" @click="onModify('address')">
					<view class="label">Address</view>
					<view :class="getValueClassName('address')">{{ form.address || 'Fill in' }}</view>
				</view>
			</view>

		</view>


		<confirm-popup :visible="confirm === 'nickname'" title="Nickname" content="Please enter your nicename"
			@cancel="onCancel" @ok="onOk">
			<input class="input" v-model="confirmValue" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'name'" title="Name" content="Please enter your name" @cancel="onCancel"
			@ok="onOk">
			<input class="input" v-model="confirmValue" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'gender'" title="Gender" content="Data will be synced to your personal profile"
			@cancel="onCancel" @ok="onOk">
			<view class="select">
				<view :class="`option ${confirmValue === 'male' ? 'selected' : ''}`" @click="confirmValue = 'male'">
					<view class="male">Male</view>
					<view class="check" />
				</view>
				<view :class="`option ${confirmValue === 'female' ? 'selected' : ''}`" @click="confirmValue = 'female'">
					<view class="female">Female</view>
					<view class="check" />
				</view>
			</view>
		</confirm-popup>

		<confirm-popup :visible="confirm === 'age'" title="Age" content="Data will be synced to your personal profile"
			@cancel="onCancel" @ok="onOk">
			<number-picker :value="confirmValue" :intRange="[1, 200]" @input="onNumberPickerInput" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'weight'" title="Weight（KG）"
			content="Data will be synced to your personal profile" @cancel="onCancel" @ok="onOk">
			<number-picker :value="confirmValue" :intRange="[1, 200]" :floatRange="[0, 9]" @input="onNumberPickerInput" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'height'" title="Height（CM）"
			content="Data will be synced to your personal profile" @cancel="onCancel" @ok="onOk">
			<number-picker :value="confirmValue" :intRange="[1, 200]" :floatRange="[0, 9]" @input="onNumberPickerInput" />
		</confirm-popup>


		<confirm-popup :visible="confirm === 'address'" title="Address" content="Please enter your family address"
			@cancel="onCancel" @ok="onOk">
			<textarea class="textarea" v-model="confirmValue" />
		</confirm-popup>

	</view>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';
import ConfirmPopup from '../../components/confirm-popup.vue';
import NumberPicker from '../../components/number-picker.vue';


export default {
	components: {
		NavBar,
		ConfirmPopup,
		NumberPicker
	},
	data() {
		return {

			form: {
				nickname: '',
				name: '',
				gender: '',
				age: '',
				height: '',
				weight: '',
				address: ''
			},

			// 弹窗
			confirm: 'Nickname',
			confirmValue: ''
		}
	},
	onload() {

	},
	onShow() {
		plus.navigator.closeSplashscreen();
	},
	methods: {
		toBack() {
			uni.navigateBack();
		},
		onModify(field) {
			this.confirmValue = this.form[field]
			this.confirm = field
		},
		onCancel() {
			this.confirmValue = ''
			this.confirm = ''
		},
		onOk() {
			this.form[this.confirm] = this.confirmValue;
			this.confirmValue = ''
			this.confirm = ''
		},
		getValueClassName(field) {
			if (this.form[field]) {
				return 'value'
			}
			return 'value empty'
		},
		onNumberPickerInput(value) {
			this.confirmValue = value;
		}
	}
}
</script>
<style scoped>
.page {
	width: 100vw;
	height: 100vh;
	background-color: #111217;
}


.body {
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 80rpx;

	.user-head {
		width: 164rpx;
		height: 164rpx;
		border-radius: 164rpx;
		background-color: #000;
		border: 2px solid #EAEAEA;
		overflow: hidden;
	}

	.list {
		margin-top: 86rpx;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #272935;
			height: 104rpx;
			width: 604rpx;

			.label,
			.value {
				color: #FFFFFF;
				font-size: 33rpx;
				font-weight: 400;
				font-family: 'Alibaba Medium';
			}

			.value {
				max-width: 300rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}

			.value::after {
				content: '';
				display: inline-block;
				background: url('/static/img/icon_moreb.webp');
				background-size: cover;

				width: 20rpx;
				height: 26rpx;
				margin-left: 26rpx;
				vertical-align: middle;
			}

			.empty {
				color: #7D7E83
			}
		}
	}


}

.input {
	width: 575rpx;
	height: 120rpx;
	background: #EEF6F6;
	border-radius: 22rpx;
	padding: 0 22rpx;
}

.textarea {
	width: 575rpx;
	height: 211rpx;
	background: #EEF6F6;
	border-radius: 22rpx;
	padding: 22rpx;
}

.select {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 40rpx;

	.option {
		width: 575rpx;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.male,
		.female {
			font-family: 'Alibaba Medium';
			color: #7D7E83;
		}

		.female::before,
		.male::before {
			display: inline-block;
			content: '';
			width: 51rpx;
			height: 51rpx;
			margin-right: 22rpx;
			background-size: cover;
			vertical-align: middle;
		}

		.male::before {
			background-image: url('/static/img/icon_male.webp');
		}

		.female::before {
			background-image: url('/static/img/icon_female.webp');
		}

		.check {
			width: 44rpx;
			height: 44rpx;
			background-size: cover;
			background-image: url('/static/img/icon_unselected.webp');
		}

	}

	.option:first-of-type {
		border-bottom: 2rpx solid #EAEAEA;
	}

	.selected {

		.male,
		.female {
			color: #1C1F2A;
		}

		.check {
			background-image: url('/static/img/icon_selected.webp');
		}
	}

}
</style>