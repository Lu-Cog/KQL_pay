<template>
	<view class="pay">
		<view class="paytitle">
			{{payInfo.gtpay_status_str}}
		</view>
		<p v-if="payInfo.wa_coin>0">感謝您使用瓦幣折抵消費</p>
		<p>請出示店家，確認付款成功</p>
		<p>訂單詳情</p>
		<view class="main">
			<p>訂單編號：{{payInfo.order_sn}}</p>
			<p>支付編號：{{payInfo.gtpay_order_id}}</p>
			<p>店鋪名稱：{{payInfo.shop_name}}</p>
			<p>支付金額：{{payInfo.total_price}}</p>
			<p>瓦幣折抵：{{payInfo.wa_coin}}</p>
			<p>下單時間：{{payInfo.add_time}}</p>
		</view>
	</view>
</template>

<script>
	import {
		hoinPayInfo
	} from '@/api/index.js'
	export default {
		data() {
			return {
				id:0,
				payInfo:{}
			};
		},
		onLoad(option) {
			this.id = getApp().globalData.order_id || 0
			this.getInfo()
		},
		methods:{
			getInfo(){
				hoinPayInfo({order_id:this.id}).then(res=>{
					this.payInfo = res.data
				})
			}
		}
	}
</script>

<style lang="less">
.pay{
	min-height: 100vh;
	background: linear-gradient(#99BAA4,#779D6E);
	display: flex;
	align-items: center;
	flex-direction: column;
	padding-top: 20rpx;
	.paytitle{
		background-color: #E2F0D9;
		text-align: center;
		color: #88AB87;
		padding: 20rpx 50rpx;
		font-weight: 700;
		font-size: 40rpx;
		border-radius: 10rpx;
		margin: 60rpx 0rpx;
	}
	>p{
		color: #fff;
		font-size: 36rpx;
		margin-bottom: 40rpx;
	}
	.main{
		background-color: #E2F0D9;
		border-radius: 20rpx;
		padding: 30rpx;
		width: 80%;
		p{
			margin-bottom: 40rpx;
		}
	}
}
</style>
