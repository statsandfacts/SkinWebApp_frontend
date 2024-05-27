(()=>{var e={};e.id=704,e.ids=[704],e.modules={55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},25528:e=>{"use strict";e.exports=require("next/dist\\client\\components\\action-async-storage.external.js")},91877:e=>{"use strict";e.exports=require("next/dist\\client\\components\\request-async-storage.external.js")},25319:e=>{"use strict";e.exports=require("next/dist\\client\\components\\static-generation-async-storage.external.js")},39491:e=>{"use strict";e.exports=require("assert")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},12781:e=>{"use strict";e.exports=require("stream")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},70236:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>x,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var s=r(67096),a=r(16132),l=r(37284),i=r.n(l),n=r(32564),o={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>n[e]);r.d(t,o);let d=["",{children:["(account)",{children:["user",{children:["(profile)",{children:["change-password",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,74523)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\user\\(profile)\\change-password\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,73269)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\user\\(profile)\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,36679)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\user\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,15211)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,15636)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\layout.tsx"],error:[()=>Promise.resolve().then(r.bind(r,38196)),"D:\\Project\\Test\\SkinWebApp_frontend\\app\\error.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9291,23)),"next/dist/client/components/not-found-error"]}],c=["D:\\Project\\Test\\SkinWebApp_frontend\\app\\(account)\\user\\(profile)\\change-password\\page.tsx"],u="/(account)/user/(profile)/change-password/page",x={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(account)/user/(profile)/change-password/page",pathname:"/user/change-password",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5306:(e,t,r)=>{Promise.resolve().then(r.bind(r,75468))},49459:(e,t,r)=>{Promise.resolve().then(r.bind(r,75434)),Promise.resolve().then(r.bind(r,95804))},18941:(e,t,r)=>{Promise.resolve().then(r.bind(r,23768))},35303:()=>{},75468:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(53854),a=r(74211),l=r(11204),i=r(51018),n=r(34218);let o=({children:e})=>{let t=(0,i.useRouter)(),{isLoggedIn:r}=(0,a.a)();return(0,n.useEffect)(()=>{let e=(0,l.$o)("isLoggedIn");r||e||t.replace("/auth/login")},[t,r]),s.jsx(s.Fragment,{children:e})}},75434:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(53854),a=r(74211),l=r(51018),i=r(34218),n=r(36391),o=r(29167),d=r(64349),c=r(77141),u=r(30472),x=r(40124),m=r(54317);let p=()=>{let e=(0,l.useRouter)(),[t,r]=(0,i.useState)(!1),{user:p,userSession:f}=(0,a.a)(),{data:h}=(0,d.ZP)(p?["/user/getUser",p]:null,()=>o.PR(p)),g=(0,c.TA)({enableReinitialize:!0,initialValues:{password:"",confirmPassword:""},validationSchema:n.Ry({password:n.Z_().required("Password Required"),confirmPassword:n.Z_().required("Confirm Password Required").oneOf([n.iH("password"),""],"Passwords must match")}),onSubmit:async t=>{({...t,...h,user_id:h?.user_id});try{r(!0);let s={...t,user_type:"patient",session_id:f,government_id:"",government_idtype:"",address:"",qualification:"",specialization:"",user_id:h?.user_id||""},{...a}=s,l=await o.Xk(a);l&&200===l.status?(u.Am.success("User created successfully"),e.back()):u.Am.error("Something went wrong"),r(!1)}catch(e){r(!1),e&&e.response&&e.response.data?u.Am.error(e.response.data.detail):u.Am.error("Something went wrong")}}});return s.jsx(s.Fragment,{children:s.jsx(s.Fragment,{children:(0,s.jsxs)("form",{autoComplete:"off",className:"flex flex-col gap-5 w-full max-w-md",onSubmit:g.handleSubmit,children:[s.jsx(m.Z,{onChange:g.handleChange,value:g.values.password,type:"password",name:"password",placeholder:"Password",error:g.errors.password&&g.touched.password?g.errors.password:null,onBlur:g.handleBlur,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),s.jsx(m.Z,{onChange:g.handleChange,value:g.values.confirmPassword,type:"password",name:"confirmPassword",placeholder:"Confirm Password",error:g.errors.confirmPassword&&g.touched.confirmPassword?g.errors.confirmPassword:null,onBlur:g.handleBlur,className:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}),s.jsx(x.A,{isLoading:t,type:"submit",className:"p-6 w-full text-white bg-violet-600 rounded-[96.709px]",children:"Update"})]})})})}},23768:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h});var s=r(53854),a=r(74211),l=r(34218);let i=l.forwardRef(function({title:e,titleId:t,...r},s){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?l.createElement("title",{id:t},e):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"}))}),n=l.forwardRef(function({title:e,titleId:t,...r},s){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?l.createElement("title",{id:t},e):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"}))});var o=r(45388);let d=l.forwardRef(function({title:e,titleId:t,...r},s){return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?l.createElement("title",{id:t},e):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"}))});var c=r(40124),u=r(29395),x=r(75548),m=r.n(x),p=r(51018),f=r(30472);let h=()=>{let{user:e,setLogout:t}=(0,a.a)(),r=(0,p.useRouter)(),l=(0,p.usePathname)();return s.jsx(s.Fragment,{children:s.jsx("div",{className:"flex flex-col w-full justify-start items-start self-stretch md:rounded-xl  md:overflow-hidden",children:(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start self-stretch gap-3 px-6 pb-6",children:[(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start self-stretch",children:[(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start self-stretch pt-2",children:[s.jsx("div",{className:"flex flex-col justify-start items-start self-stretch relative gap-1 pt-4 pb-1",children:s.jsx("p",{className:"flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-black/[0.64]",children:"Your Consultation"})}),s.jsx(m(),{href:"/user/sessions",className:(0,u.Z)("flex justify-between items-center self-stretch relative py-3  ",l.startsWith("/user/sessions")&&"text-red-500 "),children:(0,s.jsxs)("div",{className:"flex justify-start items-center relative gap-2",children:[s.jsx(i,{className:"w-7 md:w-5 h-7 md:h-5"}),s.jsx("p",{className:"flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize ",children:"Your Sessions"})]})})]}),(0,s.jsxs)("div",{className:"flex flex-col justify-start items-start self-stretch pt-2",children:[s.jsx("div",{className:"flex flex-col justify-start items-start self-stretch relative gap-1 pt-4 pb-1",children:s.jsx("p",{className:"flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-black/[0.64]",children:"My Profile"})}),s.jsx(m(),{href:"/user/edit-user",className:(0,u.Z)("flex justify-between items-center self-stretch relative py-3  ","/user/edit-user"===l&&"text-red-500 "),children:(0,s.jsxs)("div",{className:"flex justify-start items-center relative gap-2",children:[s.jsx(n,{className:"w-7 md:w-5 h-7 md:h-5 "}),s.jsx("p",{className:"flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize ",children:"Edit Profile"})]})}),s.jsx(m(),{href:"/user/change-password",className:"flex justify-between items-center self-stretch relative py-3",children:(0,s.jsxs)("div",{className:"flex justify-start items-center relative gap-2",children:[s.jsx(o.Z,{className:"w-7 md:w-5 h-7 md:h-5"}),s.jsx("p",{className:"flex-grow-0 flex-shrink-0 text-sm md:text-[13px] font-medium text-left capitalize ",children:"Change Password"})]})})]})]}),(0,s.jsxs)(c.A,{onClick:()=>{e&&(r.replace("/login"),f.Am.success("Logout successfully"),t())},className:"flex justify-center items-center w-full h-12 md:h-auto gap-2 px-6 py-3 md:py-2 rounded-2xl md:rounded-xl bg-black/[0.04] border-[1.33px] ",children:[s.jsx(d,{className:"w-7 md:w-5 h-7 md:h-5 "}),s.jsx("div",{className:" text-sm md:text-xs font-medium capitalize",children:"Logout"})]})]})})})}},95804:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(53854),a=r(34218);let l=a.forwardRef(function({title:e,titleId:t,...r},s){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:s,"aria-labelledby":t},r),e?a.createElement("title",{id:t},e):null,a.createElement("path",{fillRule:"evenodd",d:"M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z",clipRule:"evenodd"}))});var i=r(51018);let n=({title:e,desc:t,isBack:r,isMobileBack:a})=>{let n=(0,i.useRouter)(),o=()=>{n.back()};return(0,s.jsxs)("div",{className:"",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[r&&s.jsx("button",{onClick:o,children:s.jsx(l,{width:20})}),a&&s.jsx("button",{className:"md:hidden",onClick:o,children:s.jsx(l,{width:20})}),s.jsx("h1",{className:"text-lg font-bold text-black",children:e})]}),s.jsx("span",{className:"text-xs",children:t})]})}},15211:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(4656);r(3542);let a=({children:e})=>s.jsx(s.Fragment,{children:s.jsx(s.Fragment,{children:s.jsx("div",{className:"bg-gradient-to-r from-[#9DEAF4]  to-[#F0936C] min-h-screen",children:e})})})},74523:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var s=r(4656),a=r(95153);let l=(0,a.createProxy)(String.raw`D:\Project\Test\SkinWebApp_frontend\components\Auth\ChangePasswordForm.tsx`),{__esModule:i,$$typeof:n}=l,o=l.default;var d=r(3840);r(3542);let c=()=>(0,s.jsxs)("div",{className:"w-full h-full flex flex-col",children:[s.jsx(d.ZP,{title:"Change Password",desc:"",isBack:!1,isMobileBack:!0}),s.jsx("div",{className:"w-full flex flex-col gap-5 max-w-sm mt-5 pb-5",children:s.jsx(o,{})})]})},73269:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(4656),a=r(45938);r(3542);let l=({children:e})=>s.jsx("div",{className:"mt-5 md:mt-0 md:p-5",children:s.jsx("div",{className:"flex flex-col md:justify-start relative min-h-screen w-full md:px-10",children:s.jsx("div",{className:"bg-white px-3 rounded-md flex flex-col w-full self-stretch md:pt-6",children:(0,s.jsxs)("div",{className:"flex",children:[s.jsx("div",{className:"hidden md:flex flex-col self-stretch min-w-[280px] max-w-[280px]",children:s.jsx(a.ZP,{})}),s.jsx("div",{className:"flex flex-col self-stretch gap-6 md:gap-4 w-full mt-3 mb-10",children:e})]})})})})},36679:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var s=r(4656);r(3542);var a=r(95153);let l=(0,a.createProxy)(String.raw`D:\Project\Test\SkinWebApp_frontend\app\AuthProvider.tsx`),{__esModule:i,$$typeof:n}=l,o=l.default,d=({children:e})=>s.jsx(s.Fragment,{children:s.jsx(o,{children:s.jsx(s.Fragment,{children:e})})})},45938:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>o});var s=r(95153);let a=(0,s.createProxy)(String.raw`D:\Project\Test\SkinWebApp_frontend\components\user\MyProfile.tsx`),{__esModule:l,$$typeof:i}=a,n=a.default,o=n},3840:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>o});var s=r(95153);let a=(0,s.createProxy)(String.raw`D:\Project\Test\SkinWebApp_frontend\components\user\TitleHeader.tsx`),{__esModule:l,$$typeof:i}=a,n=a.default,o=n}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[271,250,789],()=>r(70236));module.exports=s})();