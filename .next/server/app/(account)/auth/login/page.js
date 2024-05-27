(()=>{var e={};e.id=788,e.ids=[788],e.modules={55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},62762:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>u,routeModule:()=>x,tree:()=>c});var s=t(67096),o=t(16132),n=t(37284),a=t.n(n),i=t(32564),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);t.d(r,l);let c=["",{children:["(account)",{children:["auth",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,403)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\auth\\login\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,15211)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9291,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(t.bind(t,15636)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\layout.tsx"],error:[()=>Promise.resolve().then(t.bind(t,38196)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9291,23)),"next/dist/client/components/not-found-error"]}],u=["D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\auth\\login\\page.tsx"],d="/(account)/auth/login/page",p={require:t,loadChunk:()=>Promise.resolve()},x=new s.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/(account)/auth/login/page",pathname:"/auth/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},94353:(e,r,t)=>{Promise.resolve().then(t.bind(t,14173)),Promise.resolve().then(t.bind(t,39338))},35303:()=>{},14173:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>h});var s=t(53854),o=t(40124),n=t(77141),a=t(36391),i=t(29167),l=t(54317),c=t(30472),u=t(34218),d=t(51018),p=t(74211),x=t(75548),m=t.n(x);let h=()=>{let{setLogin:e,setSession:r}=(0,p.a)(),[t,x]=(0,u.useState)(!1),h=(0,d.useRouter)(),g=(0,n.TA)({initialValues:{email_or_phone_no:"",password:""},validationSchema:a.Ry({email_or_phone_no:a.Z_().required("Email or phone is required"),password:a.Z_().required("Password is required")}),onSubmit:async t=>{try{x(!0);let s={...t,user_role:"1",session_id:new Date().getTime().toString()},o=await i.x4(s);if(o&&200===o.status){c.Am.success("Login successful");let t=o.user_id;e(t),r(s.session_id),h.replace("/")}else c.Am.success("Login failed");x(!1)}catch(e){console.log(e),x(!1),e.response?.status===409?c.Am.error("Invalid credentials"):c.Am.error("Something went wrong")}}});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("form",{autoComplete:"off",className:"flex flex-col gap-5 w-full max-w-md px-5",onSubmit:g.handleSubmit,children:[s.jsx(l.Z,{onChange:g.handleChange,value:g.values.email_or_phone_no,type:"text",name:"email_or_phone_no",placeholder:"Email or Phone Number",onBlur:g.handleBlur,error:g.errors.email_or_phone_no&&g.touched.email_or_phone_no?g.errors.email_or_phone_no:"",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),s.jsx(l.Z,{onChange:g.handleChange,value:g.values.password,type:"password",name:"password",placeholder:"Password",onBlur:g.handleBlur,error:g.errors.password&&g.touched.password?g.errors.password:"",className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),s.jsx("div",{className:"flex justify-between items-center gap-5",children:(0,s.jsxs)(m(),{href:"/auth/signup",className:"text-blue-950 ",children:["Don't have an account?"," ",s.jsx("span",{className:"font-bold",children:"Create Account"})]})}),s.jsx(o.A,{isLoading:t,type:"submit",className:"p-6 w-full text-white bg-violet-600 rounded-[96.709px]",children:"Login"})]}),(0,s.jsxs)("div",{className:"flex flex-col gap-5 w-full max-w-md ",children:[(0,s.jsxs)("div",{className:"flex items-center justify-center",children:[s.jsx("hr",{className:"w-full border-1 border-gray-400"}),s.jsx("span",{className:"text-sm font-medium text-black p-2",children:"OR"}),s.jsx("hr",{className:"w-full border-1 border-gray-400"})]}),s.jsx("div",{className:"flex justify-center",children:s.jsx(o.A,{className:"w-10 h-10 ",children:"Google"})})]})]})}},39338:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var s=t(53854),o=t(410);t(34218);let n=()=>s.jsx(s.Fragment,{children:s.jsx("div",{className:"absolute w-full flex justify-end right-3 top-3",children:s.jsx("button",{onClick:()=>{window.location.href="/"},children:s.jsx(o.Z,{width:25})})})})},403:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>d});var s=t(4656);t(3542);var o=t(95153);let n=(0,o.createProxy)(String.raw`D:\Project\Test\SkinWebApp_frontend\components\Auth\LoginForm.tsx`),{__esModule:a,$$typeof:i}=n,l=n.default;var c=t(55436);let u=async()=>(0,s.jsxs)(s.Fragment,{children:[s.jsx(c.ZP,{}),(0,s.jsxs)("div",{className:"w-full h-screen flex flex-col items-center justify-center",children:[s.jsx("h1",{className:"text-black text-xl font-bold",children:"Login to your account"}),s.jsx("div",{className:"w-full flex flex-col gap-5 max-w-sm mt-5",children:s.jsx(l,{})})]})]}),d=u},15211:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(4656);t(3542);let o=({children:e})=>s.jsx(s.Fragment,{children:s.jsx(s.Fragment,{children:s.jsx("div",{className:"bg-gradient-to-r from-[#9DEAF4]  to-[#F0936C] min-h-screen",children:e})})})},55436:(e,r,t)=>{"use strict";t.d(r,{ZP:()=>l});var s=t(95153);let o=(0,s.createProxy)(String.raw`D:\Project\Test\SkinWebApp_frontend\components\common\CloseButton.tsx`),{__esModule:n,$$typeof:a}=o,i=o.default,l=i}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[271,250,789],()=>t(62762));module.exports=s})();