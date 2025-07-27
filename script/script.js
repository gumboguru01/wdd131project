// ========== DOM Selectors ==========
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('nameInput');
const blogPreview = document.getElementById('blogPreviewContainer');
const blogContainer = document.getElementById('blogContainer');
const yearFilter = document.getElementById('yearFilter');
const formResponse = document.getElementById('formResponse');

// ========== Theme Toggle ==========
function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
}
applyTheme();

// ========== Greeting with localStorage ==========
function saveName() {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('username', name);
        showGreeting();
    }
}

function showGreeting() {
    const name = localStorage.getItem('username');
    if (name && greeting) {
        greeting.textContent = `Welcome back, ${name}! 💖`;
    }
}
if (greeting) showGreeting();

// ========== Blog Posts ==========
const blogPosts = [
    {
        title: "Matched on Murudo, Married in 6 Months 💍",
        content: "We were matched through AI suggestions and instantly clicked. Murudo gave us the confidence to meet in person. 6 months later, we're engaged!",
        image: "img/couple1.jpg",
        year: 2024
    },
    {
        title: "Blind Chat Turned Real Love 😍",
        content: "I was nervous at first, but blind chat mode made it easy. After chatting anonymously, I realized I’d found someone amazing.",
        image: "img/couple2.jpg",
        year: 2023
    },
    {
        title: "I Found My Person Across Borders 🌍",
        content: "Murudo helped me connect with someone in another country. We bonded over video profiles and now visit each other regularly.",
        image: "img/couple3.jpg",
        year: 2025
    }
];

// ========== Render Blog Cards ==========
function renderBlogs(filterYear = "all") {
    const container = blogContainer || blogPreview;
    if (!container) return;

    container.innerHTML = ""; // Clear previous

    const filtered = filterYear === "all"
        ? blogPosts
        : blogPosts.filter(post => post.year.toString() === filterYear);

    filtered.forEach(post => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" loading="lazy">
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>${post.year}</small>
    `;
        container.appendChild(card);
    });
}

// ========== Filter by Year ==========
if (yearFilter) {
    yearFilter.addEventListener('change', () => {
        renderBlogs(yearFilter.value);
    });
}

// ========== Initial Blog Render ==========
if (blogContainer || blogPreview) renderBlogs();

// ========== Contact Form Handler (Optional Enhancement) ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        formResponse.textContent = "Thank you! We'll get back to you soon.";
        contactForm.reset();
    });
}
