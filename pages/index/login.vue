<template>
	<view class="login">
		<view class="logo">
			<image src="../../static/logo.png" mode="widthFix"></image>
		</view>
		<view class="item">
			<view class="button line" @click="lineLogin">
				使用LINE登入
			</view>
		</view>
		<view class="or">
			OR
		</view>
		<view class="pwd">
			<view class="button" @click="emailLogin">
				使用Email登入
			</view>
		</view>
		<view class="register" @click="goRegister()">
			注冊新帳號
		</view>
		<view class="bottom">
			<view class="tip">
				透過Facebook，Google，Email注冊扛氣來會員，即表示您已閲讀並同意扛氣來的<text @click="goto(2)">定型化契約</text>，<text
					@click="goto(1)">隱私權政策</text>及<text @click="goto(5)">使用者條款</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		lineLogin
	} from '@/api/index.js'
	export default {
		data() {
			return {
			};
		},
		methods: {
			goRegister() {
				uni.navigateTo({
					url: '/pages/index/register'
				})
			},
			goto(type) {
				uni.navigateTo({
					url: '/pages/index/webView?type=' + type
				})
			},
			lineLogin(){
				uni.showLoading({
					title:'登入中...'
				})
				lineLogin({}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'登入成功',
						icon:'success'
					})
					uni.setStorageSync('token',res.data.token)
					uni.reLaunch({
						url:'/pages/index/index'
					})
				})
			},
			emailLogin() {
				uni.navigateTo({
					url:'/pages/index/emailLogin'
				})
			}
		}
	}
</script>

<style lang="less">
	.logo {
		text-align: center;

		image {
			width: 500rpx;
			height: 300rpx;
		}
	}

	.login {
		background: url('../../static/bg.jpg') no-repeat;
		background-size: 100% 100%;
		position: relative;
		height: 100vh;
		padding: 100rpx 50rpx;
		box-sizing: border-box;

		input {
			margin-top: 10rpx;
			border: 1rpx solid #fff;
			background-color: rgba(255, 255, 255, .4);
			border-radius: 10rpx;
			padding: 10rpx;
			color: #fff;
		}
		.item{
			margin-top: 100rpx;
		}
		.pwd {
			margin-top: 30rpx;
		}

		.bottom {
			position: absolute;
			bottom: 30rpx;
			left: 50rpx;
			right: 50rpx;
		}
		.or{
			text-align: center;
			font-size: 30rpx;
			position: relative;
			margin-top: 20rpx;
			&:before,&::after{
				content: '';                 /*CSS伪类用法*/
				position: absolute;         /*定位背景横线的位置*/
				top: 52%;
				color: #666;
				background: #666;       /*宽和高做出来的背景横线*/
				width: 40%;
				height: 1px;
			}
			&:before{
				left: 0%;
			}
			&::after{
				right: 0%;
			}
		}
		.button {
			text-align: center;
			background-color: #FE84B3;
			color: #FFF;
			padding: 16rpx;
			border-radius: 20rpx;
			margin-bottom: 40rpx;
			box-shadow: 0 0 10rpx 5rpx rgba(0, 0, 0, .1);
		}
		.line{
			background-color: #31AE38;
		}

		.tip {
			font-size: 28rpx;
			color: #666;

			text {
				color: #6570fe;
			}
		}

		.register {
			margin-top: 20rpx;
			text-align: right;
			font-size: 28rpx;
			text-decoration: underline;
			color: #fff;
		}
	}
</style>
