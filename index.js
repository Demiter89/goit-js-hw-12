import{a as m,i as c,S as h}from"./assets/vendor-DEenWwFD.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();const f=e=>`<li class="gallery-card">
            <article class="card">
            <a class="gallery-link" href="${e.largeImageURL}" target="_blank" rel="noopener noreferrer">
              <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
            </a>
            <div class="gallery-container">
              <div class="gallery-item">
                <p class="gallery-title">Likes</p>
                <p class="gallery-count">${e.likes}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Views</p>
                <p class="gallery-count">${e.views}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Comments</p>
                <p class="gallery-count">${e.comments}</p>
              </div>
              <div class="gallery-item">
                <p class="gallery-title">Downloads</p>
                <p class="gallery-count">${e.downloads}</p>
              </div>
            </div>
          </article>
        </li>`,L="48302309-d155748c9a8bdc74060d05abe",v="https://pixabay.com/api/";async function b(e,s=1){try{const{data:a}=await m.get(v,{params:{key:L,q:e,image_type:"photo",page:s,per_page:15}});return a}catch(a){throw console.error("Error fetching data:",a.message),a}}const w=document.querySelector(".js-search-form"),n=document.querySelector(".js-gallery"),y=document.querySelector(".loader"),i=document.querySelector(".load-more");let o=1,u="";const S=async e=>{if(e.preventDefault(),u=e.currentTarget.elements.user_query.value.trim(),!u){c.error({message:"Please enter your request",position:"topRight"}),g();return}q(),await p()},p=async()=>{y.classList.remove("is-hidden");try{const e=await b(u,o);if(e.total===0){c.error({message:"Sorry, there are no images matching your search query!",position:"topRight"}),g();return}const s=e.hits.map(l=>f(l)).join("");n.insertAdjacentHTML("beforeend",s),new h(".js-gallery a",{captionDelay:300,captionsData:"alt"}).refresh(),E(e.totalHits)}catch(e){console.error(e),c.error({message:"An error occurred. Please try again!",position:"topRight"})}finally{y.classList.add("is-hidden")}},q=()=>{o=1,g()},g=()=>{n.innerHTML="",i.classList.add("hidden")},E=e=>{const s=Math.ceil(e/15);n.children.length===0||o>=s?(i.classList.add("hidden"),o>=s&&o>1&&c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):i.classList.remove("hidden")},P=async()=>{o+=1,await p(),R()},R=()=>{const{height:e}=n.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})};w.addEventListener("submit",S);i.addEventListener("click",P);
//# sourceMappingURL=index.js.map
