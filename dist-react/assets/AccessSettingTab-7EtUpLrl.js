import{r as u,u as f,j as e,F as b,a as t,b as c,c as l,d as r,e as i,I as x,B as h}from"./index-bC756Pjy.js";import{o as p,b as o,s as j,t as y}from"./index-LAbyUkC8.js";import{S as d}from"./separator-BM9p72Io.js";const A=p({enableAccessEvents:o().default(!0),enableMultiVisitPassRemoval:o().default(!0),grantFacilityAccess:o().default(!0),forgotAccessMediaLimit:j().default("3"),allowFacilityAccessExceedLimit:o().default(!1),enablePassbackWarnings:o().default(!0),warningPeriod:j().default("3"),allowFacilityAccessPassback:o().default(!1),enablePassbackWarningsMultiVisit:o().default(!1),enableAnonymousGroupAccess:o().default(!1),enableGroupAccessOrganizations:o().default(!0),enableGroupAccessMembers:o().default(!0)});function N(){const[m]=u.useState(!1),a=f({resolver:y(A),defaultValues:{enableAccessEvents:!0,enableMultiVisitPassRemoval:!0,grantFacilityAccess:!0,forgotAccessMediaLimit:"3",allowFacilityAccessExceedLimit:!1,enablePassbackWarnings:!0,warningPeriod:"3",allowFacilityAccessPassback:!1,enablePassbackWarningsMultiVisit:!1,enableAnonymousGroupAccess:!1,enableGroupAccessOrganizations:!0,enableGroupAccessMembers:!0}});async function g(n){}return e.jsx(b,{...a,children:e.jsxs("form",{onSubmit:a.handleSubmit(g),className:"space-y-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx(t,{control:a.control,name:"enableAccessEvents",render:({field:n})=>e.jsxs(c,{children:[e.jsx(l,{children:"General Settings"}),e.jsx(t,{control:a.control,name:"enableAccessEvents",render:()=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:n.value,onCheckedChange:n.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable saving of access events with no recorded entry"})]})}),e.jsx(t,{control:a.control,name:"enableMultiVisitPassRemoval",render:({field:s})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:s.value,onCheckedChange:s.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable removal of a Multi-Visit Pass use when saving an access event with no recorded entry"})]})})]})}),e.jsx(d,{}),e.jsxs(c,{children:[e.jsx(l,{children:"Access Profile Settings"}),e.jsx(t,{control:a.control,name:"grantFacilityAccess",render:({field:n})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:n.value,onCheckedChange:n.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Grant facility access automatically when a membership type or guest pass does not specify an access profile"})]})})]}),e.jsx(d,{}),e.jsx(t,{control:a.control,name:"forgotAccessMediaLimit",render:({field:n})=>e.jsxs(c,{children:[e.jsx(l,{children:"Forgot Access Media Settings"}),e.jsxs("div",{children:[e.jsx(l,{className:"text-sm",children:"Forgot Access Media Limit"}),e.jsx(t,{control:a.control,name:"forgotAccessMediaLimit",render:({field:s})=>e.jsx(c,{className:"col-span-3",children:e.jsx(r,{children:e.jsx(x,{...s,className:"w-20"})})})})]}),e.jsx(t,{control:a.control,name:"allowFacilityAccessExceedLimit",render:({field:s})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:s.value,onCheckedChange:s.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Allow facility access if member exceeds limit"})]})}),e.jsx(h,{variant:"outline",type:"button",className:"w-fit",children:"Reset All Forgotten Media Counts"})]})}),e.jsx(d,{}),e.jsxs(c,{children:[e.jsx(l,{children:"Group Access"}),e.jsx(t,{control:a.control,name:"enableAnonymousGroupAccess",render:({field:n})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:n.value,onCheckedChange:n.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable anonymous group access"})]})}),e.jsx(t,{control:a.control,name:"enableGroupAccessOrganizations",render:({field:n})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:n.value,onCheckedChange:n.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable group access for organizations"})]})}),e.jsx(t,{control:a.control,name:"enableGroupAccessMembers",render:({field:n})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:n.value,onCheckedChange:n.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable group access for members"})]})})]}),e.jsx(d,{}),e.jsx(t,{control:a.control,name:"passbackSettings",render:({field:n})=>e.jsxs(c,{children:[e.jsx(l,{children:"Passback Settings"}),e.jsx(t,{control:a.control,name:"enablePassbackWarnings",render:({field:s})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:s.value,onCheckedChange:s.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable passback warnings"})]})}),e.jsxs("div",{className:"grid grid-cols-4 items-center gap-4",children:[e.jsx(l,{className:"text-sm",children:"Warning period (in minutes)"}),e.jsx(t,{control:a.control,name:"warningPeriod",render:({field:s})=>e.jsx(c,{className:"col-span-3",children:e.jsx(r,{children:e.jsx(x,{...s,className:"w-20"})})})})]}),e.jsx(t,{control:a.control,name:"allowFacilityAccessPassback",render:({field:s})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:s.value,onCheckedChange:s.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Allow facility access if passback is detected"})]})}),e.jsx(t,{control:a.control,name:"enablePassbackWarningsMultiVisit",render:({field:s})=>e.jsxs(c,{className:"flex items-start space-x-3 space-y-0",children:[e.jsx(r,{children:e.jsx(i,{checked:s.value,onCheckedChange:s.onChange})}),e.jsx(l,{className:"font-normal leading-tight",children:"Enable passback warnings for Multi-Visit Passes"})]})})]})})]}),e.jsx("div",{className:"flex space-x-4",children:e.jsx(h,{type:"submit",disabled:m,children:m?"Saving...":"Save Settings"})})]})})}export{N as default};
