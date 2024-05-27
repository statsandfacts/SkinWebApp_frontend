"use strict";exports.id=859,exports.ids=[859],exports.modules={16859:(e,n,t)=>{t.d(n,{fromIni:()=>b});var r=t(98071),i=t(39418);let o=(e,n)=>{let r={EcsContainer:e=>t.e(732).then(t.bind(t,86732)).then(({fromContainerMetadata:n})=>n(e)),Ec2InstanceMetadata:e=>t.e(732).then(t.bind(t,86732)).then(({fromInstanceMetadata:n})=>n(e)),Environment:e=>t.e(307).then(t.bind(t,71307)).then(({fromEnv:n})=>n(e))};if(e in r)return r[e];throw new i.m(`Unsupported credential source in profile ${n}. Got ${e}, expected EcsContainer or Ec2InstanceMetadata or Environment.`)},s=e=>!!e&&"object"==typeof e&&"string"==typeof e.role_arn&&["undefined","string"].indexOf(typeof e.role_session_name)>-1&&["undefined","string"].indexOf(typeof e.external_id)>-1&&["undefined","string"].indexOf(typeof e.mfa_serial)>-1&&(a(e)||l(e)),a=e=>"string"==typeof e.source_profile&&void 0===e.credential_source,l=e=>"string"==typeof e.credential_source&&void 0===e.source_profile,d=async(e,n,s,a={})=>{s.logger?.debug("@aws-sdk/credential-provider-ini","resolveAssumeRoleCredentials (STS)");let l=n[e];if(!s.roleAssumer){let{getDefaultRoleAssumer:e}=await t.e(530).then(t.bind(t,4530));s.roleAssumer=e({...s.clientConfig,credentialProviderLogger:s.logger,parentClientConfig:s?.parentClientConfig},s.clientPlugins)}let{source_profile:d}=l;if(d&&d in a)throw new i.m(`Detected a cycle attempting to resolve credentials for profile ${(0,r.Jl)(s)}. Profiles visited: `+Object.keys(a).join(", "),!1);let c=d?m(d,n,s,{...a,[d]:!0}):(await o(l.credential_source,e)(s))(),f={RoleArn:l.role_arn,RoleSessionName:l.role_session_name||`aws-sdk-js-${Date.now()}`,ExternalId:l.external_id,DurationSeconds:parseInt(l.duration_seconds||"3600",10)},{mfa_serial:_}=l;if(_){if(!s.mfaCodeProvider)throw new i.m(`Profile ${e} requires multi-factor authentication, but no MFA code callback was provided.`,!1);f.SerialNumber=_,f.TokenCode=await s.mfaCodeProvider(_)}let g=await c;return s.roleAssumer(g,f)},c=e=>!!e&&"object"==typeof e&&"string"==typeof e.credential_process,f=async(e,n)=>t.e(25).then(t.bind(t,45025)).then(({fromProcess:t})=>t({...e,profile:n})()),_=async(e,n={})=>{let{fromSSO:r}=await t.e(167).then(t.bind(t,40167));return r({profile:e,logger:n.logger})()},g=e=>e&&("string"==typeof e.sso_start_url||"string"==typeof e.sso_account_id||"string"==typeof e.sso_session||"string"==typeof e.sso_region||"string"==typeof e.sso_role_name),p=e=>!!e&&"object"==typeof e&&"string"==typeof e.aws_access_key_id&&"string"==typeof e.aws_secret_access_key&&["undefined","string"].indexOf(typeof e.aws_session_token)>-1,u=(e,n)=>(n?.logger?.debug("@aws-sdk/credential-provider-ini","resolveStaticCredentials"),Promise.resolve({accessKeyId:e.aws_access_key_id,secretAccessKey:e.aws_secret_access_key,sessionToken:e.aws_session_token,credentialScope:e.aws_credential_scope})),y=e=>!!e&&"object"==typeof e&&"string"==typeof e.web_identity_token_file&&"string"==typeof e.role_arn&&["undefined","string"].indexOf(typeof e.role_session_name)>-1,w=async(e,n)=>t.e(925).then(t.bind(t,34925)).then(({fromTokenFile:t})=>t({webIdentityTokenFile:e.web_identity_token_file,roleArn:e.role_arn,roleSessionName:e.role_session_name,roleAssumerWithWebIdentity:n.roleAssumerWithWebIdentity,logger:n.logger,parentClientConfig:n.parentClientConfig})()),m=async(e,n,t,r={})=>{let o=n[e];if(Object.keys(r).length>0&&p(o))return u(o,t);if(s(o))return d(e,n,t,r);if(p(o))return u(o,t);if(y(o))return w(o,t);if(c(o))return f(t,e);if(g(o))return await _(e,t);throw new i.m(`Profile ${e} could not be found or parsed in shared credentials file.`)},b=(e={})=>async()=>{e.logger?.debug("@aws-sdk/credential-provider-ini","fromIni");let n=await (0,r.MX)(e);return m((0,r.Jl)(e),n,e)}}};