"use strict";(self.webpackChunkall_cups=self.webpackChunkall_cups||[]).push([[36],{3920:function(e,t,n){n.d(t,{q:function(){return i}});var s={wrapper:"Avatar_wrapper__0btH8",image:"Avatar_image__hMtyr",noImage:"Avatar_noImage__ehZfC"},a=n(6417),i=function(e){var t,n=e.account,i=e.className,r=[s.wrapper,i].filter(Boolean).join(" ");return(0,a.jsx)("div",{className:r,children:null!==n&&void 0!==n&&n.avatar?(0,a.jsx)("img",{src:n.avatar,className:s.image,alt:""}):(0,a.jsx)("div",{className:s.noImage,children:null===n||void 0===n||null===(t=n.name)||void 0===t?void 0:t[0]})})}},9036:function(e,t,n){n.r(t),n.d(t,{default:function(){return K}});var s=n(9439),a=n(7313),i=n(8467),r=n(2135),c=n(5590),o=n(3092),m=n(3920),u=n(5214),l=n(2733),d="Attaches_wrapper__SBQiT",_="Attaches_dropdown__17Ume",f="Attaches_button__xeSXF",h="Attaches_opened__eJG6m",v="Attaches_item__KKcwh",p="Attaches_previewSmall__t5CQ8",g="Attaches_name__T+KlB",x="Attaches_previewBig__TnRk+",j=n(6417),N={placement:"left",modifiers:[{name:"offset",options:{offset:[0,4]}}]},I=function(e){var t=e.items,n=(0,a.useState)(!1),i=(0,s.Z)(n,2),r=i[0],c=i[1],m=(0,a.useRef)(),I=(0,a.useRef)();return(0,a.useEffect)((function(){if(r){var e=(0,u.fi)(m.current,I.current,N);return function(){return e.destroy()}}}),[r]),(0,j.jsxs)("div",{className:d,children:[(0,j.jsx)("button",{onClick:function(e){e.preventDefault(),c((function(e){return!e}))},type:"button",className:"".concat(f," ").concat(r?h:""),onBlur:function(){c(!1)},ref:m,children:(0,j.jsx)(o.o8,{})}),r&&(0,j.jsx)(l.h,{children:(0,j.jsx)("div",{className:_,ref:I,children:t.map((function(e,t){return(0,j.jsxs)("div",{className:v,children:[(0,j.jsx)("img",{src:e.img,alt:"",className:p}),(0,j.jsx)("span",{className:g,children:"image_4.jpg 1.26 MB"}),(0,j.jsx)("div",{className:x,children:(0,j.jsx)("img",{src:e.img,alt:"",loading:"lazy"})})]},t)}))})})]})},b={item:"ListItem_item__9+PnM",itemReadStatus:"ListItem_itemReadStatus__AOBo0",itemRead:"ListItem_itemRead__jKUfL",itemUser:"ListItem_itemUser__ZaopU",itemUserName:"ListItem_itemUserName__-MUJU",itemIcon:"ListItem_itemIcon__1QMwK",itemMessageAndIcons:"ListItem_itemMessageAndIcons__ZuKCU",itemMessage:"ListItem_itemMessage__3NVD+",itemTitle:"ListItem_itemTitle__giajX",itemText:"ListItem_itemText__xu-QG",itemIcons:"ListItem_itemIcons__z4KPj",itemDate:"ListItem_itemDate__nW+ip",avatar:"ListItem_avatar__mAEeU",checkBox:"ListItem_checkBox__hT427",checked:"ListItem_checked__LJ5O1"},w=["months.january","months.february","months.march","months.april","months.may","months.june","months.july","months.august","months.september","months.october","months.november","months.december"],k=function(e,t){var n=new Date(e),s=(new Date).toISOString().slice(0,10);return e.slice(0,10)===s?String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0"):n.getDate()+" "+t(w[n.getMonth()])},M=new Map([["\u0417\u0430\u043a\u0430\u0437\u044b",o.Q1],["\u0424\u0438\u043d\u0430\u043d\u0441\u044b",o.qx],["\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",o._m],["\u041f\u0443\u0442\u0435\u0448\u0435\u0432\u0441\u0442\u0432\u0438\u044f",o.aF],["\u0411\u0438\u043b\u0435\u0442\u044b",o.Pr],["\u0428\u0442\u0440\u0430\u0444\u044b \u0438 \u043d\u0430\u043b\u043e\u0433\u0438",o.F2]]),O=function(e){var t=e.item,n=(0,c.$G)().t,i=M.get(t.flag),u=(0,a.useState)(!1),l=(0,s.Z)(u,2),d=l[0],_=l[1],f=[b.item,t.read&&b.itemRead,d&&b.checked].filter(Boolean).join(" ");return(0,j.jsxs)(r.rU,{className:f,to:t.id,onContextMenu:function(e){console.log(e)},children:[(0,j.jsx)("div",{className:b.itemReadStatus}),(0,j.jsxs)("div",{className:b.itemUser,children:[(0,j.jsx)(m.q,{account:t.author,className:b.avatar}),(0,j.jsx)("div",{className:b.checkBox,children:(0,j.jsx)("input",{type:"checkbox",checked:d,onChange:function(){},onClick:function(e){e.preventDefault(),_((function(e){return!e}))}})}),(0,j.jsxs)("div",{className:b.itemUserName,children:[t.author.name," ",t.author.surname]})]}),(0,j.jsx)("div",{className:b.itemIcon,children:t.bookmark?(0,j.jsx)(o.pl,{}):t.important?(0,j.jsx)(o.df,{}):null}),(0,j.jsx)("div",{className:b.itemMessageAndIcons,children:(0,j.jsxs)("div",{className:b.itemMessage,children:[(0,j.jsx)("span",{className:b.itemTitle,children:t.title}),(0,j.jsx)("span",{className:b.itemText,children:t.text})]})}),(0,j.jsxs)("div",{className:b.itemIcons,children:[i&&(0,j.jsx)(i,{}),t.doc&&(0,j.jsx)(I,{items:[t.doc]})]}),(0,j.jsx)("div",{className:b.itemDate,children:k(t.date,n)})]})},L="NoItems_wrapper__k4M-M",y="NoItems_image__3DgGg",P="NoItems_text__V8OP8",Z=function(){var e=(0,c.$G)().t;return(0,j.jsxs)("div",{className:"".concat(L," no-items-block"),children:[(0,j.jsx)("div",{className:"".concat(y," no-items-image")}),(0,j.jsx)("div",{className:"".concat(P," no-items-text"),children:e("list.noLetters")})]})},A=n(5758),S=n(4165),U=n(3433),D=n(1413),B=n(5861),C=n(1426),R="List_wrapper__HBHEP",T="List_list__AK7hC",E="List_triggerLoadMore__42EQm",K=function(){var e=(0,i.f_)(),t=(0,A.m)(),n=(0,s.Z)(t,3),r=n[0],c=n[2],o=(0,i.UO)().folder;(0,a.useEffect)((function(){c()}),[o]);var m=function(e,t,n){var i,r=(0,a.useState)({items:n.items,hasMore:null===n||void 0===n||null===(i=n.pageInfo)||void 0===i?void 0:i.hasNextPage,loading:!1,currentPage:1}),c=(0,s.Z)(r,2),o=c[0],m=c[1],u=function(){var n=(0,B.Z)((0,S.Z)().mark((function n(){var s;return(0,S.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!o.loading){n.next=2;break}return n.abrupt("return");case 2:return m((function(e){return(0,D.Z)((0,D.Z)({},e),{},{loading:!0})})),n.next=5,(0,C.kC)(e,o.currentPage+1,t);case 5:s=n.sent,m((function(e){var t,n,a;return{loading:!1,items:1===(null===s||void 0===s||null===(t=s.pageInfo)||void 0===t?void 0:t.page)?(0,U.Z)(s.items):[].concat((0,U.Z)(e.items),(0,U.Z)(s.items)),hasMore:null===(n=s.pageInfo)||void 0===n?void 0:n.hasNextPage,currentPage:null===(a=s.pageInfo)||void 0===a?void 0:a.page}}));case 7:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return(0,a.useEffect)((function(){e&&(0,C.kC)(e,1,t).then((function(e){var t;m({items:e.items,hasMore:null===e||void 0===e||null===(t=e.pageInfo)||void 0===t?void 0:t.hasNextPage,loading:!1,currentPage:1})}))}),[e,t]),(0,D.Z)((0,D.Z)({},o),{},{fetchNext:u})}(o,r,e),u=m.items,l=m.fetchNext,d=m.hasMore,_=m.loading,f=function(e){var t=(0,a.useRef)();return(0,a.useEffect)((function(){var n=!1,s=new IntersectionObserver((function(t){var s;!n&&null!==t&&void 0!==t&&null!==(s=t[0])&&void 0!==s&&s.isIntersecting&&(n=!0,e().then((function(){return n=!1})))}),{rootMargin:"1000px"});return t.current&&s.observe(t.current),function(){s.disconnect()}}),[e]),t}(l);return(0,j.jsxs)("main",{className:R,children:[(0,j.jsxs)("div",{className:T,children:[u.map((function(e){return(0,j.jsx)(O,{item:e},e.id)})),d&&(0,j.jsx)("div",{ref:f,className:E})]},o),!_&&0===u.length&&(0,j.jsx)(Z,{})]},o)}},1413:function(e,t,n){n.d(t,{Z:function(){return i}});var s=n(4942);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,s)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,s.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}}}]);