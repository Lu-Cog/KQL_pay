import{l as a,o,a as n,w as s,j as t,t as p,u as e,v as l,d,y as i,i as r}from"./index.8e863946.js";import{b as f}from"./index.585ffcd8.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";var u=_({data:()=>({id:0,payInfo:{}}),onLoad(o){this.id=a().globalData.order_id||0,this.getInfo()},methods:{getInfo(){f({order_id:this.id}).then((a=>{this.payInfo=a.data}))}}},[["render",function(a,f,_,u,y,c){const I=r;return o(),n(I,{class:"pay"},{default:s((()=>[t(I,{class:"paytitle"},{default:s((()=>[p(e(y.payInfo.gtpay_status_str),1)])),_:1}),y.payInfo.wa_coin>0?(o(),l("p",{key:0},"感謝您使用瓦幣折抵消費")):d("",!0),i("p",null,"請出示店家，確認付款成功"),i("p",null,"訂單詳情"),t(I,{class:"main"},{default:s((()=>[i("p",null,"訂單編號："+e(y.payInfo.order_sn),1),i("p",null,"支付編號："+e(y.payInfo.gtpay_order_id),1),i("p",null,"店鋪名稱："+e(y.payInfo.shop_name),1),i("p",null,"支付金額："+e(y.payInfo.total_price),1),i("p",null,"瓦幣折抵："+e(y.payInfo.wa_coin),1),i("p",null,"下單時間："+e(y.payInfo.add_time),1)])),_:1})])),_:1})}],["__scopeId","data-v-2645b1ce"]]);export{u as default};
