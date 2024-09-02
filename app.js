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
   const allRoutes = routes.map((item) => {
     return {
       route: item,
       isMatch: location.pathname === item.path,
     };
   });
   let match = allRoutes.find((item) => item.isMatch);

   if (!match) {
     match = {
       route: {path: "/not-found", view: NotFound},
       isMatch: true,
     };
   }
   contentMain.innerHTML = match.route.view();
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router();
}
toggelerSidebar.addEventListener("click", () => {
  nav.classList.toggle("nav--active");
});
document.addEventListener("DOMContentLoaded", () => {
  router();
  navLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(".nav__link--active").classList.remove("nav__link--active");
      item.classList.add("nav__link--active");
      navigateTo(e.target.href);
    });
  });
  updateNavClass();
});
window.addEventListener("popstate", router);

function updateNavClass() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    nav.classList.add("nav--active");
  } else {
    nav.classList.remove("nav--active");
  }
}
// هر بار که اندازه صفحه تغییر می‌کند
window.addEventListener("resize", updateNavClass);
