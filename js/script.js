searchForm = document.querySelector(".search-form");

document.querySelector("#search-btn").onclick = () => {
  searchForm.classList.toggle("active");
};

let loginForm = document.querySelector(".login-form-container");

document.querySelector("#login-btn").onclick = () => {
  loginForm.classList.toggle("active");
};

document.querySelector("#close-login-btn").onclick = () => {
  loginForm.classList.remove("active");
};

window.onscroll = () => {
  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }

  searchForm.classList.remove("active");
};

window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }
  fadeOut();
};

function loader() {
  document.querySelector(".loader-container").classList.add("active");
}

function fadeOut() {
  setTimeout(loader, 4000);
}

fetch("products.json")
  .then((res) => res.json())
  .then((data) => {
    const wrapper = document.getElementById("home-books-wrapper");

    const homeBooks = data.featuredBooks.slice(0, 6);

    wrapper.innerHTML = homeBooks
      .map(
        (book) => `
      <a href="#" title="${book.name}" class="swiper-slide">
        <img src="${book.image}" alt="${book.name} Cover">
      </a>
    `
      )
      .join("");

    new Swiper(".books-slider", {
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  })
  .catch((err) => console.error("Error loading home books:", err));

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    const wrapper = document.getElementById("featured-wrapper");

    // Insert slides dynamically
    wrapper.innerHTML = data.featuredBooks
      .map(
        (book) => `
      <div class="swiper-slide box">
        <div class="icons">
          <a href="#" class="fas fa-search" title="Search"></a>
          <a href="#" class="fas fa-heart" title="Favorites"></a>
          <a href="#" class="fas fa-eye" title="View"></a>
        </div>
        <div class="image">
          <img src="${book.image}" alt="${book.name} Cover">
        </div>
        <div class="content">
          <h3>${book.name}</h3>
          <div class="price">$${book.price} <span>$${book.oldPrice}</span></div>
          <a href="#" class="btn">Add to Cart</a>
        </div>
      </div>
    `
      )
      .join("");

    new Swiper(".featured-slider", {
      spaceBetween: 20,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        450: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  })
  .catch((error) => console.error("Error loading products:", error));

document.addEventListener("DOMContentLoaded", async () => {
  const PRODUCTS_JSON = "products.json";

  try {
    const res = await fetch(PRODUCTS_JSON, { cache: "no-store" });
    if (!res.ok)
      throw new Error(
        `Failed to fetch ${PRODUCTS_JSON}: ${res.status} ${res.statusText}`
      );
    const raw = await res.json();
    // support either array or object with featuredBooks key
    const books = Array.isArray(raw)
      ? raw
      : raw.featuredBooks || raw.books || [];
    console.log("[Arrivals] books loaded:", books.length, books);

    if (!books.length) {
      throw new Error(
        "No books found in products.json (check JSON structure)."
      );
    }

    // split
    const firstGroup = books.slice(0, 6); // Book1 – Book6
    const secondGroup = books.slice(6); // Book7 onwards

    fillWrapper("#books-1-6", firstGroup);
    fillWrapper("#books-7-11", secondGroup);

    // common breakpoints
    const breakpoints = {
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    };

    // initialize both swipers with loop enabled only if enough slides
    initSwiper(
      "#arrivals-slider-1",
      "#pagination-1",
      "#prev-1",
      "#next-1",
      firstGroup,
      breakpoints
    );
    initSwiper(
      "#arrivals-slider-2",
      "#pagination-2",
      "#prev-2",
      "#next-2",
      secondGroup,
      breakpoints
    );
  } catch (err) {
    console.error("[Arrivals] Error:", err);
    alert("Error loading arrivals. See console for details.");
  }

  // helpers
  function fillWrapper(wrapperSelector, items) {
    const wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) {
      console.warn("Wrapper not found:", wrapperSelector);
      return;
    }
    wrapper.innerHTML = items
      .map(
        (b) => `
        <a href="#" class="swiper-slide box">
          <div class="image"><img src="${escapeHtml(
            b.image || ""
          )}" alt="${escapeHtml(b.title || b.name || "book")}"></div>
          <div class="content">
            <h3>${escapeHtml(b.title || b.name || "Untitled")}</h3>
            <div class="price">$${(b.price || 0).toFixed(2)} <span>$${(
          b.oldPrice || 0
        ).toFixed(2)}</span></div>
            <div class="stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
            </div>
          </div>
        </a>
      `
      )
      .join("");
  }

  function maxSlidesFromBreakpoints(bp) {
    let max = 1;
    Object.values(bp).forEach((o) => {
      if (o.slidesPerView && o.slidesPerView > max) max = o.slidesPerView;
    });
    return max;
  }

  function initSwiper(
    containerSel,
    paginationEl,
    prevEl,
    nextEl,
    items,
    breakpoints
  ) {
    const maxSlides = maxSlidesFromBreakpoints(breakpoints);
    const shouldLoop = items.length > maxSlides;
    const options = {
      loop: shouldLoop,
      spaceBetween: 16,
      grabCursor: true,
      pagination: { el: paginationEl, clickable: true },
      navigation: { nextEl: nextEl, prevEl: prevEl },
      breakpoints: breakpoints,
    };
    const instance = new Swiper(containerSel, options);
    console.log(
      `[Arrivals] init ${containerSel} (slides=${items.length}) loop=${shouldLoop}`
    );
    return instance;
  }

  function escapeHtml(s) {
    return String(s || "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[c])
    );
  }
});

fetch("reviews.json")
  .then((res) => res.json())
  .then((data) => {
    const wrapper = document.getElementById("reviews-wrapper");

    data.reviews.forEach((review) => {
      let starsHtml = "";
      for (let i = 1; i <= 5; i++) {
        starsHtml +=
          i <= review.stars
            ? '<i class="fas fa-star"></i>'
            : '<i class="fas fa-star-half-alt"></i>';
      }

      const reviewCard = `
        <div class="swiper-slide box">
          <img src="${review.image}" alt="${review.name}" />
          <h3>${review.name}</h3>
          <p>${review.text}</p>
          <div class="stars">${starsHtml}</div>
        </div>
      `;
      wrapper.insertAdjacentHTML("beforeend", reviewCard);
    });

    new Swiper(".reviews-slider", {
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  })
  .catch((err) => console.error("Error loading reviews:", err));

fetch("blogs.json")
  .then((res) => res.json())
  .then((data) => {
    const wrapper = document.getElementById("blogs-wrapper");

    data.blogs.forEach((blog) => {
      const blogCard = `
        <div class="swiper-slide box">
          <div class="image">
            <img src="${blog.image}" alt="${blog.title}" />
          </div>
          <div class="content">
            <h3>${blog.title}</h3>
            <p>${blog.text}</p>
            <a href="${blog.link}" class="btn">Read More</a>
          </div>
        </div>
      `;
      wrapper.insertAdjacentHTML("beforeend", blogCard);
    });

    // Init Swiper
    new Swiper(".blogs-slider", {
      spaceBetween: 10,
      loop: true,
      grabCursor: true,
      centeredSlides: true,
      autoplay: {
        delay: 9500,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
  })
  .catch((err) => console.error("Error loading blogs:", err));