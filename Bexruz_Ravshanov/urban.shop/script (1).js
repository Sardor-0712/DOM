const products = [
  {id:1,name:"iPhone 15",category:"Texnika",price:12999000,oldPrice:14499000,rating:4.8,reviews:124,badge:"−10%",image:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=85",description:"Kundalik hayot va ijod uchun zamonaviy smartfon. Yorqin ekran, sifatli kamera va tezkor ishlash."},
  {id:2,name:"Studio Wireless",category:"Audio",price:1499000,oldPrice:1799000,rating:4.7,reviews:89,badge:"−17%",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",description:"Sevimli musiqangiz uchun tiniq ovoz va qulay dizayn. Kundalik foydalanishga mos simsiz quloqchin."},
  {id:3,name:"Urban Runner X",category:"Poyabzal",price:899000,oldPrice:1120000,rating:4.9,reviews:203,badge:"−20%",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",description:"Yengil va qulay sport oyoq kiyimi. Shahar bo‘ylab faol kunlaringiz uchun yaratilgan."},
  {id:4,name:"Minimal Backpack",category:"Aksessuar",price:459000,oldPrice:null,rating:4.6,reviews:54,badge:"YANGI",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",description:"Noutbuk va kundalik buyumlaringiz uchun ixcham, amaliy ryukzak."},
  {id:5,name:"Classic Hoodie",category:"Kiyim",price:329000,oldPrice:399000,rating:4.7,reviews:76,badge:"−18%",image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",description:"Yumshoq mato va sodda siluet. Har kungi uslubingizga mos klassik huddi."},
  {id:6,name:"Smart Watch S",category:"Texnika",price:799000,oldPrice:null,rating:4.5,reviews:61,badge:"TOP",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",description:"Faollik, vaqt va bildirishnomalarni kuzatishga yordam beradigan zamonaviy aqlli soat."},
  {id:7,name:"Everyday Camera",category:"Texnika",price:3299000,oldPrice:3599000,rating:4.8,reviews:42,badge:"−8%",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=85",description:"Sayohat va ijodiy loyihalar uchun ixcham kamera konsepti."},
  {id:8,name:"Everyday Cap",category:"Kiyim",price:159000,oldPrice:null,rating:4.4,reviews:37,badge:"",image:"https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=85",description:"Oddiy, ko‘p kiyimlar bilan mos tushadigan kundalik kepka."},
  {id:9,name:"Wireless Earbuds",category:"Audio",price:599000,oldPrice:699000,rating:4.6,reviews:98,badge:"−14%",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85",description:"Ixcham korpus, qulay shakl va yo‘lda tinglash uchun simsiz audio."},
  {id:10,name:"City Sneakers",category:"Poyabzal",price:679000,oldPrice:null,rating:4.7,reviews:112,badge:"",image:"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=700&q=85",description:"Shahar hayoti uchun universal dizayn va kundalik qulaylik."},
  {id:11,name:"Sunglasses One",category:"Aksessuar",price:249000,oldPrice:299000,rating:4.5,reviews:29,badge:"−16%",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",description:"Minimal ramka va zamonaviy ko‘rinish bilan uslubingizni to‘ldiring."},
  {id:12,name:"Daily Laptop",category:"Texnika",price:6499000,oldPrice:null,rating:4.8,reviews:65,badge:"TOP",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",description:"O‘qish, ish va ijod uchun noutbuk mahsulot konsepti."}
];
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat("uz-UZ").format(value) + " so‘m";
const safeRead = (key, fallback) => { try { const value=JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
let cart = safeRead("urbanshop-cart", []);
let favorites = safeRead("urbanshop-favorites", []);
let activeCategory = "Barchasi";
let searchTerm = "";
let showAll = false;
let toastTimer;
const productGrid = $("#product-grid");

function persist() {
  localStorage.setItem("urbanshop-cart", JSON.stringify(cart));
  localStorage.setItem("urbanshop-favorites", JSON.stringify(favorites));
}
function toast(message) {
  const el=$("#toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2400);
}
function renderProducts() {
  let list = products.filter(p => (activeCategory==="Barchasi" || p.category===activeCategory) &&
    (p.name.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm)));
  const sort=$("#sort").value;
  if(sort==="price-low") list.sort((a,b)=>a.price-b.price);
  if(sort==="price-high") list.sort((a,b)=>b.price-a.price);
  if(sort==="rating") list.sort((a,b)=>b.rating-a.rating);
  const shown=showAll?list:list.slice(0,8);
  productGrid.innerHTML=shown.map((p,i)=>`
    <article class="product-card" style="animation-delay:${Math.min(i,7)*45}ms">
      <div class="product-image-wrap" data-view="${p.id}" tabindex="0" role="button" aria-label="${p.name} tafsilotlarini ko‘rish">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge?`<span class="product-badge">${p.badge}</span>`:""}
        <button class="favorite-btn ${favorites.includes(p.id)?"active":""}" data-favorite="${p.id}" aria-label="Sevimlilarga qo‘shish">${favorites.includes(p.id)?"♥":"♡"}</button>
      </div>
      <div class="product-info"><div class="product-category">${p.category}</div><h3 class="product-name">${p.name}</h3><div class="rating">★ ${p.rating} <span>(${p.reviews} ta baho)</span></div>
      <div class="price-row"><strong class="price">${money(p.price)}</strong>${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:""}</div>
      <button class="add-btn" data-add="${p.id}">Savatchaga qo‘shish <span>＋</span></button></div>
    </article>`).join("");
  $("#empty-state").classList.toggle("hidden",shown.length>0);
  $("#show-all").classList.toggle("hidden",list.length<=8);
  $("#show-all").innerHTML=showAll?"Kamroq ko‘rsatish ↑":"Barcha mahsulotlar ↓";
  $("#products-title").innerHTML=(activeCategory==="Barchasi"?"Ommabop mahsulotlar":activeCategory+" mahsulotlari")+' <span class="heading-spark">✦</span>';
}
function renderCounts() {
  $("#cart-count").textContent=cart.reduce((sum,item)=>sum+item.quantity,0);
  $("#drawer-count").textContent=`(${cart.reduce((sum,item)=>sum+item.quantity,0)})`;
  $("#favorite-count").textContent=favorites.length;
  $("#favorites-drawer-count").textContent=`(${favorites.length})`;
}
function renderCart() {
  const root=$("#cart-items");
  if(!cart.length) root.innerHTML='<div class="drawer-empty"><span>🛍</span><b>Savatchangiz hozircha bo‘sh</b><small>O‘zingizga yoqqan mahsulotlarni qo‘shing.</small></div>';
  else root.innerHTML=cart.map(item=>{const p=products.find(product=>product.id===item.id);if(!p)return "";return `<div class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><strong>${money(p.price)}</strong><div class="quantity"><button data-qty="${p.id}" data-delta="-1" aria-label="Kamaytirish">−</button><span>${item.quantity}</span><button data-qty="${p.id}" data-delta="1" aria-label="Ko‘paytirish">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="O‘chirish">×</button></div>`}).join("");
  const total=cart.reduce((sum,item)=>{const p=products.find(product=>product.id===item.id);return sum+(p?p.price*item.quantity:0)},0);
  $("#cart-total").textContent=money(total);renderCounts();
}
function renderFavorites() {
  const root=$("#favorite-items");
  const items=products.filter(p=>favorites.includes(p.id));
  if(!items.length) root.innerHTML='<div class="drawer-empty"><span>♡</span><b>Hali sevimli mahsulot yo‘q</b><small>Mahsulotdagi yurak belgisini bosing.</small></div>';
  else root.innerHTML=items.map(p=>`<div class="drawer-item"><img src="${p.image}" alt="${p.name}"><div><h3>${p.name}</h3><strong>${money(p.price)}</strong><button class="add-btn" data-add="${p.id}">Savatchaga qo‘shish ＋</button></div><button class="remove-item" data-favorite="${p.id}" aria-label="Sevimlilardan olib tashlash">♥</button></div>`).join("");
  renderCounts();
}
function addToCart(id) {
  const existing=cart.find(item=>item.id===id);
  if(existing) existing.quantity++; else cart.push({id,quantity:1});
  persist();renderCart();toast("Mahsulot savatchaga qo‘shildi ✓");
}
function toggleFavorite(id) {
  favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];
  persist();renderProducts();renderFavorites();
  toast(favorites.includes(id)?"Sevimlilarga saqlandi ♡":"Sevimlilardan olib tashlandi");
}
function openDrawer(which) {
  closeDrawers();
  const drawer=which==="cart"?$("#cart-drawer"):$("#favorites-drawer");
  drawer.classList.add("open");drawer.setAttribute("aria-hidden","false");$("#overlay").classList.add("show");document.body.style.overflow="hidden";
}
function closeDrawers() {
  $$(".drawer").forEach(d=>{d.classList.remove("open");d.setAttribute("aria-hidden","true")});
  $("#overlay").classList.remove("show");document.body.style.overflow="";
}
function openProduct(id) {
  const p=products.find(item=>item.id===id);if(!p)return;
  $("#modal-content").innerHTML=`<div class="modal-layout"><div class="modal-image"><img src="${p.image}" alt="${p.name}"></div><div class="modal-details"><span class="eyebrow">${p.category.toUpperCase()} · URBANSHOP</span><h2>${p.name}</h2><div class="rating">★ ${p.rating} <span>(${p.reviews} ta baho)</span></div><p>${p.description}</p><div class="modal-price">${money(p.price)}</div><button class="btn btn-primary" data-add="${p.id}">Savatchaga qo‘shish <span>＋</span></button></div></div>`;
  $("#product-modal").showModal();
}
function closeModal(){if($("#product-modal").open)$("#product-modal").close()}
$("#product-grid").addEventListener("click",event=>{
  const add=event.target.closest("[data-add]");if(add){event.stopPropagation();addToCart(Number(add.dataset.add));return}
  const fav=event.target.closest("[data-favorite]");if(fav){event.stopPropagation();toggleFavorite(Number(fav.dataset.favorite));return}
  const view=event.target.closest("[data-view]");if(view)openProduct(Number(view.dataset.view));
});
$("#product-grid").addEventListener("keydown",event=>{if((event.key==="Enter"||event.key===" ")&&event.target.matches("[data-view]")){event.preventDefault();openProduct(Number(event.target.dataset.view))}});
$("#cart-items").addEventListener("click",event=>{
  const qty=event.target.closest("[data-qty]");const remove=event.target.closest("[data-remove]");
  if(qty){const item=cart.find(x=>x.id===Number(qty.dataset.qty));if(item){item.quantity+=Number(qty.dataset.delta);if(item.quantity<=0)cart=cart.filter(x=>x.id!==item.id);persist();renderCart()}}
  if(remove){cart=cart.filter(x=>x.id!==Number(remove.dataset.remove));persist();renderCart();toast("Mahsulot savatchadan o‘chirildi")}
});
$("#favorite-items").addEventListener("click",event=>{
  const add=event.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));return}
  const fav=event.target.closest("[data-favorite]");if(fav)toggleFavorite(Number(fav.dataset.favorite));
});
$("#categories").addEventListener("click",event=>{
  const button=event.target.closest("[data-category]");if(!button)return;
  activeCategory=button.dataset.category;showAll=false;
  $$(".category-card").forEach(card=>card.classList.toggle("selected",card===button));
  renderProducts();$("#products").scrollIntoView({behavior:"smooth",block:"start"});
});
$("#search").addEventListener("input",event=>{searchTerm=event.target.value.trim().toLowerCase();showAll=true;renderProducts();if(searchTerm)$("#products").scrollIntoView({behavior:"smooth",block:"start"})});
$("#search").addEventListener("focus",()=>{$("#search").closest(".search-box").classList.add("expanded")});
$("#search").addEventListener("blur",()=>$("#search").closest(".search-box").classList.remove("expanded"));
$("#sort").addEventListener("change",renderProducts);
$("#show-all").addEventListener("click",()=>{showAll=!showAll;renderProducts()});
$("#reset-filters").addEventListener("click",()=>{activeCategory="Barchasi";searchTerm="";$("#search").value="";$$(".category-card").forEach(card=>card.classList.toggle("selected",card.dataset.category==="Barchasi"));renderProducts()});
$("#theme-toggle").addEventListener("click",()=>{
  const next=document.documentElement.dataset.theme==="dark"?"light":"dark";
  document.documentElement.dataset.theme=next;localStorage.setItem("urbanshop-theme",next);
  $("#theme-toggle").textContent=next==="dark"?"☼":"☾";toast(next==="dark"?"Dark mode yoqildi":"Light mode yoqildi");
});
const savedTheme=safeRead("urbanshop-theme","dark");
document.documentElement.dataset.theme=savedTheme;$("#theme-toggle").textContent=savedTheme==="dark"?"☼":"☾";
$("#cart-open").addEventListener("click",()=>{renderCart();openDrawer("cart")});
$("#favorites-open").addEventListener("click",()=>{renderFavorites();openDrawer("favorites")});
$("#overlay").addEventListener("click",closeDrawers);
$$(".close-drawer").forEach(btn=>btn.addEventListener("click",closeDrawers));
$("#clear-cart").addEventListener("click",()=>{cart=[];persist();renderCart();toast("Savatcha tozalandi")});
$("#checkout").addEventListener("click",()=>{
  if(!cart.length){toast("Avval savatchaga mahsulot qo‘shing");return}
  closeDrawers();toast("Demo buyurtma: to‘lov tizimi ulanmagan ✓");
});
$("#modal-close").addEventListener("click",closeModal);
$("#product-modal").addEventListener("click",event=>{if(event.target===$("#product-modal"))closeModal()});
$("#product-modal").addEventListener("click",event=>{const add=event.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));closeModal()}});
$("#newsletter-form").addEventListener("submit",event=>{
  event.preventDefault();const email=$("#newsletter-email").value.trim();
  if(email){toast("Demo obuna qabul qilindi: "+email);event.target.reset()}
});
$("#mobile-menu").addEventListener("click",()=>{$("#nav").classList.toggle("open")});
$$(".nav-link").forEach(link=>link.addEventListener("click",()=>$("#nav").classList.remove("open")));
document.addEventListener("keydown",event=>{if(event.key==="Escape")closeDrawers()});
renderProducts();renderCart();renderFavorites();
