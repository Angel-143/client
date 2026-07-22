import{c as s,s as a}from"./index-T3XUD-2D.js";import{u as t}from"./useQuery-DYx-WAzs.js";/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=s("Zap",[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]]);function y(){return t({queryKey:["projects"],queryFn:async()=>{const{data:r,error:e}=await a.from("projects").select("*").order("created_at",{ascending:!1});if(e)throw e;return r}})}function d(){return t({queryKey:["projects","featured"],queryFn:async()=>{const{data:r,error:e}=await a.from("projects").select("*").eq("is_featured",!0).order("sales_count",{ascending:!1}).limit(6);if(e)throw e;return r}})}function f(r){return t({queryKey:["project",r],queryFn:async()=>{const{data:e,error:o}=await a.from("projects").select("*").eq("slug",r).maybeSingle();if(o)throw o;return e},enabled:!!r})}function l(){return t({queryKey:["categories"],queryFn:async()=>{const{data:r,error:e}=await a.from("categories").select("*").order("name");if(e)throw e;return r}})}export{u as D,i as Z,l as a,y as b,f as c,d as u};
