"use strict";exports.id=925,exports.ids=[925],exports.modules={34925:(e,n,i)=>{i.r(n),i.d(n,{fromTokenFile:()=>s,fromWebToken:()=>t});var o=i(39418),r=i(57147);let t=e=>async()=>{e.logger?.debug("@aws-sdk/credential-provider-web-identity","fromWebToken");let{roleArn:n,roleSessionName:o,webIdentityToken:r,providerId:t,policyArns:s,policy:d,durationSeconds:l}=e,{roleAssumerWithWebIdentity:a}=e;if(!a){let{getDefaultRoleAssumerWithWebIdentity:n}=await i.e(530).then(i.bind(i,4530));a=n({...e.clientConfig,credentialProviderLogger:e.logger,parentClientConfig:e.parentClientConfig},e.clientPlugins)}return a({RoleArn:n,RoleSessionName:o??`aws-sdk-js-session-${Date.now()}`,WebIdentityToken:r,ProviderId:t,PolicyArns:s,Policy:d,DurationSeconds:l})},s=(e={})=>async()=>{e.logger?.debug("@aws-sdk/credential-provider-web-identity","fromTokenFile");let n=e?.webIdentityTokenFile??process.env.AWS_WEB_IDENTITY_TOKEN_FILE,i=e?.roleArn??process.env.AWS_ROLE_ARN,s=e?.roleSessionName??process.env.AWS_ROLE_SESSION_NAME;if(!n||!i)throw new o.m("Web identity configuration not specified");return t({...e,webIdentityToken:(0,r.readFileSync)(n,{encoding:"ascii"}),roleArn:i,roleSessionName:s})()}}};