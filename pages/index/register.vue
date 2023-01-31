<template>
	<view class="login">
		<view class="item">
			<text>Email*</text>
			<input type="text" v-model="email" placeholder="請輸入郵箱" />
		</view>
		<view class="pwd">
			<text>電話號碼*</text>
			<input type="text" v-model="phone" placeholder="請輸入電話號碼" />
		</view>
		<view class="pwd">
			<text>密碼*</text>
			<input type="text" v-model="pwd" placeholder="請輸入密碼" />
			<text class="tip">密碼需為8-20位，至少包含一個英文字母和數字</text>
		</view>
		<view class="pwd">
			<text>請選擇以下身份註冊*</text>
			<radio-group @change="radioChange">
				<label class="label" v-for="(item, index) in items" :key="item.value">
					<radio :value="item.value" :checked="item.value === userType" />
					<view>
						<text>{{item.name}}</text>
						<text>（目前僅限用複合式{{item.tip}}kg瓦斯）</text>
					</view>
				</label>
			</radio-group>
		</view>
		<view class="button" @click="register">
			確認註冊
		</view>
	</view>
</template>

<script>
	import {
		register
	} from '@/api/index.js'
	export default {
		data() {
			return {
				email: '',
				pwd: '',
				phone: '',
				userType: 0,
				items: [{
					name: '一般用戶',
					value: 1,
					tip: 15
				}, {
					name: '商業用戶',
					value: 2,
					tip: 20
				}]
			};
		},
		onLoad(option) {

		},
		methods: {
			radioChange: function(evt) {
				this.userType = evt.detail.value
			},
			register() {
				if (!this.email) {
					return uni.showToast({
						title: '請輸入郵箱',
						icon: 'none'
					})
				}
				if (!this.phone) {
					return uni.showToast({
						title: '請輸入電話號碼',
						icon: 'none'
					})
				}
				if (!(this.pwd.length >= 8 && this.pwd.length <= 20)) {
					return uni.showToast({
						title: '請輸入正確密碼',
						icon: 'none'
					})
				}
				if (!this.userType) {
					return uni.showToast({
						title: '請選擇身份',
						icon: 'none'
					})
				}
				let data = {
					accountName: this.email,
					password: this.pwd,
					phone: this.phone,
					accountType: 1
				}
				uni.showLoading({
					title: '加載中...'
				})
				register(data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: '註冊成功',
						icon: 'success'
					})
					uni.reLaunch({
						url: '/pages/index/login'
					})
				})
			}
		}
	}
</script>

<style lang="less">
	.label {
		display: flex;
		align-items: center;

		>view {
			display: flex;
			flex-direction: column;
			margin: 10rpx 0;
		}
	}

	.login {
		position: relative;
		height: 90vh;
		padding: 100rpx 50rpx;
		box-sizing: border-box;

		input {
			margin-top: 10rpx;
			border: 1rpx solid #999;
			border-radius: 10rpx;
			padding: 10rpx;
		}

		.pwd {
			margin-top: 30rpx;

			text {
				&:last-child {
					font-size: 24rpx;
					color: #FE84B3;
				}
			}
		}

		.button {
			position: absolute;
			bottom: 100rpx;
			left: 50rpx;
			text-align: center;
			right: 50rpx;
			background-color: #FE84B3;
			color: #FFF;
			padding: 16rpx;
			border-radius: 50rpx;
		}
	}
</style>
