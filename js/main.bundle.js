(()=>{"use strict";const e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),t=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),r=t.querySelector(".error__button"),o=document.querySelector("#error-loading").content.querySelector(".error-loading").cloneNode(!0);e.classList.add("hidden"),t.classList.add("hidden"),o.classList.add("hidden"),document.querySelector("main").append(e),document.querySelector("main").append(t),document.querySelector("main").append(o);const n=e=>{e.classList.add("hidden"),e.removeEventListener("click",(()=>{n(e)})),r.removeEventListener("click",(()=>{n(e)})),window.removeEventListener("keydown",(t=>{"Esc"!==t.key&&"Escape"!==t.key||n(e)}))},a=e=>{e.classList.remove("hidden"),e.addEventListener("click",(()=>{n(e)})),r.addEventListener("click",(()=>{n(e)})),window.addEventListener("keydown",(t=>{"Esc"!==t.key&&"Escape"!==t.key||n(e)}))},c=["gif","jpg","jpeg","png"],l=["img/muffin-grey.svg"],i=document.querySelector(".ad-form__field input[type=file]"),s=document.querySelector(".ad-form-header__preview img"),d=document.querySelector(".ad-form__upload input[type=file]"),u=document.querySelector(".ad-form__photo"),p=(e,t)=>{const r=e.files[0],o=r.name.toLowerCase();if(c.some((e=>o.endsWith(e)))){const e=new FileReader;e.readAsDataURL(r),e.addEventListener("load",(()=>{t.src=e.result}))}};i.addEventListener("change",(()=>{p(i,s)})),d.addEventListener("change",(()=>{const e=(()=>{const e=document.createElement("IMG");return e.width="70",e.height="70",e})();p(d,e),u.append(e)}));const m=document.querySelector(".ad-form"),y={TITLE:m.querySelector("#title"),ADDRESS:m.querySelector("#address"),TYPE:m.querySelector("#type"),PRICE:m.querySelector("#price"),CHECKIN:m.querySelector("#timein"),CHECKOUT:m.querySelector("#timeout"),ROOM_NUMBER:m.querySelector("#room_number"),CAPACITY:m.querySelector("#capacity")},h=document.querySelectorAll(".map__filter"),g=document.querySelector(".map__features"),E=m.querySelectorAll(".ad-form__element"),v=m.querySelector(".ad-form__reset"),S=document.querySelector(".map__filters"),f=()=>{m.reset(),s.src=l,u.textContent="",S.reset(),j()};h.forEach((e=>{e.disabled=!0})),g.disabled=!0,E.forEach((e=>{e.disabled=!0})),m.querySelector(".ad-form-header").disabled=!0,m.classList.add("ad-form--disabled");const T=(e,t)=>{const r=(e=Math.abs(e)%100)%10;return e>10&&e<20?t[2]:r>1&&r<5?t[1]:1===r?t[0]:t[2]},q=["комната","комнаты","комнат"],_=["гостя","гостей","гостей"],C={bungalow:{title:"Бунгало",minPrice:0,declension:"бунгало"},flat:{title:"Квартира",minPrice:1e3,declension:"квартиру"},house:{title:"Дом",minPrice:5e3,declension:"дом"},palace:{title:"Дворец",minPrice:1e4,declension:"дворец"}},I=document.querySelector("#card").content.querySelector(".popup"),A={LOW:1e4,HIGH:5e4},P=document.querySelector(".map__filters"),R=P.querySelector("#housing-type"),k=P.querySelector("#housing-price"),O=P.querySelector("#housing-rooms"),b=P.querySelector("#housing-guests"),w=P.querySelector("#housing-features"),x=10,D={lat:35.66566,lng:139.76103},$=document.querySelector(".ad-form").querySelector("#address"),H=L.map("map-canvas"),M=()=>{$.value=`${D.lat}, ${D.lng}`};H.on("load",(()=>{h.forEach((e=>{e.disabled=!1})),g.disabled=!1,E.forEach((e=>{e.disabled=!1})),m.querySelector(".ad-form-header").disabled=!1,m.classList.remove("ad-form--disabled"),M()})).setView(D,10),L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(H);const U=L.icon({iconUrl:"./img/main-pin.svg",iconSize:[52,52],iconAnchor:[26,52]}),N=L.marker(D,{draggable:!0,icon:U}).addTo(H);N.on("move",(e=>{$.value=`${e.target.getLatLng().lat.toFixed(5)}, ${e.target.getLatLng().lng.toFixed(5)}`}));const Y=L.layerGroup().addTo(H),V=L.icon({iconUrl:"./img/pin.svg",iconSize:[40,40],iconAnchor:[20,40]}),F=e=>{e.forEach((({author:e,offer:t,location:r})=>{L.marker({lat:r.lat,lng:r.lng},{icon:V}).addTo(Y).bindPopup((({author:e,offer:t})=>{const r=I.cloneNode(!0),o={AVATAR:r.querySelector(".popup__avatar"),TITLE:r.querySelector(".popup__title"),ADDRESS:r.querySelector(".popup__text--address"),PRICE:r.querySelector(".popup__text--price"),TYPE:r.querySelector(".popup__type"),CAPACITY:r.querySelector(".popup__text--capacity"),TIME:r.querySelector(".popup__text--time"),FEATURES:r.querySelector(".popup__features"),DESCRIPTION:r.querySelector(".popup__description"),PHOTOS:r.querySelector(".popup__photos")};var n;return t.title.length?o.TITLE.textContent=t.title:o.TITLE.remove(),t.address.length?o.ADDRESS.textContent=t.address:o.ADDRESS.remove(),t.price.length?o.PRICE.textContent=`${t.price} ₽/ночь`:o.PRICE.remove(),t.type.length?o.TYPE.textContent=C[t.type].title:o.TYPE.remove(),t.rooms.length&&t.guests.length?o.CAPACITY.textContent=`${t.rooms} ${T(t.rooms,q)} для ${t.guests} ${T(t.guests,_)}`:o.CAPACITY.remove(),t.checkin.length&&t.checkout.length?o.TIME.textContent=`Заезд после ${t.checkin}, выезд до ${t.checkout}`:o.TIME.remove(),t.features.length?(e=>{o.FEATURES.textContent="",e.forEach((e=>{let t=document.createElement("li");t.classList.add("popup__feature",`popup__feature--${e}`),o.FEATURES.append(t)}))})(t.features):o.FEATURES.remove(),t.description.length?o.DESCRIPTION.textContent=t.description:o.DESCRIPTION.remove(),t.photos.length?(n=t.photos,o.PHOTOS.textContent="",n.forEach((e=>{let t=document.createElement("img");t.src=e,t.classList.add("popup__photo"),t.style.width="45px",t.style.height="40px",t.alt="Фотография жилья",o.PHOTOS.appendChild(t)}))):o.PHOTOS.remove(),e.avatar.length?(o.AVATAR.src=e.avatar,o.AVATAR.style.width="70px",o.AVATAR.style.height="70px"):o.AVATAR.remove(),r})({author:e,offer:t,location:r}))}))},K=()=>{Y.clearLayers()},j=()=>{H.setView(D,10),N.setLatLng(D),M()},G=e=>{P.addEventListener("change",((t,r)=>{let o;return(...t)=>{clearTimeout(o),o=setTimeout((()=>{clearTimeout(o),(()=>{K(),F((t=e,t.filter((e=>(e=>e.offer.type===R.value||"any"===R.value)(e)&&(e=>{switch(k.value){case"low":return e.offer.price<A[k.value];case"middle":return e.offer.price>=A.LOW&&e.offer.price<=A.HIGH;case"high":return e.offer.price>A[k.value];case"any":return e}})(e)&&(e=>e.offer.rooms===parseInt(O.value,10)||"any"===O.value)(e)&&(e=>e.offer.guests===parseInt(b.value,10)||"any"===b.value)(e)&&(e=>{const t=w.querySelectorAll("input:checked");return Array.from(t).every((t=>e.offer.features.includes(t.value)))})(e)))).slice(0,x));var t})(...t)}),500)}})())},z={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},B=document.querySelector(".char-counter");var W,J;y.TITLE.addEventListener("input",(e=>{B.textContent=`( ${e.target.value.length} / 100 символов )`})),y.TITLE.addEventListener("change",(e=>{let t="";const r={tooShort:"Слишком короткий заголовок. Длина должна быть минимум 30 символов",tooLong:"Слишком длинный заголовок",valueMissing:"Заголовок должен быть обязательно заполнен"};for(let o in r)e.target.validity[o]&&(t=r[o]);y.TITLE.setCustomValidity(t),y.TITLE.reportValidity()})),y.PRICE.min=C[y.TYPE.value].minPrice,y.PRICE.max=1e6,y.TYPE.addEventListener("change",(e=>{y.PRICE.placeholder=C[e.target.value].minPrice,y.PRICE.min=C[e.target.value].minPrice})),y.PRICE.addEventListener("change",(e=>{let t="";const r={valueMissing:"Введите цену",rangeUnderflow:`Цена за ${C[y.TYPE.value].declension} должна быть больше ${e.target.min} рублей`,rangeOverflow:"Цена за жилье должна быть меньше 1000000 рублей"};for(let o in r)e.target.validity[o]&&(t=r[o]);y.PRICE.setCustomValidity(t),y.PRICE.reportValidity()})),y.CHECKIN.addEventListener("change",(e=>{y.CHECKOUT.value=e.target.value})),y.CHECKOUT.addEventListener("change",(e=>{y.CHECKIN.value=e.target.value})),y.ROOM_NUMBER.addEventListener("change",(()=>{((e,t)=>{for(let r of t.children)z[e.value].includes(r.value)?(r.disabled=!1,r.selected=!0):r.disabled=!0})(y.ROOM_NUMBER,y.CAPACITY)})),W=r=>{var o;F(r.slice(0,x)),G(r),(r=>{m.addEventListener("submit",(o=>{var n,c,l;o.preventDefault(),n=()=>{a(e),f(),K(),F(r.slice(0,x))},c=()=>a(t),l=new FormData(o.target),fetch("https://22.javascript.pages.academy/keksobooking",{method:"POST",body:l}).then((e=>{e.ok?n():c()})).catch((()=>{c()}))}))})(r),o=r,v.addEventListener("click",(e=>{e.preventDefault(),f(),K(),F(o.slice(0,x))}))},J=a,fetch("https://22.javascript.pages.academy/keksobooking/data").then((e=>e.json())).then((e=>{W(e)})).catch((()=>{J(o)}))})();
//# sourceMappingURL=main.bundle.js.map