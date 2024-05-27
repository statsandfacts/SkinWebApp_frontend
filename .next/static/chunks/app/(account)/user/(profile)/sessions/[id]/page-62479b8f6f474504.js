(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9875],{1253:function(e,t,n){Promise.resolve().then(n.bind(n,2704)),Promise.resolve().then(n.bind(n,754))},3025:function(e,t,n){"use strict";var s=n(7437),a=n(795);n(2265),t.Z=()=>(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("div",{className:"w-full space-y-5 p-4 shadow-none",children:[(0,s.jsx)("div",{className:"w-full flex items-center gap-3 justify-around",children:(0,s.jsxs)("div",{className:"w-full flex flex-col gap-2",children:[(0,s.jsx)(a.X,{className:"h-3 w-3/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"})]})}),(0,s.jsxs)("div",{className:"flex gap-3",children:[(0,s.jsx)(a.X,{className:"flex w-28 h-28"}),(0,s.jsx)(a.X,{className:"flex w-28 h-28"})]}),(0,s.jsxs)("div",{className:"w-full flex flex-col gap-2",children:[(0,s.jsx)(a.X,{className:"h-3 w-3/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"}),(0,s.jsx)(a.X,{className:"h-3 w-4/5 rounded-lg"})]})]})})},2704:function(e,t,n){"use strict";n.r(t);var s=n(7437),a=n(6691),r=n.n(a),l=n(2853),o=n(9484),i=n(6898),c=n(3025);t.default=e=>{let{id:t}=e,{user:n,userDetails:a}=(0,i.a)(),{data:d,isLoading:u,error:f}=(0,l.ZP)(t&&n?["/case/case-report",t]:null,()=>o.dd(t),{shouldRetryOnError:!1}),p=(null==d?void 0:d.question_answers)&&(null==d?void 0:d.question_answers[0]),m=[];p&&Object.keys(p).forEach(e=>{m.push(e)});let{data:x,isLoading:h}=(0,l.ZP)(d&&t&&n?["/case/questions",m]:null,()=>o.CC({question_ids:m})),g=[];return p&&Object.entries(p).forEach(e=>{let[t,n]=e;(function(e,t,n){let s=null==n?void 0:n.find(t=>t.question_id===Number(e));if(!s)return;let a={question_label:null==s?void 0:s.question_type,value:t};g.push(a)})(t,n,null==x?void 0:x.question_details)}),(0,s.jsx)(s.Fragment,{children:h||u?(0,s.jsx)(c.Z,{}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"flex justify-around align-bottom gap-3 p-3 bg-gray-100 rounded-md",children:[(0,s.jsxs)("div",{className:"flex justify-center items-center flex-col",children:[(0,s.jsx)("span",{className:"text-gray-400 text-sm font-semibold",children:"Case id"}),(0,s.jsx)("span",{className:"text-sm ",children:t})]}),(0,s.jsxs)("div",{className:"flex justify-center items-center flex-col",children:[(0,s.jsx)("span",{className:"text-gray-400 text-sm font-semibold",children:"Patient Name"}),(0,s.jsx)("span",{className:"text-sm ",children:(null==a?void 0:a.first_name)+" "+(null==a?void 0:a.last_name)})]}),(0,s.jsxs)("div",{className:"flex justify-center items-center flex-col",children:[(0,s.jsx)("span",{className:"text-gray-400 text-sm font-semibold",children:"Dob"}),(0,s.jsx)("span",{className:"text-sm ",children:(null==a?void 0:a.dob)||"22/04/1997"})]})]}),f?(0,s.jsxs)("div",{className:"mt-5 flex items-center justify-center flex-col",children:[(0,s.jsx)(r(),{src:"/icons/wait.svg",width:500,height:500,alt:""}),(0,s.jsx)("span",{className:"text-green-500",children:"In Progress Please Wait"})]}):(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("div",{className:"mt-5",children:[(0,s.jsx)("h1",{className:"text-base font-semibold text-gray-800",children:"Uploaded Picture"}),(0,s.jsx)("div",{className:"flex mt-2 gap-3",children:(0,s.jsx)("div",{className:"flex flex-col justify-center align-middle p-1 bg-slate-200 rounded-md",children:null==d?void 0:d.image_path.map((e,t)=>(0,s.jsxs)("div",{children:[(0,s.jsx)("div",{children:(0,s.jsx)(r(),{src:e.name,width:100,height:150,alt:""})}),(0,s.jsx)("div",{className:"text-center",children:(0,s.jsx)("span",{className:"text-sm",children:e.value})})]},t))})})]}),(0,s.jsx)("div",{className:"mt-5",children:(0,s.jsx)("div",{className:"relative overflow-x-auto",children:(0,s.jsxs)("table",{className:'w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"',children:[(0,s.jsx)("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{scope:"col",className:"px-6 py-3",children:"Questions"}),(0,s.jsx)("th",{scope:"col",className:"px-6 py-3",children:"Answers"})]})}),(0,s.jsx)("tbody",{children:x&&(null==g?void 0:g.map((e,t)=>(0,s.jsxs)("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[(0,s.jsx)("td",{scope:"row",className:"px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.question_label}),(0,s.jsx)("td",{scope:"row",className:"px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.value})]},t)))})]})})})]})]})})}},754:function(e,t,n){"use strict";n.r(t);var s=n(7437),a=n(8197),r=n(4033);n(2265),t.default=e=>{let{title:t,desc:n,isBack:l,isMobileBack:o}=e,i=(0,r.useRouter)(),c=()=>{i.back()};return(0,s.jsxs)("div",{className:"",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[l&&(0,s.jsx)("button",{onClick:c,children:(0,s.jsx)(a.Z,{width:20})}),o&&(0,s.jsx)("button",{className:"md:hidden",onClick:c,children:(0,s.jsx)(a.Z,{width:20})}),(0,s.jsx)("h1",{className:"text-lg font-bold text-black",children:t})]}),(0,s.jsx)("span",{className:"text-xs",children:n})]})}},6898:function(e,t,n){"use strict";n.d(t,{a:function(){return i},d:function(){return o}});var s=n(7437),a=n(2265),r=n(605);let l=(0,a.createContext)({user:null,setLogin:()=>{},setLogout:()=>{},setSession:()=>{},userSession:null,isLoggedIn:!1,userDetails:null,userDetailsSet:()=>{}}),o=e=>{let{children:t}=e,[n,o]=(0,a.useState)(null),[i,c]=(0,a.useState)(null),[d,u]=(0,a.useState)(!1),[f,p]=(0,a.useState)(null),m=e=>{c(e),(0,r.qQ)("session",JSON.stringify(e))};return(0,a.useEffect)(()=>{let e=(0,r.$o)("user"),t=(0,r.$o)("session"),n=(0,r.$o)("isLoggedIn");if(n&&u(!0),e&&e.length>0){let t=JSON.parse(e);o(t)}if(t&&t.length>0){let e=JSON.parse(t);m(e)}},[d]),(0,s.jsx)(l.Provider,{value:{user:n,setLogin:e=>{o(e),(0,r.qQ)("user",JSON.stringify(e)),(0,r.qQ)("isLoggedIn",!0),u(!0)},setLogout:()=>{(0,r.dZ)("user"),o(null),(0,r.dZ)("session"),c(null),(0,r.dZ)("isLoggedIn"),u(!1),p(null)},setSession:m,userSession:i,isLoggedIn:d,userDetails:f,userDetailsSet:e=>{p(e)}},children:t})},i=()=>(0,a.useContext)(l)},679:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{unstable_getImgProps:function(){return i},default:function(){return c}});let s=n(817),a=n(7929),r=n(2637),l=n(413),o=s._(n(9950)),i=e=>{(0,r.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,a.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,n]of Object.entries(t))void 0===n&&delete t[e];return{props:t}},c=l.Image},6304:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return r}});let s=n(817),a=s._(n(2265)),r=a.default.createContext(null)},9484:function(e,t,n){"use strict";n.d(t,{lF:function(){return r},Xk:function(){return i},X5:function(){return p},ge:function(){return g},dd:function(){return h},xY:function(){return x},Qn:function(){return c},CC:function(){return u},LN:function(){return m},PR:function(){return o},x4:function(){return l},BN:function(){return f},hL:function(){return d}});var s=n(2173);let a="https://www.nextcare.life:8000/api/v1/",r=async e=>{let{data:t}=await s.Z.post(a+"users/create-user",e,{headers:{"Content-Type":"application/json"}});return t},l=async e=>{let{data:t}=await s.Z.post(a+"users/user-login",e,{headers:{"Content-Type":"application/json"}});return t},o=async e=>{let{data:t}=await s.Z.get(a+"users/get-user?user_id=".concat(e),{headers:{"Content-Type":"application/json"}});return t},i=async e=>{try{let{data:t}=await s.Z.put(a+"users/update-user",e,{headers:{"Content-Type":"application/json"}});return t}catch(e){console.log(e)}},c=async()=>{try{let{data:e}=await s.Z.get(a+"level_value_mapping/view_key_criteria",{headers:{"Content-Type":"application/json"}});return e}catch(e){if("ECONNABORTED"===e.code)throw Error("timeout");throw e}},d=async e=>{try{let{data:t}=await s.Z.get(a+"records/show_records?key_combination="+e,{headers:{"Content-Type":"application/json"}});return t}catch(e){if(console.log(e),"ECONNABORTED"===e.code)throw console.log("timeout"),Error("timeout")}},u=async e=>{try{let{data:t}=await s.Z.post(a+"master_questionnaire/show_question_details",e,{headers:{"Content-Type":"application/json"}});return t}catch(e){console.log(e)}},f=async e=>{try{let{data:t}=await s.Z.post(a+"users/save-user-questionnaire",e,{headers:{"Content-Type":"application/json"}});return t}catch(e){console.log(e)}},p=async e=>{try{let{data:t}=await s.Z.post(a+"case/create-case",e,{headers:{"Content-Type":"application/json"}});return t}catch(e){console.log(e)}},m=async e=>{let{data:t}=await s.Z.get(a+"users/patient_dashboard?user_id=".concat(e),{headers:{"Content-Type":"application/json"}});return t},x=async e=>{let{data:t}=await s.Z.get(a+"case/prescription?case_id=".concat(e),{headers:{"Content-Type":"application/json"}});return t},h=async e=>{let{data:t}=await s.Z.get(a+"case/case-report?case_id=".concat(e),{headers:{"Content-Type":"application/json"}});return t},g=async e=>{try{let{data:t}=await s.Z.post(a+"users/send_otp",e,{headers:{"Content-Type":"application/json"}});return t}catch(e){console.log(e)}}},605:function(e,t,n){"use strict";n.d(t,{$o:function(){return a},dZ:function(){return r},qQ:function(){return s}});let s=(e,t)=>{try{{let n=JSON.stringify(t);localStorage.setItem(e,n)}}catch(e){console.log(e)}},a=e=>{try{{let t=localStorage.getItem(e);if(!t||"undefined"===t)return null;let n=JSON.parse(t);return n}}catch(e){console.log(e)}},r=e=>{try{localStorage.removeItem(e)}catch(e){console.log(e)}}},6691:function(e,t,n){e.exports=n(679)},8197:function(e,t,n){"use strict";var s=n(2265);let a=s.forwardRef(function({title:e,titleId:t,...n},a){return s.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:a,"aria-labelledby":t},n),e?s.createElement("title",{id:t},e):null,s.createElement("path",{fillRule:"evenodd",d:"M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z",clipRule:"evenodd"}))});t.Z=a},795:function(e,t,n){"use strict";n.d(t,{X:function(){return d}});var s=n(7485),a=(0,n(6926).tv)({slots:{base:["group","relative","overflow-hidden","bg-content3 dark:bg-content2","before:opacity-100","before:absolute","before:inset-0","before:-translate-x-full","before:animate-[shimmer_2s_infinite]","before:border-t","before:border-content4/30","before:bg-gradient-to-r","before:from-transparent","before:via-content4","dark:before:via-default-700/10","before:to-transparent","after:opacity-100","after:absolute","after:inset-0","after:-z-10","after:bg-content3","dark:after:bg-content2","data-[loaded=true]:!bg-transparent","data-[loaded=true]:before:opacity-0 data-[loaded=true]:before:animate-none","data-[loaded=true]:after:opacity-0"],content:["opacity-0","group-data-[loaded=true]:opacity-100"]},variants:{disableAnimation:{true:{base:"before:transition-none",content:"transition-none"},false:{base:"transition-background !duration-300 before:transition-opacity before:!duration-300",content:"transition-opacity motion-reduce:transition-none !duration-300"}}},defaultVariants:{disableAnimation:!1}}),r=n(9762),l=n(8794),o=n(2265),i=n(7437),c=(0,s.Gp)((e,t)=>{let{Component:n,children:c,getSkeletonProps:d,getContentProps:u}=function(e){let[t,n]=(0,s.oe)(e,a.variantKeys),{as:i,children:c,isLoaded:d=!1,className:u,classNames:f,...p}=t,m=(0,o.useMemo)(()=>a({...n}),[...Object.values(n),c]),x=(0,r.W)(null==f?void 0:f.base,u);return{Component:i||"div",children:c,slots:m,classNames:f,getSkeletonProps:(e={})=>({"data-loaded":(0,l.PB)(d),className:m.base({class:(0,r.W)(x,null==e?void 0:e.className)}),...p}),getContentProps:(e={})=>({className:m.content({class:(0,r.W)(null==f?void 0:f.content,null==e?void 0:e.className)})})}}({...e});return(0,i.jsx)(n,{ref:t,...d(),children:(0,i.jsx)("div",{...u(),children:c})})});c.displayName="NextUI.Skeleton";var d=c}},function(e){e.O(0,[1104,2173,2853,413,2971,2472,1744],function(){return e(e.s=1253)}),_N_E=e.O()}]);