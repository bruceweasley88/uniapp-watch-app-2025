<template>
	<view class="page">
		<nav-bar :title="$t('page.presonal')" :button-text="$t('common.save')" @clickButton="save" />

		<view class="body">

			<view class="user-head click-active">
				<image src="/static/img/icon_photo.webp" mode="aspectFill" style="width: 100%; height: 100%;" />
			</view>

			<view class="list">
				<view class="item click-active" @click="onModify('nickName')">
					<view class="label">{{ $t('personal.nickname') }}</view>
					<view :class="getValueClassName('nickName')">{{ form.nickName || $t('common.fillIn') }}</view>
				</view>
				<view class="item click-active" @click="onModify('name')">
					<view class="label">{{ $t('personal.name') }}</view>
					<view :class="getValueClassName('name')">{{ form.name || $t('common.fillIn') }}</view>
				</view>
				<view class="item click-active" @click="onModify('sex')">
					<view class="label">{{ $t('personal.gender') }}</view>
					<view :class="getValueClassName('sex')">{{ form.sex || $t('common.fillIn') }}</view>
				</view>
				<view class="item click-active" @click="onModify('age')">
					<view class="label">{{ $t('personal.age') }}</view>
					<view :class="getValueClassName('age')">{{ form.age || $t('common.fillIn') }}</view>
				</view>
				<view class="item click-active" @click="onModify('height')">
					<view class="label">{{ $t('personal.height') }}</view>
					<view :class="getValueClassName('height')">{{ form.height || $t('common.fillIn') }}</view>
				</view>
				<view class="item click-active" @click="onModify('weight')">
					<view class="label">{{ $t('personal.weight') }}</view>
					<view :class="getValueClassName('weight')">{{ form.weight || $t('common.fillIn') }}</view>
				</view>
				<view class="item click-active" @click="onModify('address')">
					<view class="label">{{ $t('personal.address') }}</view>
					<view :class="getValueClassName('address')">{{ form.address || $t('common.fillIn') }}</view>
				</view>
			</view>

		</view>


		<confirm-popup :visible="confirm === 'nickName'" :title="$t('personal.nickname')" :content="$t('personal.enterNickname')"
			@cancel="onCancel" @ok="onOk">
			<input class="input" v-model="confirmValue" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'name'" :title="$t('personal.name')" :content="$t('personal.enterName')" @cancel="onCancel"
			@ok="onOk">
			<input class="input" v-model="confirmValue" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'sex'" :title="$t('personal.gender')" :content="$t('personal.genderTip')"
			@cancel="onCancel" @ok="onOk">
			<view class="select">
				<view :class="`option ${confirmValue === 'male' ? 'selected' : ''}`" @click="confirmValue = 'male'">
					<view class="male">{{ $t('common.male') }}</view>
					<view class="check" />
				</view>
				<view :class="`option ${confirmValue === 'female' ? 'selected' : ''}`" @click="confirmValue = 'female'">
					<view class="female">{{ $t('common.female') }}</view>
					<view class="check" />
				</view>
			</view>
		</confirm-popup>

		<confirm-popup :visible="confirm === 'age'" :title="$t('personal.age')" :content="$t('personal.genderTip')"
			@cancel="onCancel" @ok="onOk">
			<number-picker :value="confirmValue" :intRange="[1, 200]" @input="onNumberPickerInput" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'weight'" :title="$t('personal.weight') + '（' + $t('personal.weightUnit') + '）'"
			:content="$t('personal.genderTip')" @cancel="onCancel" @ok="onOk">
			<number-picker :value="confirmValue" :intRange="[1, 200]" :floatRange="[0, 9]" @input="onNumberPickerInput" />
		</confirm-popup>

		<confirm-popup :visible="confirm === 'height'" :title="$t('personal.height') + '（' + $t('personal.heightUnit') + '）'"
			:content="$t('personal.genderTip')" @cancel="onCancel" @ok="onOk">
			<number-picker :value="confirmValue" :intRange="[1, 200]" :floatRange="[0, 9]" @input="onNumberPickerInput" />
		</confirm-popup>


		<confirm-popup :visible="confirm === 'address'" :title="$t('personal.address')" :content="$t('personal.enterAddress')"
			@cancel="onCancel" @ok="onOk">
			<textarea class="textarea" v-model="confirmValue" />
		</confirm-popup>

	</view>
</template>

<script>
import NavBar from '../../components/nav-bar.vue';
import ConfirmPopup from '../../components/confirm-popup.vue';
import NumberPicker from '../../components/number-picker.vue';
import { userEditInfo, userGetInfo } from '../../apis/userApi';


export default {
	components: {
		NavBar,
		ConfirmPopup,
		NumberPicker
	},
	data() {
		return {

			form: {
				nickName: '',
				name: '',
				sex: '',
				age: '',
				height: '',
				weight: '',
				address: ''
			},

			// 弹窗
			confirm: '',
			confirmValue: ''
		}
	},
	onLoad() {
		this.getUserInfo();
	},
	onShow() {

	},
	methods: {
		async getUserInfo() {
			const userInfo = await userGetInfo();
			this.form = userInfo.data;
		},
		async save() {
			userEditInfo({
				...this.form
			})

			const reqiureField = ['nickName', 'name', 'sex', 'age', 'height', 'weight', 'address']

			for (const field of reqiureField) {
				if (!this.form[field]) {
					uni.showToast({ title: this.$t('personal.fillRequired'), icon: 'error' })
					return;
				}
			}

			uni.showToast({ title: this.$t('common.success'), icon: 'success' })
		},
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
		},
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