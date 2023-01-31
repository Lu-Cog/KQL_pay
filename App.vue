<script>
	export default {
		globalData:{
			order_id:'',
			vip_order_id:'',
			openid:'',
			email:''
		},
		onLaunch: function() {
			// 打包后
			let tmpUrlSearch = window.location.search;
			let tmpParas = this.GetRequestParameters(tmpUrlSearch);
			// 打包前
			// let url = window.location.href;
			// var urlArray = url.split('?');
			// var tempStr = '?'+urlArray[1];
			// let tmpParas = this.GetRequestParameters(tempStr);
			// var tmpSceneID = tmpParas["userName"];//提取参数
			// tmpSceneID = tmpSceneID.replace('#/', '');
			if(tmpParas["shop_id"]){
				uni.setStorageSync('shop_id',tmpParas["shop_id"])
			}
			if(decodeURI(tmpParas["shop_name"])){
				uni.setStorageSync('shop_name',decodeURI(tmpParas["shop_name"]))
			}
			this.globalData.order_id = tmpParas["order_id"];//提取参数
			this.globalData.email = tmpParas["email"];//提取参数
			this.globalData.vip_order_id = tmpParas["vip_order_id"];//提取参数
			this.globalData.openid = tmpParas["openid"];//提取参数
			if(this.globalData.openid){
				uni.reLaunch({
					url:'/pages/index/login'
				})
			}
			if(this.globalData.order_id || this.globalData.vip_order_id){
				uni.reLaunch({
					url:"/pages/index/paySuccess"
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			GetRequestParameters(locationsearch){
				let url = locationsearch;  
				let theRequest = new Object();  
				if (url.indexOf("?") != -1) {  
					let str = url.substr(1);  
					let strs = str.split("&");  
					for (let i = 0; i < strs.length; i++) {  
						theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);  
					}  
				}  
				return theRequest;  
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
