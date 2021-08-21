var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(t,n,r)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[n]=r,l=(e,t)=>{for(var n in t||(t={}))a.call(t,n)&&s(e,n,t[n]);if(r)for(var n of r(t))o.call(t,n)&&s(e,n,t[n]);return e},c=(e,r)=>t(e,n(r));import{r as i,p as u,R as m,b as p,N as d,e as f,S as h,a as g,H as y,c as b}from"./vendor.c960d764.js";const E=i.exports.createContext();function x({children:e}){const[t,n]=i.exports.useState();return m.createElement(E.Provider,{value:{loginData:t,setLoginData:n}},e)}x.propTypes={children:u.exports.node.isRequired};const w=()=>i.exports.useContext(E),v=(e,t)=>{const{git:n}=t,r=c(l({},e),{err:null});switch(n){case"commit":{const{content:e}=t;return c(l({},r),{content:e,isUpToDate:!1})}case"did fetch":{const{content:e=r.content,sha:n}=t;return c(l({},r),{content:e,isFetching:!1,isUpToDate:!0,sha:n})}case"failed fetch":{const{err:e}=t;return c(l({},r),{err:e,isFetching:!1})}case"will fetch":return c(l({},r),{isFetching:!0});default:throw new Error}},N=e=>e&&`Bearer ${e}`,C={afterPull:e=>e,beforePush:e=>e,branch:"main"},T=[],k=i.exports.createContext();function S({children:e}){const{loginData:t}=w(),[n,r,a]=((e,t,n,r=C)=>{const{token:a,initialContent:o,afterPull:s,beforePush:c,branch:u}=l(l({},C),r),[{content:m,err:d,isFetching:f,isUpToDate:h,sha:g},y]=i.exports.useReducer(v,{content:o}),b=e&&t&&n&&`https://api.github.com/repos/${e}/${t}/contents/${n}`;return i.exports.useEffect((()=>{if(b){const e=b&&`${b}?ref=${u}`;y({git:"will fetch"}),fetch(e,{headers:{Authorization:N(a),Accept:"application/vnd.github.v3+json"}}).then((e=>{if(e.ok)return e.json();throw new Error})).then((({content:e,sha:t})=>{const n=p.Buffer.from(e,"base64"),r=JSON.parse(n),a=s(r);y({git:"did fetch",content:a,sha:t})})).catch((e=>y({git:"failed fetch",err:e})))}}),[s,u,b,a]),[m,e=>y({git:"commit",content:e}),{err:d,isFetching:f,isUpToDate:h,push:()=>{if(!h&&!f&&m&&g&&b){const e=c(m),t=JSON.stringify(e),r=p.Buffer.from(t).toString("base64");y({git:"will fetch"}),fetch(b,{method:"put",headers:{Authorization:N(a),"Content-Type":"application/json"},body:JSON.stringify({message:`updated ${n}`,content:r,sha:g,branch:u})}).then((e=>{if(e.ok)return e.json();throw new Error})).then((({content:{sha:e}})=>y({git:"did fetch",sha:e}))).catch((e=>y({git:"failed fetch",err:e})))}}}]})(null==t?void 0:t.username,"elo-ludo","data.json",{token:null==t?void 0:t.pat,initialContent:T,branch:"data"}),o=!a.isUpToDate;return m.createElement(k.Provider,{value:{games:n.filter((({type:e})=>"goodie"!==e&&"accessoire"!==e)),addGame:e=>{r([...n,l({},e)])},hasSomethingToSave:o,removeGame:({id:e})=>{r(n.filter((t=>t.id!==e)))},saveGames:()=>{a.push()},updateGames:(...e)=>{r(n.map((t=>{var n;return null!=(n=e.find((({id:e})=>e===t.id)))?n:t})))}}},e)}S.propTypes={children:u.exports.node.isRequired};const D=()=>i.exports.useContext(k),P={afterFetch:()=>{},beforeFetch:()=>{},extractData:e=>e,extractBody:e=>e.json()};const j={initialState:[],extractData:e=>e.list},R=i.exports.createContext();function F({children:e}){const[t,n]=i.exports.useState(),[r]=function(e,t=P){const{afterFetch:n,beforeFetch:r,extractBody:a,extractData:o,fetchOptions:s,initialState:c}=l(l({},P),t),[u,m]=i.exports.useState(c),[p,d]=i.exports.useState();return i.exports.useEffect((()=>{e&&(r(),fetch(e,s).then((e=>e.ok&&a(e))).then((e=>e&&m(o(e)))).catch((e=>d(e))).finally(n))}),[n,r,a,o,s,e]),[u,p]}(t,j);return m.createElement(R.Provider,{value:{results:r,setQuery:e=>{n(`https://www.myludo.fr/views/profil/datas.php?type=collection&id=${e}`)}}},e)}F.propTypes={children:u.exports.node.isRequired};const O=()=>i.exports.useContext(R);function $({opener:e,children:t}){const[n,r,a]=(()=>{const[e,t]=i.exports.useState(!1);return[e,()=>t(!0),()=>t(!1)]})();return i.exports.useEffect((()=>{const e=({key:e})=>{"Escape"===e&&a()};return n&&window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}}),[a,n]),m.createElement(m.Fragment,null,m.cloneElement(e,{onClick:r}),n&&m.createElement("div",{className:"fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-75 grid",style:{gridTemplateColumns:"1fr auto 1fr",gridTemplateRows:"1fr auto 1fr"}},m.createElement("button",{className:"col-start-3 justify-self-start self-end",type:"button",onClick:a},"x"),m.createElement("div",{className:"col-start-2 row-start-2"},t)))}function q(){const e=i.exports.useRef(),t=i.exports.useRef(),{setLoginData:n}=w();return m.createElement($,{opener:m.createElement("button",{className:"link",type:"button"},"Login")},m.createElement("form",{onSubmit:r=>{r.preventDefault(),fetch("https://api.github.com",{method:"head",headers:{authorization:`Bearer ${t.current.value}`}}).then((r=>{r.ok&&"public_repo"===r.headers.get("X-OAuth-Scopes")?n({username:e.current.value,pat:t.current.value}):alert("failed to use token")}))},className:"p-4 rounded-lg bg-white space-y-4"},m.createElement("div",{className:"space-y-2"},m.createElement("label",{htmlFor:"username"},"username"),m.createElement("input",{className:"focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-1",ref:e,id:"username",type:"text"})),m.createElement("div",{className:"space-y-2"},m.createElement("label",{htmlFor:"pat"},"PAT"),m.createElement("input",{className:"focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 px-1",ref:t,id:"pat",type:"password"})),m.createElement("div",null,m.createElement("button",{type:"submit"},"Validate"))))}function A(){const{setLoginData:e}=w();return m.createElement("button",{className:"link",type:"button",onClick:()=>e(null)},"Logout")}function G(){const{hasSomethingToSave:e,saveGames:t}=D();return m.createElement("button",{className:"link",type:"button",onClick:t,disabled:!e},"Save")}function L({className:e}){const{loginData:t}=w();return m.createElement("div",{className:`flex flex-row justify-end shadow-b mr-2 sm:mr-0 ${e}`},null==t?m.createElement(q,null):m.createElement(m.Fragment,null,m.createElement(G,null),m.createElement(A,null)))}$.propTypes={opener:u.exports.node.isRequired,children:u.exports.node.isRequired},L.propTypes={className:u.exports.string},L.defaultProps={className:""};const B=(e,t)=>m.createElement("li",null,m.createElement(d,{to:e,exact:!0,activeClassName:"active",className:"link"},t));function U({className:e}){return m.createElement("nav",{className:e},m.createElement("ul",{className:"flex flex-row justify-evenly sm:justify-start shadow-t sm:shadow-b"},B("/","Home"),B("/play","Play"),B("/search","Search")))}U.propTypes={className:u.exports.string},U.defaultProps={className:""};function W({children:e,data:t}){const{elo:n,image:{S300:r},lastDelta:a,lastPlayedAt:o,matchCount:s,title:l}=t;return m.createElement("figure",{className:"sm:inline-flex shadow overflow-hidden rounded-xl sm:p-0 sm:h-72"},r&&m.createElement("img",{loading:"lazy",src:r,alt:l,className:"block sm:w-48 h-auto"}),m.createElement("figcaption",{className:"flex flex-col sm:w-96 p-4 sm:p-8 text-center sm:text-left space-y-2"},m.createElement("p",{className:"font-semibold"},l),n&&a&&m.createElement("p",null,(e=>null==e?void 0:e.toFixed(1))(n),(e=>null==e?null:((e=e.toFixed(1))>0&&(e=`+${e}`),` (${e})`))(a),(e=>null==e?null:` / ${e}`)(s),(e=>null==e?null:` : ${new Date(e)}`)(o)),e))}function z({games:e,gameComponentType:t}){return m.createElement("ol",{className:"grid grid-cols-1 sm:grid-cols-auto-fit gap-y-4 justify-items-center"},e.map((e=>m.createElement("li",{key:e.id},m.createElement(t,{data:e})))))}function J(){const{games:e}=D(),t=e.reduce(((e,t)=>t.elo>e?t.elo:e),0);return m.createElement(z,{games:e.sort(((e,t)=>t.elo-e.elo||t.matchCount-e.matchCount||t.lastDelta-e.lastDelta)),gameComponentType:({data:e})=>{const n=7+3*(e.elo-1500)/(t-1500);return m.createElement(W,{data:e},m.createElement("strong",null,Math.round(2*n)/2))}})}function M({data:e,onWin:t}){return m.createElement(W,{data:e},m.createElement("button",{type:"button",onClick:t},"WIN"))}W.propTypes={children:u.exports.node,data:u.exports.shape({elo:u.exports.number,id:u.exports.string.isRequired,image:u.exports.shape({S300:u.exports.string.isRequired}).isRequired,lastDelta:u.exports.number,lastPlayedAt:u.exports.number,matchCount:u.exports.number,title:u.exports.string.isRequired}).isRequired},z.propTypes={games:u.exports.arrayOf(W.propTypes.data).isRequired,gameComponentType:u.exports.elementType},z.defaultProps={gameComponentType:W},M.propTypes=c(l({},W.propTypes),{onWin:u.exports.func.isRequired});const H=f(),I=()=>Math.random()-.5;function Q(){const{games:e,updateGames:t}=D();if(e.length<10)return m.createElement("p",null,"you should start with searching games ;)");const n=[I,(e,t)=>{var n,r;return(null!=(n=e.matchCount)?n:0)-(null!=(r=t.matchCount)?r:0)},(e,t)=>{var n,r;return new Date(null!=(n=e.lastPlayedAt)?n:0).getTime()-new Date(null!=(r=t.lastPlayedAt)?r:0).getTime()}].sort(I);let[r,,a]=e.sort(n[0]);return m.createElement(m.Fragment,null,m.createElement(M,{data:r,onWin:()=>{[r,a]=H(r).wins(a),t(r,a)}}),"vs",m.createElement(M,{data:a,onWin:()=>{[a,r]=H(a).wins(r),t(r,a)}}),m.createElement("button",{type:"button",onClick:()=>{[r,a]=H(r).ties(a),t(r,a)}},"=="))}function V(){const{setQuery:e}=O(),t=i.exports.useRef();return m.createElement("form",{onSubmit:n=>{n.preventDefault(),e(t.current.value)}},m.createElement("label",{htmlFor:"myludo"},"Myludo id"),m.createElement("input",{ref:t,id:"myludo"}),m.createElement("button",{type:"submit"},"Search"))}function X({data:e}){const{id:t}=e,{games:n,addGame:r,removeGame:a}=D(),o={[!0]:{onClick:()=>a(e),text:"-"},[!1]:{onClick:()=>r(e),text:"+"}},s=null!=n.find((e=>e.id===t));return m.createElement(W,{data:e},m.createElement("button",{type:"button",onClick:o[s].onClick},o[s].text))}function _(){const{results:e}=O();return m.createElement(z,{games:e,gameComponentType:X})}function K(){return m.createElement(F,null,m.createElement(V,null),m.createElement(_,null))}X.propTypes=l({},W.propTypes);const Y=(e,t)=>m.createElement(g,{exact:!0,path:e,component:t});function Z(){return m.createElement(h,null,Y("/",J),Y("/play",Q),Y("/search",K))}function ee(){return m.createElement(x,null,m.createElement(S,null,m.createElement(y,null,m.createElement(U,{className:"row-start-3 sm:row-auto sticky bottom-0 sm:top-0 bg-white"}),m.createElement(L,{className:"sticky top-0 bg-white"}),m.createElement("main",{className:"col-span-full p-4"},m.createElement(Z,null)))))}b.render(m.createElement(ee,null),document.querySelector("#root"));
