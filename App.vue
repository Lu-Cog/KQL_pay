<script>
	export default {
		globalData:{
			shop_id:'',
			shop_name:'',
			order_id:''
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
			
			this.globalData.shop_id = tmpParas["shop_id"];//提取参数
			this.globalData.shop_name = decodeURI(tmpParas["shop_name"]);//提取参数
			this.globalData.order_id = tmpParas["order_id"];//提取参数
			console.log(this.globalData.shop_id);
			if(this.globalData.order_id){
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
