import{h as D,r as f,v as S,u as w,j as e,F as T,a as t,b as r,c as a,d as i,I as l,A as F,E as o,G as A,B as h,Q as P,H as k,J as B,K as L,M as O,N as Q}from"./index-CevBTENx.js";import{o as R,s as m,n as q,t as G}from"./index-0j1ti5HV.js";const H=async p=>{try{return(await D.post("/equipments",p)).data}catch(d){throw console.error("Error creating equipment:",d),d}},M=R({equipmentName:m().min(2,{message:"Equipment name must be at least 2 characters."}),equipmentCode:m().min(1,{message:"Equipment code is required."}),equipmentImage:m().optional(),description:m().min(10,{message:"Description must be at least 10 characters."}),quantity:q().min(1,{message:"Quantity must be at least 1."}),price:q().min(0,{message:"Price must be a positive value."}),replacementFees:q().min(0,{message:"Replacement fees must be a positive value."}),department:m(),location:m().min(2,{message:"Location must be at least 2 characters."})});function J({onComplete:p,categoryId:d,categoryName:E}){const[y,b]=f.useState(!1),[v,u]=f.useState(!1),{toast:x}=S(),n=w({resolver:G(M),defaultValues:{equipmentName:"",equipmentCode:"",equipmentImage:"",description:"",quantity:1,price:0,replacementFees:0,department:"",location:""}});async function I(s){var c,C;b(!0);try{const j={name:s.equipmentName,code:s.equipmentCode,image:s.equipmentImage,description:s.description,quantity:s.quantity,price:s.price,replacementFees:s.replacementFees,location:s.location,inventoryId:parseInt(d)},g=await H(j);x({title:g.status==="success"?"Success":"Error",description:g.message||"Inventory deleted successfully",variant:g.status==="success"?"default":"destructive"}),n.reset(),p()}catch(j){x({title:"Error",description:((C=(c=j.response)==null?void 0:c.data)==null?void 0:C.message)||"Failed ",variant:"destructive"})}finally{b(!1)}}const N=()=>{n.reset(),u(!1),x({title:"Form Cancelled",description:"You have cancelled the form."}),p()};return e.jsxs(T,{...n,children:[e.jsxs("form",{onSubmit:n.handleSubmit(I),className:"space-y-8",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[e.jsx(t,{control:n.control,name:"equipmentName",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Equipment Name"}),e.jsx(i,{children:e.jsx(l,{placeholder:"Enter equipment name",...s})}),e.jsx(F,{children:"Name of the equipment within the category."}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"equipmentCode",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Equipment Code"}),e.jsx(i,{children:e.jsx(l,{placeholder:"Enter equipment code",...s})}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"equipmentImage",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Equipment Image"}),e.jsx(i,{children:e.jsx(l,{id:"picture",type:"file",placeholder:"Upload equipment image",...s})}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"quantity",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Quantity"}),e.jsx(i,{children:e.jsx(l,{type:"number",placeholder:"Enter quantity",...s,onChange:c=>s.onChange(parseInt(c.target.value)),min:1})}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"price",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Price"}),e.jsx(i,{children:e.jsx(l,{type:"number",placeholder:"Enter price",...s,onChange:c=>s.onChange(parseFloat(c.target.value)),min:0,step:"0.01"})}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"replacementFees",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Replacement Fees"}),e.jsx(i,{children:e.jsx(l,{type:"number",placeholder:"Enter replacement fees",...s,onChange:c=>s.onChange(parseFloat(c.target.value)),min:0,step:"0.01"})}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"description",render:({field:s})=>e.jsxs(r,{className:"col-span-1 md:col-span-2 lg:col-span-3",children:[e.jsx(a,{children:"Description"}),e.jsx(i,{children:e.jsx(A,{placeholder:"Describe the equipment",...s})}),e.jsx(F,{children:"Provide a brief description of the equipment."}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"department",render:()=>e.jsxs(r,{children:[e.jsx(a,{children:"Department"}),e.jsx(i,{children:e.jsx(l,{value:E,disabled:!0})}),e.jsx(o,{})]})}),e.jsx(t,{control:n.control,name:"location",render:({field:s})=>e.jsxs(r,{children:[e.jsx(a,{children:"Location"}),e.jsx(i,{children:e.jsx(l,{placeholder:"Enter location",...s})}),e.jsx(o,{})]})})]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx(h,{type:"submit",disabled:y,children:y?"Adding...":"Add Equipment"}),e.jsx(h,{type:"button",variant:"destructive",onClick:()=>u(!0),children:"Cancel"})]})]}),e.jsx(P,{}),e.jsx(k,{open:v,onOpenChange:u,children:e.jsxs(B,{children:[e.jsxs(L,{children:[e.jsx(O,{children:"Confirm Cancellation"}),e.jsx("p",{children:"Are you sure you want to cancel this form? Unsaved changes will be lost."})]}),e.jsxs(Q,{children:[e.jsx(h,{variant:"ghost",onClick:()=>u(!1),children:"No, Go Back"}),e.jsx(h,{variant:"destructive",onClick:N,children:"Yes, Cancel"})]})]})})]})}export{J as default};
