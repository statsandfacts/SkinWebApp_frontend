"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[411],{4987:function(e,t,a){a.d(t,{UX3:function(){return i},Wnn:function(){return h},eqj:function(){return m},ku8:function(){return u},vSB:function(){return y},zmf:function(){return l}});var r=a(810),n=a(3062);a(4803);var o=a(8229),s=a(2241),c=a(7704),d=a(7175);let i=async(e,t)=>{let a;let r=(0,n.cu)(e,t),s=(0,o.UI)({},U,{[eM]:e[eu]});r.bp("/"),r.p("Bucket",()=>e.Bucket,"{Bucket}",!1);let c=(0,o.UI)({[eO]:[,""]});return r.m("GET").h(s).q(c).b(a),r.build()},u=async(e,t)=>{let a;let r=(0,n.cu)(e,t),s=(0,o.UI)({},U,{[eW]:e[ea],[eJ]:e[ec],[eK]:[()=>U(e[j]),()=>e[j].toString()],[eP]:e[V]});r.bp("/{Key+}"),r.p("Bucket",()=>e.Bucket,"{Bucket}",!1),r.p("Key",()=>e.Key,"{Key+}",!0);let c=(0,o.UI)({[te]:[,"DeleteObject"],[ef]:[,e[ez]]});return r.m("DELETE").h(s).q(c).b(a),r.build()},l=async(e,t)=>{let a;let r=(0,n.cu)(e,t),s=(0,o.UI)({},U,{[eB]:e[W]||"application/octet-stream",[ej]:e[A],[eg]:e[q],[eC]:e[L],[eS]:e[R],[eI]:e[P],[eE]:[()=>U(e[Y]),()=>e[Y].toString()],[ev]:e[D],[eQ]:e[T],[eN]:e[$],[eT]:e[M],[eq]:e[G],[e$]:e[H],[eU]:[()=>U(e[F]),()=>(0,o._w)(e[F]).toString()],[eY]:e[Z],[eD]:e[Q],[eG]:e[ee],[eH]:e[et],[e0]:e[el],[eZ]:e[ei],[e9]:e[ep],[e5]:e[em],[e4]:e[ey],[e8]:e[eh],[e3]:e[ew],[e1]:e[eb],[e2]:[()=>U(e[K]),()=>e[K].toString()],[eJ]:e[ec],[e7]:e[ek],[eF]:e[en],[eV]:[()=>U(e[eo]),()=>(e[eo].toISOString().split(".")[0]+"Z").toString()],[e_]:e[er],[eP]:e[V],...void 0!==e.Metadata&&Object.keys(e.Metadata).reduce((t,a)=>(t[`x-amz-meta-${a.toLowerCase()}`]=e.Metadata[a],t),{})});r.bp("/{Key+}"),r.p("Bucket",()=>e.Bucket,"{Bucket}",!1),r.p("Key",()=>e.Key,"{Key+}",!0);let c=(0,o.UI)({[te]:[,"PutObject"]});return void 0!==e.Body&&(a=e.Body),r.m("PUT").h(s).q(c).b(a),r.build()},m=async(e,t)=>{if(200!==e.statusCode&&e.statusCode>=300)return b(e,t);let a=(0,o.UI)({$metadata:B(e)}),n=(0,o.CE)((0,o.Wh)(await (0,r.he)(e.body,t)),"body");return null!=n[N]&&(a[N]=v(n[N],t)),a},y=async(e,t)=>{if(204!==e.statusCode&&e.statusCode>=300)return b(e,t);let a=(0,o.UI)({$metadata:B(e),[_]:[()=>void 0!==e.headers[eL],()=>(0,o.gx)(e.headers[eL])],[ez]:[,e.headers[e6]],[es]:[,e.headers[eX]]});return await (0,o.Wg)(e.body,t),a},h=async(e,t)=>{if(200!==e.statusCode&&e.statusCode>=300)return b(e,t);let a=(0,o.UI)({$metadata:B(e),[J]:[,e.headers[eR]],[X]:[,e.headers[eA]],[$]:[,e.headers[eN]],[M]:[,e.headers[eT]],[G]:[,e.headers[eq]],[H]:[,e.headers[e$]],[el]:[,e.headers[e0]],[ez]:[,e.headers[e6]],[em]:[,e.headers[e5]],[eh]:[,e.headers[e8]],[ew]:[,e.headers[e3]],[eb]:[,e.headers[e1]],[K]:[()=>void 0!==e.headers[e2],()=>(0,o.gx)(e.headers[e2])],[es]:[,e.headers[eX]]});return await (0,o.Wg)(e.body,t),a},b=async(e,t)=>{let a={...e,body:await (0,r.OH)(e.body,t)},n=(0,r.Js)(e,a.body);switch(n){case"NoSuchUpload":case"com.amazonaws.s3#NoSuchUpload":throw await C(a,t);case"ObjectNotInActiveTierError":case"com.amazonaws.s3#ObjectNotInActiveTierError":throw await E(a,t);case"BucketAlreadyExists":case"com.amazonaws.s3#BucketAlreadyExists":throw await x(a,t);case"BucketAlreadyOwnedByYou":case"com.amazonaws.s3#BucketAlreadyOwnedByYou":throw await k(a,t);case"NoSuchBucket":case"com.amazonaws.s3#NoSuchBucket":throw await p(a,t);case"InvalidObjectState":case"com.amazonaws.s3#InvalidObjectState":throw await z(a,t);case"NoSuchKey":case"com.amazonaws.s3#NoSuchKey":throw await g(a,t);case"NotFound":case"com.amazonaws.s3#NotFound":throw await S(a,t);case"ObjectAlreadyInActiveTierError":case"com.amazonaws.s3#ObjectAlreadyInActiveTierError":throw await I(a,t);default:let o=a.body;return w({output:e,parsedBody:o,errorCode:n})}},w=(0,o.PC)(d.k),x=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.SH({$metadata:B(e),...a});return(0,o.to)(r,e.body)},k=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.M0({$metadata:B(e),...a});return(0,o.to)(r,e.body)},z=async(e,t)=>{let a=(0,o.UI)({}),r=e.body;null!=r[f]&&(a[f]=(0,o.pY)(r[f])),null!=r[ei]&&(a[ei]=(0,o.pY)(r[ei]));let n=new s.oN({$metadata:B(e),...a});return(0,o.to)(n,e.body)},p=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.mn({$metadata:B(e),...a});return(0,o.to)(r,e.body)},g=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.Yw({$metadata:B(e),...a});return(0,o.to)(r,e.body)},C=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.wi({$metadata:B(e),...a});return(0,o.to)(r,e.body)},S=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.TX({$metadata:B(e),...a});return(0,o.to)(r,e.body)},I=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new c.T8({$metadata:B(e),...a});return(0,o.to)(r,e.body)},E=async(e,t)=>{let a=(0,o.UI)({});e.body;let r=new s.Vn({$metadata:B(e),...a});return(0,o.to)(r,e.body)},v=(e,t)=>{let a={};return null!=e[O]&&(a[O]=(0,o.pY)(e[O])),null!=e[ed]&&(a[ed]=(0,o.pY)(e[ed])),null!=e[ex]&&(a[ex]=(0,o.pY)(e[ex])),null!=e[J]&&(a[J]=(0,o.CE)((0,o.aH)(e[J]))),a},B=e=>({httpStatusCode:e.statusCode,requestId:e.headers["x-amzn-requestid"]??e.headers["x-amzn-request-id"]??e.headers["x-amz-request-id"],extendedRequestId:e.headers["x-amz-id-2"],cfId:e.headers["x-amz-cf-id"]}),U=e=>null!=e&&""!==e&&(!Object.getOwnPropertyNames(e).includes("length")||0!=e.length)&&(!Object.getOwnPropertyNames(e).includes("size")||0!=e.size),A="ACL",O="AccessKeyId",f="AccessTier",j="BypassGovernanceRetention",K="BucketKeyEnabled",N="Credentials",T="ChecksumAlgorithm",q="CacheControl",$="ChecksumCRC32",M="ChecksumCRC32C",L="ContentDisposition",R="ContentEncoding",P="ContentLanguage",Y="ContentLength",D="ContentMD5",G="ChecksumSHA1",H="ChecksumSHA256",W="ContentType",_="DeleteMarker",F="Expires",V="ExpectedBucketOwner",X="ETag",J="Expiration",Z="GrantFullControl",Q="GrantRead",ee="GrantReadACP",et="GrantWriteACP",ea="MFA",er="ObjectLockLegalHoldStatus",en="ObjectLockMode",eo="ObjectLockRetainUntilDate",es="RequestCharged",ec="RequestPayer",ed="SecretAccessKey",ei="StorageClass",eu="SessionMode",el="ServerSideEncryption",em="SSECustomerAlgorithm",ey="SSECustomerKey",eh="SSECustomerKeyMD5",eb="SSEKMSEncryptionContext",ew="SSEKMSKeyId",ex="SessionToken",ek="Tagging",ez="VersionId",ep="WebsiteRedirectLocation",eg="cache-control",eC="content-disposition",eS="content-encoding",eI="content-language",eE="content-length",ev="content-md5",eB="content-type",eU="expires",eA="etag",eO="session",ef="versionId",ej="x-amz-acl",eK="x-amz-bypass-governance-retention",eN="x-amz-checksum-crc32",eT="x-amz-checksum-crc32c",eq="x-amz-checksum-sha1",e$="x-amz-checksum-sha256",eM="x-amz-create-session-mode",eL="x-amz-delete-marker",eR="x-amz-expiration",eP="x-amz-expected-bucket-owner",eY="x-amz-grant-full-control",eD="x-amz-grant-read",eG="x-amz-grant-read-acp",eH="x-amz-grant-write-acp",eW="x-amz-mfa",e_="x-amz-object-lock-legal-hold",eF="x-amz-object-lock-mode",eV="x-amz-object-lock-retain-until-date",eX="x-amz-request-charged",eJ="x-amz-request-payer",eZ="x-amz-storage-class",eQ="x-amz-sdk-checksum-algorithm",e0="x-amz-server-side-encryption",e3="x-amz-server-side-encryption-aws-kms-key-id",e2="x-amz-server-side-encryption-bucket-key-enabled",e1="x-amz-server-side-encryption-context",e5="x-amz-server-side-encryption-customer-algorithm",e4="x-amz-server-side-encryption-customer-key",e8="x-amz-server-side-encryption-customer-key-md5",e7="x-amz-tagging",e6="x-amz-version-id",e9="x-amz-website-redirect-location",te="x-id"}}]);