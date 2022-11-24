<template>
	<view class="pay">
		<view class="paytitle">
			{{shop_name}}
		</view>
		<view class="payInput">
			${{money}}
		</view>
		<view class="numKey">
			<button class="keyItem" v-for="item in numList" :key="item" @click="clickNum(item)">
				{{item}}
			</button>
			<button class="keyItem" @click="clearNum()">
				清除
			</button>
			<button class="keyItem" @click="clickNum(0)">
				0
			</button>
			<button class="keyItem" @click="delNum()">
				←
			</button>
		</view>
		<view class="wabi">
			<text>您有{{islogin?wa_coin:'**'}}枚瓦幣，本次使用</text>
			<input type="number" :disabled="!islogin" placeholder="0" v-model="wbNum" @input="wbInput()"
				@blur="wbBlur()" />
			<view class="shiyong" @click="shiyong">
				使用
			</view>
		</view>
		<view class="payType">
			<text>付款方式</text>

			<picker mode="selector" :range="paylist" range-key='name' :value="index" @change='changePay'>
				<view>{{payName}}
					<image src="../../static/xiala.png" mode="widthFix"></image>
				</view>
			</picker>
		</view>
		<view class="info">
			<p><span>小計</span><span>{{money}}元</span></p>
			<p><span>瓦幣折抵</span><span>-{{wbNum||0}}元</span></p>
			<p><span>合計金額</span><span>${{wbNum?money-wbNum:money}}元</span></p>
		</view>
		<button class="submit" @click="submit">結帳</button>
		<p class='xieyi'>您下訂單的同時，即自動同意</p>
		<uni-popup ref="popup" :mask-click="false">
			<view class="popupMain">
				<p class="think">
					感謝您使用瓦幣折抵消費
				</p>
				<p class="title">
					您確定全額使用瓦幣支付 ?
				</p>
				<p class="orderTitle mt90">
					訂單詳情
				</p>
				<view class="orderInfo">
					<p>
						店鋪名稱：{{shop_name}}
					</p>
					<p>
						總金額：{{money}}
					</p>
					<p>
						瓦幣折抵：{{wbNum}}
					</p>
					<p>
						支付金額：0
					</p>
					<p>
						下單時間：{{time}}
					</p>
					<view class="popupBtn">
						<view class="sure" @click="create">
							確定
						</view>
						<view class="cancel" @click="$refs.popup.close()">
							取消
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		getOrderConfig,
		getUserInfo,
		hoinPay,
	} from '@/api/index.js'
	export default {
		data() {
			return {
				wa_coin: 0,
				wbNum: '',
				money: 0,
				numList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				paylist: [],
				payindex: 0,
				shop_id: '',
				shop_name: '',
				payName: '',
				time: '',
				islogin:false
			};
		},
		onLoad(option) {
			this.shop_id = getApp().globalData.shop_id || 0
			this.shop_name = getApp().globalData.shop_name || ''
			this.getOrderConfig()
		},
		onShow() {
			if(uni.getStorageSync('token')){
				this.islogin = true
				this.getUserInfo()
			}else{
				this.islogin = false
			}
		},
		methods: {
			shiyong(){
				if(uni.getStorageSync('token')){
					this.islogin = true
					this.getUserInfo()
				}else{
					this.islogin = false
					uni.showModal({
						content:'若您是扛氣來用戶，且有瓦幣折抵，請先登入',
						success(res) {
							if(res.confirm){
								uni.navigateTo({
									url:'/pages/index/login'
								})
							}
						}
					})
				}
			},
			getDate() {
				Date.prototype.Format = function(fmt) { // author: meizz
					var o = {
						"M+": this.getMonth() + 1, // 月份
						"d+": this.getDate(), // 日
						"h+": this.getHours(), // 小时
						"m+": this.getMinutes(), // 分
						"s+": this.getSeconds(), // 秒
						"q+": Math.floor((this.getMonth() + 3) / 3), // 季度
						"S": this.getMilliseconds() // 毫秒
					};
					if (/(y+)/.test(fmt))
						fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
					for (var k in o)
						if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
							(o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
					return fmt;
				}
				this.time = new Date().Format("yyyy-MM-dd hh:mm:ss");
			},
			create(){
				uni.showLoading({
					title:'加載中...'
				})
				let data = {
					amount:this.money,
					wa_coin:this.wbNum,
					shop_id:this.shop_id,
					shop_name:this.shop_name,
					gtpay_type:JSON.parse(JSON.stringify(this.paylist))[this.payindex].type
				}
				hoinPay(data).then(res=>{
					uni.hideLoading()
					if(res.data.order_id){
						getApp().globalData.order_id = res.data.order_id
						uni.navigateTo({
							url:"/pages/index/paySuccess"
						})
					}else{
						window.location.href = res.data.pay_url
					}
					this.$refs.popup.close()
					this.wbNum = ''
					this.money = 0
				})
			},
			submit() {
				if(!this.money){
					return uni.showToast({
						title:'請輸入金額',
						icon:'none'
					})
				}
				if(Number(this.money)<Number(this.wbNum)){
					return uni.showToast({
						title:'使用瓦幣不可超過實際支付的金額',
						icon:'none'
					})
				}
				if(Number(this.money)==Number(this.wbNum)){
					this.getDate()
					this.$refs.popup.open()
				}else{
					this.create()
				}
			},
			wbBlur() {
				this.wbNum = this.wbNum
			},
			clearNum(num) {
				this.money = 0
			},
			clickNum(num) {
				if (this.money) {
					this.money = this.money + '' + num
				} else {
					this.money = num
				}
			},
			wbInput() {
				let wbNum = this.wbNum
				if (!(/(^[1-9]\d*$)/.test(wbNum)) && wbNum) {
					this.wbNum = ''
				} else {
					if (wbNum >= this.wa_coin) {
						this.wbNum = this.wa_coin
					} else if (wbNum <= 0) {
						this.wbNum = ''
					}
				}

			},
			delNum() {
				if (this.money) {
					this.money = this.money.substring(0, this.money.length - 1);
					if (!this.money) {
						this.money = 0
					}
				} else {
					this.money = 0
				}
			},
			getOrderConfig() {
				getOrderConfig({}).then(res => {
					this.paylist = res.data.gtpay_type
					this.payName = JSON.parse(JSON.stringify(this.paylist))[this.payindex].name
				})
			},
			getUserInfo() {
				let data = {}
				getUserInfo(data).then(res => {
					this.wa_coin = parseInt(res.data.wa_coin)
				})
			},
			changePay(e) {
				console.log(e);
				this.payindex = e.detail.value
				this.payName = JSON.parse(JSON.stringify(this.paylist))[this.payindex].name
			},
		}
	}
</script>

<style lang="less">
	.popupMain {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(#99BAA4, #779D6E);
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 250rpx;
		>p{
			color: #fff;
			font-size: 36rpx;
			margin-bottom: 40rpx;
			&:last-child{
				margin-top: 90rpx;
			}
		}
		.title{
			font-weight: 700;
			font-size: 40rpx;
		}
		.mt90{
			margin-top: 70rpx;
		}
		.orderInfo{
			background-color: #E2F0D9;
			border-radius: 20rpx;
			padding: 50rpx 30rpx;
			width: 80%;
			p{
				margin-bottom: 40rpx;
			}
			.popupBtn{
				display: flex;
				align-items: center;
				justify-content: space-around;
				>view{
					border-radius: 10rpx;
					width: 45%;
					padding: 20rpx 0;
					text-align: center;
				}
				.sure{
					background-color: #92B59C;
					color: #fff;
				}
				.cancel{
					border: 1px solid #92B59C;
					color: #92B59C;
					
				}
			}
		}
	}

	.pay {
		min-height: 100vh;
		background: linear-gradient(#99BAA4, #779D6E);
		display: flex;
		align-items: center;
		flex-direction: column;
		padding-top: 20rpx;

		.paytitle {
			background-color: #FEC104;
			text-align: center;
			padding: 20rpx;
			width: 80%;
			font-weight: 700;
			border-radius: 10rpx;
			margin-bottom: 20rpx;
		}

		.payInput {
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			background-color: #fff;
			border: 4rpx #AC8D21 solid;
			width: 80%;
			color: #AC8D21;
			font-size: 48rpx;
			font-weight: 700;
			vertical-align: middle;
			border-radius: 10rpx;
			padding: 0 10rpx;
			height: 90rpx;
			margin-bottom: 20rpx;
		}

		.numKey {
			width: 80%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;

			.keyItem {
				margin-bottom: 20rpx;
				width: 30%;
				// background-color: #fff;
				border-radius: 10rpx;
				box-shadow: 0 0 8rpx #88ACCD;
				height: 100rpx;
				font-size: 48rpx;
				color: #88ACCD;
				font-weight: 700;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.wabi {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 80%;

			text {
				font-size: 28rpx;
				color: #FF9EC3;
				background-color: #F6EAB8;
				border: 1px solid #FF9EC3;
				border-radius: 10rpx;
				height: 60rpx;
				padding: 0 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				white-space: nowrap;
			}

			input {
				background-color: #fff;
				width: 100rpx;
				height: 60rpx;
				border-radius: 10rpx;
				margin: 0 10rpx;
				text-align: right;
				padding: 0 10rpx;
			}
			.shiyong{
				height: 60rpx;
				background-color: #FFBA04;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100rpx;
				border-radius: 10rpx;
				white-space: nowrap;
			}
			button {
				height: 60rpx;
				background-color: #FFBA04;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0;
			}
		}

		.payType {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 80%;

			text {
				color: #FF9EC3;
				background-color: #F6EAB8;
				border: 1px solid #FF9EC3;
				border-radius: 10rpx;
				height: 60rpx;
				padding: 0 10rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
				white-space: nowrap;
			}

			>picker {
				width: 70%;
				box-sizing: border-box;
				border: 1px solid #A3A3A3;
				padding: 20rpx 38rpx;
				border-radius: 15rpx;
				display: inline-block;
				background-color: #fff;

				view {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				image {
					margin-left: 10rpx;
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
				}
			}
		}

		.info {
			width: 70%;
			margin-top: 40rpx;

			p {
				margin-bottom: 10rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&:last-child {
					font-size: 40rpx;
					font-weight: 700;
					color: #FFBA04;
				}
			}
		}

		.submit {
			margin-top: 30rpx;
			width: 200rpx;
			height: 70rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFB535;
		}

		.xieyi {
			margin-top: 50rpx;
			font-size: 30rpx;
			color: #333;
		}
	}
</style>
