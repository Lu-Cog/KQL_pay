<template>
	<view class="login">
		<view class="item">
			<text>Email*</text>
			<input type="text" v-model="email" placeholder="請輸入郵箱"/>
		</view>
		<view class="pwd">
			<text>密碼</text>
			<input type="text" v-model="pwd" placeholder="請輸入密碼"/>
		</view>
		<view class="bottom">
			<view class="button" @click="login">
				登入
			</view>
		</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/index.js'
	export default {
		data() {
			return {
				email:'',
				pwd:''
			};
		},
		onLoad(option) {
			
		},
		methods:{
			goRegister(){
				uni.navigateTo({
					url:'/pages/index/register'
				})
			},
			goto(type){
				uni.navigateTo({
					url:'/pages/index/webView?type='+type
				})
			},
			login(){
				if(!this.email){
					return uni.showToast({
						title:'請輸入郵箱',
						icon:'none'
					})
				}
				if(!this.pwd){
					return uni.showToast({
						title:'請輸入密碼',
						icon:'none'
					})
				}
				let data = {
					accountName:this.email,
					password:this.pwd,
					accountType:1
				}
				uni.showLoading({
					title:'登入中...'
				})
				login(data).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'登入成功',
						icon:'success'
					})
					console.log(res);
					uni.setStorageSync('token',res.data.token)
					console.log(uni.getStorageSync('token'));
					uni.reLaunch({
						url:'/pages/index/index'
					})
				})
			}
		}
	}
</script>

<style lang="less">
.login{
	background-size: 100% 100%;
	position: relative;
	min-height: 100vh;
	padding: 100rpx 50rpx;
	box-sizing: border-box;
	input{
		margin-top: 10rpx;
		border: 1rpx solid #999;
		background-color: rgba(255, 255, 255, .4);
		border-radius: 10rpx;
		padding: 10rpx;
	}
	.pwd{
		margin-top: 30rpx;
	}
	.bottom{
		position: absolute;
		bottom: 130rpx;
		left: 50rpx;
		right: 50rpx;
	}
	.button{
		text-align: center;
		background-color: #FE84B3;
		color: #FFF;
		padding: 16rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		box-shadow: 0 0 10rpx 5rpx rgba(0, 0, 0, .1);
	}
	.tip{
		font-size: 28rpx;
		color:#666;
		text{
			color: #6570fe;
		}
	}
	.register{
		margin-top: 20rpx;
		text-align: right;
		font-size: 28rpx;
		text-decoration: underline;
		color: #fff;
	}
}
</style>
