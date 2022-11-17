<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			};
		},
		onLoad(option) {
			this.src = 'https://kql.iqweb.net/api/Article/detail/article_id/'+option.type
		}
	}
</script>

<style lang="less">

</style>
