document.addEventListener("DOMContentLoaded", () => {
  const showMoreProducts = document.querySelector(".products");
  const showMoreBtn = document.querySelector(".show-more");
  const select = document.getElementById("sortByName");
  const categorySelect = document.getElementById("filterCategory");
  const priceSelect = document.getElementById("filterPrice");
  const searchInput = document.getElementById("searchInput");
  const resetButton = document.getElementById("resetFilters");

  const rowsPerClick = 3;
  let itemsPerRow = 4;
  let itemsPerPage = itemsPerRow * rowsPerClick;
  let currentVisible = 0;
  let products = [];

  function hideAllProducts() {
    products.forEach((product) => (product.style.display = "none"));
  }

  function getFilteredProducts() {
    const sortValue = select.value;
    const categoryValue = categorySelect.value;
    const priceValue = priceSelect.value;
    const searchTerm = searchInput.value.toLowerCase().trim();

    let min = 0,
      max = Infinity;
    if (priceValue) {
      [min, max] = priceValue.split("-").map(Number);
    }

    let filteredProducts = products.filter((product) => {
      const productName =
        product
          .querySelector(".product-name")
          ?.textContent.trim()
          .toLowerCase() || "";
      const productCategory = product.getAttribute("data-category");
      const productPrice = Number(product.getAttribute("data-price"));

      const nameMatch = productName.includes(searchTerm);
      const categoryMatch =
        categoryValue === "" || productCategory === categoryValue;
      const priceMatch =
        priceValue === "" || (productPrice >= min && productPrice <= max);

      return nameMatch && categoryMatch && priceMatch;
    });

    if (sortValue === "A-Z") {
      filteredProducts.sort((a, b) => {
        const nameA =
          a.querySelector(".product-name")?.textContent.trim().toLowerCase() ||
          "";
        const nameB =
          b.querySelector(".product-name")?.textContent.trim().toLowerCase() ||
          "";
        return nameA.localeCompare(nameB, "ar");
      });
    } else if (sortValue === "Z-A") {
      filteredProducts.sort((a, b) => {
        const nameA =
          a.querySelector(".product-name")?.textContent.trim().toLowerCase() ||
          "";
        const nameB =
          b.querySelector(".product-name")?.textContent.trim().toLowerCase() ||
          "";
        return nameB.localeCompare(nameA, "ar");
      });
    }

    return filteredProducts;
  }

  function showNextBatch() {
    const filteredProducts = getFilteredProducts();
    const container = document.getElementById("games-container");

    container.innerHTML = "";

    let nextVisible = currentVisible + itemsPerPage;

    filteredProducts.forEach((product, index) => {
      if (index < nextVisible) {
        product.style.display = "block";
        container.appendChild(product);
      } else {
        product.style.display = "none";
      }
    });

    currentVisible = nextVisible;

    showMoreBtn.style.display =
      currentVisible >= filteredProducts.length ? "none" : "block";

    if (filteredProducts.length <= itemsPerPage) {
      showMoreProducts.classList.add("filtered");
    } else {
      showMoreProducts.classList.remove("filtered");
    }
  }

  function filterProducts() {
    currentVisible = 0;
    showNextBatch();
  }

  function applyCategoryFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get("category");

    if (
      selectedCategory &&
      categorySelect.querySelector(`option[value="${selectedCategory}"]`)
    ) {
      categorySelect.value = selectedCategory;
      filterProducts();
    }
  }

  fetch("../games.json")
    .then((res) => res.json())
    .then((games) => {
      const container = document.getElementById("games-container");
      const template = document.querySelector(".container");

      games.forEach((game) => {
        const clone = template.cloneNode(true);

        clone.dataset.category = game.Category;
        clone.dataset.price = game.Price;

        clone.querySelector("img#image").src = game.ImageUrl;
        clone.querySelector("img#image").alt = game.Title;

        clone.querySelector("#proName").textContent = game.Title;
        clone.querySelector("#proPrice").textContent = game.Price + "$";
        clone.querySelector("#proRate").textContent = game.Ratings + "%";
        clone.querySelector("#proDate").textContent = new Date(
          game.ReleaseDate
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        clone.querySelector(
          ".view-btn a"
        ).href = `../GameDetails/gameDetails.html?id=${game.Id}`;

        container.appendChild(clone);
      });

      template.remove();

      products = Array.from(showMoreProducts.querySelectorAll(".container"));

      if (products.length > 0) {
        showMoreBtn.style.display = "block";
        applyCategoryFromQuery();
        showNextBatch();
      } else {
        showMoreBtn.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
      showMoreBtn.style.display = "none";
    });

  select.addEventListener("change", filterProducts);
  categorySelect.addEventListener("change", filterProducts);
  priceSelect.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);

  resetButton.addEventListener("click", () => {
    select.value = "";
    categorySelect.value = "";
    priceSelect.value = "";
    searchInput.value = "";
    filterProducts();
  });

  showMoreBtn.addEventListener("click", showNextBatch);

});
