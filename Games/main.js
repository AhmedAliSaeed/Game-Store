document.addEventListener('DOMContentLoaded', () => {
    const showMoreProducts = document.querySelector('.products');
    const showMoreBtn = document.querySelector('.show-more');
    const select = document.getElementById("sortByName");
    const categorySelect = document.getElementById("filterCategory");
    const priceSelect = document.getElementById("filterPrice");
    const searchInput = document.getElementById('searchInput');
    const resetButton = document.getElementById("resetFilters");

    const rowsPerClick = 3; 
    const itemsPerPage = 12;
    let currentVisible = 0;
    let products = [];

    // إخفاء كل العناصر (نستخدمها فقط عند الفلترة أو الريست)
    function hideAllProducts() {
        products.forEach(product => product.style.display = 'none');
    }

    // الحصول على العناصر المفلترة
    function getFilteredProducts() {
        const sortValue = select.value;
        const categoryValue = categorySelect.value;
        const priceValue = priceSelect.value;
        const searchTerm = searchInput.value.toLowerCase().trim();

        let min = 0, max = Infinity;
        if (priceValue) {
            [min, max] = priceValue.split("-").map(Number);
        }

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

        return filteredProducts;
    }

    // عرض مجموعة العناصر التالية
    function showNextBatch() {
        const filteredProducts = getFilteredProducts();
        const nextVisible = currentVisible + itemsPerPage;

        console.log('Current Visible:', currentVisible, 'Next Visible:', nextVisible, 'Filtered Products:', filteredProducts.length);

        // عرض العناصر المفلترة من currentVisible لحد nextVisible
        for (let i = currentVisible; i < nextVisible && i < filteredProducts.length; i++) {
            filteredProducts[i].style.display = 'block';
        }

        currentVisible = nextVisible;

        // إخفاء أو إظهار زر Show More
        if (currentVisible >= filteredProducts.length) {
            showMoreBtn.style.display = 'none';
            console.log('Hiding Show More button: No more products');
        } else {
            showMoreBtn.style.display = 'block';
            console.log('Showing Show More button: More products available');
        }

        // تطبيق .filtered لو العناصر أقل من 4
        if (filteredProducts.length < 4) {
            showMoreProducts.classList.add('filtered');
        } else {
            showMoreProducts.classList.remove('filtered');
        }
    }

    // تحديث العرض بعد الفلترة
    function filterProducts() {
        hideAllProducts();
        currentVisible = 0;
        showNextBatch();
    }

    // تحميل العناصر من JSON
    fetch('../games.json')
        .then(res => res.json())
        .then(games => {
            const container = document.getElementById('games-container');
            const template = document.querySelector('.container');

            games.forEach(game => {
                const clone = template.cloneNode(true);

                clone.dataset.category = game.Category;
                clone.dataset.price = game.Price;

                clone.querySelector('img#image').src = game.ImageUrl;
                clone.querySelector('img#image').alt = game.Title;

                clone.querySelector('#proName').textContent = game.Title;
                clone.querySelector('#proPrice').textContent = game.Price + '$';
                clone.querySelector('#proRate').textContent = game.Ratings + '%';
                clone.querySelector('#proDate').textContent = new Date(game.ReleaseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

                clone.querySelector('.view-btn a').href = `./ProductDetails.html?id=${game.Id}`;

                container.appendChild(clone);
            });

            template.remove();

            // تحديث قائمة العناصر
            products = Array.from(showMoreProducts.querySelectorAll('.container'));
            console.log('Products Loaded:', products.length);

            // إظهار الدفعة الأولى
            if (products.length > 0) {
                showMoreBtn.style.display = 'block';
                filterProducts();
            } else {
                showMoreBtn.style.display = 'none';
                console.log('No products loaded, hiding Show More button');
            }
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
            showMoreBtn.style.display = 'none';
        });

    // الأحداث
    select.addEventListener("change", filterProducts);
    categorySelect.addEventListener("change", filterProducts);
    priceSelect.addEventListener("change", filterProducts);
    searchInput.addEventListener("input", filterProducts);

    resetButton.addEventListener("click", () => {
        select.value = "";
        categorySelect.value = "";
        priceSelect.value = "";
        searchInput.value = "";
        hideAllProducts();
        currentVisible = 0;
        showNextBatch();
    });

    // زر Show More
    showMoreBtn.addEventListener('click', showNextBatch);

    // تحديث عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        products = Array.from(showMoreProducts.querySelectorAll('.container'));
        hideAllProducts();
        currentVisible = 0;
        if (products.length > 0) {
            showMoreBtn.style.display = 'block';
            filterProducts();
        } else {
            showMoreBtn.style.display = 'none';
            console.log('No products on resize, hiding Show More button');
        }
    });

    // هامبرغر منيو
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    } else {
        console.log('Hamburger or nav not found');
    }
});