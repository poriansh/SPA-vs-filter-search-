import Dashboard from "./pages/Dashboard.js";
import Posts from "./pages/Posts.js";
import Products from "./pages/Products.js";
import NotFound from "./pages/NotFound.js";
const contentMain = document.querySelector("#app");
const navLinks = document.querySelectorAll(".nav__link");
const nav = document.querySelector(".nav");
const toggelerSidebar = document.querySelector(".sidebar-toggler");
function router(params) {
  const routes = [
    {path: "/", view: Dashboard},
    {path: "/posts", view: Posts},
    {path: "/products", view: Products},
  ];
   const match = routes.find((item) => location.pathname === item.path);

   if (!match) {
     contentMain.innerHTML = NotFound();
   } else {
     contentMain.innerHTML = match.view();
   }

   // بعد از اضافه کردن محتوای جدید به DOM، اسکریپت‌های مرتبط با آن را اجرا می‌کنیم
   setTimeout(() => {
     if (location.pathname === "/products") {
       const Products = match.view; // استفاده از صفحه Products
       Products(); // فراخوانی و اجرای توابع مرتبط با این صفحه
     }
   }, 0);
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
toggelerSidebar.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
});
document.addEventListener("DOMContentLoaded", () => {
  router();
  navLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo(e.target.href);
    });
  });
  updateNavClass();
});
window.addEventListener("popstate", router);

function updateNavClass() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    nav.classList.add("nav-active");
  } else {
    nav.classList.remove("nav-active");
  }
}
// هر بار که اندازه صفحه تغییر می‌کند
window.addEventListener("resize", updateNavClass);
