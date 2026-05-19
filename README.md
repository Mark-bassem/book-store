# Book Store

A responsive, JSON-driven **Book Store** front-end built with **HTML, CSS, and vanilla JavaScript**. It renders featured books, arrivals, customer reviews, and blog posts using local JSON data files and displays everything in polished **Swiper** carousels.

> Note: This is a front-end/static project. There is no backend or checkout flow.

---

## Features

- **Responsive layout** (desktop + mobile)
- **Dynamic content** loaded from:
  - `products.json` (Featured + Arrivals)
  - `reviews.json` (Customer Reviews)
  - `blogs.json` (Blogs)
- **Swiper-powered sliders** for:
  - Home hero books
  - Featured books
  - New arrivals (2 sliders)
  - Reviews
  - Blogs
- **Interactive UI**:
  - Search bar toggle
  - Login modal toggle
  - Sticky/active header on scroll
  - Loader overlay on page load

---

## Tech Stack

- **HTML** (`index.html`)
- **CSS** (`css/style.css`)
- **JavaScript** (`js/script.js`)
- **Swiper** (loaded via CDN)
- **Font Awesome** (loaded via CDN)

---

## Project Structure

```text
Book Store/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ script.js
├─ img/
│  └─ (all images used by the UI + JSON)
├─ products.json
├─ reviews.json
└─ blogs.json
```

---

## How to Run Locally

Because the app uses `fetch()` to load JSON files, you should run it from a **local server** (not by double-clicking the HTML file).

### Option 1: Use a simple local server (recommended)

If you have Python installed:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

### Option 2: Any local static server

Use any tool that serves the folder over HTTP (VS Code Live Server, etc.).

---

## How It Works

- `js/script.js` fetches JSON files from the project root:
  - `products.json`
  - `reviews.json`
  - `blogs.json`
- It then generates the required Swiper slides by inserting HTML into the corresponding wrappers:
  - `#home-books-wrapper`
  - `#featured-wrapper`
  - `#books-1-6` and `#books-7-11`
  - `#reviews-wrapper`
  - `#blogs-wrapper`

---

## Customization

### Update books / reviews / blogs

Edit these files:

- `products.json`
  - Uses `featuredBooks[]` with fields: `id`, `name`, `price`, `oldPrice`, `image`
- `reviews.json`
  - Uses `reviews[]` with fields: `id`, `name`, `image`, `text`, `stars`
- `blogs.json`
  - Uses `blogs[]` with fields: `id`, `title`, `image`, `text`, `link`

### Add images

Place images into `img/` and reference them in the JSON using paths like:

- `img/book1.jpg`

---

## Troubleshooting

### `fetch()` fails / empty sections

If you open `index.html` directly via `file://` URLs, the browser may block requests to JSON files.

**Fix:** serve the project folder via a local HTTP server (see “How to Run Locally”).

---

## License

All Rights Reserved.

