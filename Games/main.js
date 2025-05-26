const select = document.getElementById("sortByName");
const categorySelect = document.getElementById("filterCategory");
const priceSelect = document.getElementById("filterPrice");
const searchInput = document.getElementById('searchInput');

const productsContainer = document.querySelector(".products");

function filterProducts() {
  const products = Array.from(productsContainer.querySelectorAll(".container"));

  const sortValue = select.value;
  const categoryValue = categorySelect.value;
  const priceValue = priceSelect.value;
  const searchTerm = searchInput.value.toLowerCase().trim();

  let min = 0, max = Infinity;
  if (priceValue) {
    [min, max] = priceValue.split("-").map(Number);
  }

  // الفلترة
  let filteredProducts = products.filter(product => {
    const productName = product.querySelector(".product-name").textContent.trim().toLowerCase();
    const productCategory = product.getAttribute("data-category");
    const productPrice = Number(product.getAttribute("data-price"));

    const nameMatch = productName.includes(searchTerm);
    const categoryMatch = categoryValue === "" || productCategory === categoryValue;
    const priceMatch = priceValue === "" || (productPrice >= min && productPrice <= max);

    return nameMatch && categoryMatch && priceMatch;
  });

  // الترتيب حسب الاسم
  if (sortValue === "A-Z") {
    filteredProducts.sort((a, b) => {
      const nameA = a.querySelector(".product-name").textContent.trim().toLowerCase();
      const nameB = b.querySelector(".product-name").textContent.trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  } else if (sortValue === "Z-A") {
    filteredProducts.sort((a, b) => {
      const nameA = a.querySelector(".product-name").textContent.trim().toLowerCase();
      const nameB = b.querySelector(".product-name").textContent.trim().toLowerCase();
      return nameB.localeCompare(nameA);
    });
  }

  // عرض النتائج
  products.forEach(product => product.style.display = 'none');
  filteredProducts.forEach(product => product.style.display = 'block');
}

// الأحداث
select.addEventListener("change", filterProducts);
categorySelect.addEventListener("change", filterProducts);
priceSelect.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

filterProducts();

const resetButton = document.getElementById("resetFilters");

resetButton.addEventListener("click", () => {
  select.value = "";
  categorySelect.value = "";
  priceSelect.value = "";

  searchInput.value = "";

  const products = productsContainer.querySelectorAll(".container");

  products.forEach(product => {
    product.style.display = "block";
  });

  const originalOrder = Array.from(products);
  productsContainer.innerHTML = "";
  originalOrder.forEach(product => productsContainer.appendChild(product));
});


// Show More Products

const showMoreProducts = document.querySelector('.products');
const showMoreBtn = document.querySelector('.show-more');
const products = Array.from(showMoreProducts.querySelectorAll('.container'));

const columns = 4; 
const rowsPerClick = 2; 
let itemsPerPage = columns * rowsPerClick;
let currentVisible = 0;

// إخفاء كل العناصر في البداية
products.forEach(product => product.style.display = 'none');

// أول تحميل - عرض أول دفعة
function showNextBatch() {
  const nextVisible = currentVisible + itemsPerPage;

  for (let i = currentVisible; i < nextVisible && i < products.length; i++) {
    products[i].style.display = 'block';
  }

  currentVisible = nextVisible;

  // لو عرضنا كل العناصر نخفي الزرار
  if (currentVisible >= products.length) {
    showMoreBtn.style.display = 'none';
  }
}

// أول مرة
showNextBatch();

// عند الضغط على Show more
showMoreBtn.addEventListener('click', showNextBatch);
