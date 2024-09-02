const Products = () => {
  const template = `
    <header class="header">
        <div class="nav-werraper">
          <h1>Product Filter</h1>
          <!-- Search box -->
          <div class="search-box">
              <form action="" onsubmit="return false">
                  <input type="text" id="search" placeholder="Search Product">
                  <!-- <button id="btn-search">Search</button> -->
              </form>
          </div>
        </div>
  </header>
    <!-- header -->

    <!-- products -->
    <section class="products">
        <div class="products-werraper"></div>
    </section>
  `;

  // بعد از رندر شدن صفحه، این تابع اجرا می‌شود
  setTimeout(() => {
    const searchinput = document.querySelector("#search");
    const productsWerraper = document.querySelector(".products-werraper");
    let allProduct = [];
    const filters = {
      title: "",
    };

    axios
      .get("http://localhost:3000/items")
      .then((res) => {
        allProduct = res.data;
        generateProduct(allProduct, filters);
      })
      .catch((err) => console.log(err));

    searchinput.addEventListener("input", (e) => {
      filters.title = e.target.value;
      generateProduct(allProduct, filters);
    });
    function generateProduct(_products, _filter) {
      const filterProduct = _products.filter((p) => {
        return p.title.toLowerCase().trim().includes(_filter.title.toLowerCase().trim());
      });
      productsWerraper.innerHTML = "";
      filterProduct.forEach((item) => {
        const productElem = document.createElement("div");
        productElem.classList.add("product");
        productElem.innerHTML = `
          <div class="product">
            <div class="img-container">
              <img src="${item.image}" class="product-img" />
            </div>
            <div class="product-desc">
              <p class="product-price">${item.price}</p>
              <p class="product-title">${item.title}</p>
            </div>
          </div>
        `;
        productsWerraper.append(productElem);
      });
    }
  }, 0);

  return template;
};

export default Products;
