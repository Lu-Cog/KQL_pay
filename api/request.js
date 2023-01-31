/**
 * 发送请求
 */
function baseRequest(url, method, data, noAuth) {
	// let Url = 'https://kql.iqweb.net',
	let Url = 'http://kql_dev.iqweb.net',
		header = {
			'content-type': 'application/json',
			// 'Access-Control-Allow-Headers':'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
		};
	data.token = uni.getStorageSync('token');
	// data.token = '7ae5faa12af17bea65d095f3b5a73e10'
	if (!data.token && !noAuth) {
		return uni.reLaunch({
			url: '/pages/index/login'
		})
	}

	return new Promise((reslove, reject) => {
		uni.request({
			url: Url + '/api/' + url,
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (res.data.code == 200) {
					reslove(res.data, res);
				} else if ([2001, 1001].indexOf(res.data.code) !== -1) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				} else if (res.data.code == -200) {
					uni.clearStorageSync();
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/index/login'
						})
					}, 500)
				} else {
					uni.clearStorageSync();
					uni.showToast({
						title: '系统错误',
						icon: 'none'
					})
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/index/login'
						})
					}, 500)
				}
			},
			fail: (message) => {
				reject('请求失败');
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, noAuth) => baseRequest(api, method, data, noAuth || false)
});

export default request;
