import{p as e,q as a,t as s,u as o,K as l,G as t,o as i,a as n,w as d,j as c,v as r,D as u,i as g,C as f}from"./index.7d2af0f3.js";import{l as p}from"./index.29ed4a84.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";var m=_({data:()=>({}),methods:{goRegister(){e({url:"/pages/index/register"})},goto(a){e({url:"/pages/index/webView?type="+a})},lineLogin(){a({title:"登入中..."}),p({}).then((e=>{s(),o({title:"登入成功",icon:"success"}),l("token",e.data.token),t({url:"/pages/index/index"})}))},emailLogin(){e({url:"/pages/index/emailLogin"})}}},[["render",function(e,a,s,o,l,t){const p=u,_=g,m=f;return i(),n(_,{class:"login"},{default:d((()=>[c(_,{class:"logo"},{default:d((()=>[c(p,{src:"./assets/logo.7ede92bc.png",mode:"widthFix"})])),_:1}),c(_,{class:"item"},{default:d((()=>[c(_,{class:"button line",onClick:t.lineLogin},{default:d((()=>[r(" 使用LINE登入 ")])),_:1},8,["onClick"])])),_:1}),c(_,{class:"or"},{default:d((()=>[r(" OR ")])),_:1}),c(_,{class:"pwd"},{default:d((()=>[c(_,{class:"button",onClick:t.emailLogin},{default:d((()=>[r(" 使用Email登入 ")])),_:1},8,["onClick"])])),_:1}),c(_,{class:"register",onClick:a[0]||(a[0]=e=>t.goRegister())},{default:d((()=>[r(" 注冊新帳號 ")])),_:1}),c(_,{class:"bottom"},{default:d((()=>[c(_,{class:"tip"},{default:d((()=>[r(" 透過Facebook，Google，Email注冊扛氣來會員，即表示您已閲讀並同意扛氣來的"),c(m,{onClick:a[1]||(a[1]=e=>t.goto(2))},{default:d((()=>[r("定型化契約")])),_:1}),r("，"),c(m,{onClick:a[2]||(a[2]=e=>t.goto(1))},{default:d((()=>[r("隱私權政策")])),_:1}),r("及"),c(m,{onClick:a[3]||(a[3]=e=>t.goto(5))},{default:d((()=>[r("使用者條款")])),_:1})])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-160dcf08"]]);export{m as default};
