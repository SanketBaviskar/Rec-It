import{r as u,u as h,j as s,F as x,b as n,c as r,a as c,d as l,C as o,B as p}from"./index-By-M4bTe.js";import{o as f,b as t,t as g}from"./index-DtqNpb_B.js";import{S as j}from"./separator-BkXXHvyI.js";const F=f({suspendFromFacilityAccessRecIt:t().default(!1),suspendFromIntramuralsRecIt:t().default(!1),suspendFromProgramsRecIt:t().default(!1),suspendFromBookingsRecIt:t().default(!1),suspendFromFacilityAccessIntramural:t().default(!1),suspendFromIntramuralsIntramural:t().default(!1),suspendFromProgramsIntramural:t().default(!1),suspendFromBookingsIntramural:t().default(!1)});function S({onComplete:d}){const[m]=u.useState(!1),a=h({resolver:g(F),defaultValues:{suspendFromFacilityAccessRecIt:!1,suspendFromIntramuralsRecIt:!1,suspendFromProgramsRecIt:!1,suspendFromBookingsRecIt:!1,suspendFromFacilityAccessIntramural:!1,suspendFromIntramuralsIntramural:!1,suspendFromProgramsIntramural:!1,suspendFromBookingsIntramural:!1}});async function i(e){console.log(e),d()}return s.jsx(x,{...a,children:s.jsxs("form",{onSubmit:a.handleSubmit(i),className:"space-y-8",children:[s.jsxs("div",{className:"space-y-4",children:[s.jsxs(n,{children:[s.jsx(r,{children:"RecIt - Default Suspension Settings"}),s.jsx(c,{control:a.control,name:"suspendFromFacilityAccessRecIt",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Facility Access"})]})}),s.jsx(c,{control:a.control,name:"suspendFromIntramuralsRecIt",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Intramurals"})]})}),s.jsx(c,{control:a.control,name:"suspendFromProgramsRecIt",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Programs"})]})}),s.jsx(c,{control:a.control,name:"suspendFromBookingsRecIt",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Bookings"})]})})]}),s.jsx(j,{}),s.jsxs(n,{children:[s.jsx(r,{children:"Intramural (RecIt) - Default Suspension Settings"}),s.jsx(c,{control:a.control,name:"suspendFromFacilityAccessIntramural",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Facility Access"})]})}),s.jsx(c,{control:a.control,name:"suspendFromIntramuralsIntramural",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Intramurals"})]})}),s.jsx(c,{control:a.control,name:"suspendFromProgramsIntramural",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Programs"})]})}),s.jsx(c,{control:a.control,name:"suspendFromBookingsIntramural",render:({field:e})=>s.jsxs(n,{className:"flex items-start space-x-3 space-y-0",children:[s.jsx(l,{children:s.jsx(o,{checked:e.value,onCheckedChange:e.onChange})}),s.jsx(r,{className:"font-normal leading-tight",children:"Suspend from Bookings"})]})})]})]}),s.jsx("div",{className:"flex space-x-4",children:s.jsx(p,{type:"submit",className:"w-fit",disabled:m,children:m?"Saving...":"Save Settings"})})]})})}export{S as default};
