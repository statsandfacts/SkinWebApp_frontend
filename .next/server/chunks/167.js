"use strict";exports.id=167,exports.ids=[167],exports.modules={40167:(e,s,t)=>{t.d(s,{fromSSO:()=>k});var o=t(39418),i=t(98071);let r=e=>e&&("string"==typeof e.sso_start_url||"string"==typeof e.sso_account_id||"string"==typeof e.sso_session||"string"==typeof e.sso_region||"string"==typeof e.sso_role_name);var n=t(20857);class a extends n.k{constructor(e,s=!0){super(e,s),this.tryNextLink=s,this.name="TokenProviderError",Object.setPrototypeOf(this,a.prototype)}}let l="To refresh this SSO session run 'aws sso login' with the corresponding profile.",c={},w=async e=>{let{SSOOIDCClient:s}=await t.e(688).then(t.bind(t,31688));if(c[e])return c[e];let o=new s({region:e});return c[e]=o,o},f=async(e,s)=>{let{CreateTokenCommand:o}=await t.e(688).then(t.bind(t,31688)),i=await w(s);return i.send(new o({clientId:e.clientId,clientSecret:e.clientSecret,refreshToken:e.refreshToken,grantType:"refresh_token"}))},h=e=>{if(e.expiration&&e.expiration.getTime()<Date.now())throw new a(`Token is expired. ${l}`,!1)},d=(e,s,t=!1)=>{if(void 0===s)throw new a(`Value not present for '${e}' in SSO Token${t?". Cannot refresh":""}. ${l}`,!1)};var g=t(57147);let{writeFile:u}=g.promises,p=(e,s)=>{let t=(0,i.Py)(e),o=JSON.stringify(s,null,2);return u(t,o)},S=new Date(0),m=(e={})=>async()=>{let s;e.logger?.debug("@aws-sdk/token-providers","fromSso");let t=await (0,i.MX)(e),o=(0,i.Jl)(e),r=t[o];if(r){if(!r.sso_session)throw new a(`Profile '${o}' is missing required property 'sso_session'.`)}else throw new a(`Profile '${o}' could not be found in shared credentials file.`,!1);let n=r.sso_session,c=await (0,i.G)(e),w=c[n];if(!w)throw new a(`Sso session '${n}' could not be found in shared credentials file.`,!1);for(let e of["sso_start_url","sso_region"])if(!w[e])throw new a(`Sso session '${n}' is missing required property '${e}'.`,!1);w.sso_start_url;let g=w.sso_region;try{s=await (0,i.gH)(n)}catch(e){throw new a(`The SSO session token associated with profile=${o} was not found or is invalid. ${l}`,!1)}d("accessToken",s.accessToken),d("expiresAt",s.expiresAt);let{accessToken:u,expiresAt:m}=s,_={token:u,expiration:new Date(m)};if(_.expiration.getTime()-Date.now()>3e5)return _;if(Date.now()-S.getTime()<3e4)return h(_),_;d("clientId",s.clientId,!0),d("clientSecret",s.clientSecret,!0),d("refreshToken",s.refreshToken,!0);try{S.setTime(Date.now());let e=await f(s,g);d("accessToken",e.accessToken),d("expiresIn",e.expiresIn);let t=new Date(Date.now()+1e3*e.expiresIn);try{await p(n,{...s,accessToken:e.accessToken,expiresAt:t.toISOString(),refreshToken:e.refreshToken})}catch(e){}return{token:e.accessToken,expiration:t}}catch(e){return h(_),_}},_=async({ssoStartUrl:e,ssoSession:s,ssoAccountId:r,ssoRegion:n,ssoRoleName:a,ssoClient:l,clientConfig:c,profile:w})=>{let f,h;let d="To refresh this SSO session run aws sso login with the corresponding profile.";if(s)try{let e=await m({profile:w})();f={accessToken:e.token,expiresAt:new Date(e.expiration).toISOString()}}catch(e){throw new o.m(e.message,!1)}else try{f=await (0,i.gH)(e)}catch(e){throw new o.m(`The SSO session associated with this profile is invalid. ${d}`,!1)}if(new Date(f.expiresAt).getTime()-Date.now()<=0)throw new o.m(`The SSO session associated with this profile has expired. ${d}`,!1);let{accessToken:g}=f,{SSOClient:u,GetRoleCredentialsCommand:p}=await t.e(824).then(t.bind(t,5824)),S=l||new u(Object.assign({},c??{},{region:c?.region??n}));try{h=await S.send(new p({accountId:r,roleName:a,accessToken:g}))}catch(e){throw o.m.from(e,!1)}let{roleCredentials:{accessKeyId:_,secretAccessKey:T,sessionToken:k,expiration:y,credentialScope:x}={}}=h;if(!_||!T||!k||!y)throw new o.m("SSO returns an invalid temporary credential.",!1);return{accessKeyId:_,secretAccessKey:T,sessionToken:k,expiration:new Date(y),credentialScope:x}},T=e=>{let{sso_start_url:s,sso_account_id:t,sso_region:i,sso_role_name:r}=e;if(!s||!t||!i||!r)throw new o.m(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(e).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`,!1);return e},k=(e={})=>async()=>{e.logger?.debug("@aws-sdk/credential-provider-sso","fromSSO");let{ssoStartUrl:s,ssoAccountId:t,ssoRegion:n,ssoRoleName:a,ssoSession:l}=e,{ssoClient:c}=e,w=(0,i.Jl)(e);if(s||t||n||a||l){if(s&&t&&n&&a)return _({ssoStartUrl:s,ssoSession:l,ssoAccountId:t,ssoRegion:n,ssoRoleName:a,ssoClient:c,clientConfig:e.clientConfig,profile:w});throw new o.m('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"')}{let t=await (0,i.MX)(e),a=t[w];if(!a)throw new o.m(`Profile ${w} was not found.`);if(!r(a))throw new o.m(`Profile ${w} is not configured with SSO credentials.`);if(a?.sso_session){let t=await (0,i.G)(e),r=t[a.sso_session],l=` configurations in profile ${w} and sso-session ${a.sso_session}`;if(n&&n!==r.sso_region)throw new o.m("Conflicting SSO region"+l,!1);if(s&&s!==r.sso_start_url)throw new o.m("Conflicting SSO start_url"+l,!1);a.sso_region=r.sso_region,a.sso_start_url=r.sso_start_url}let{sso_start_url:l,sso_account_id:f,sso_region:h,sso_role_name:d,sso_session:g}=T(a);return _({ssoStartUrl:l,ssoSession:g,ssoAccountId:f,ssoRegion:h,ssoRoleName:d,ssoClient:c,clientConfig:e.clientConfig,profile:w})}}}};