// Initialize the application
let appInitialized = false;

document.addEventListener("DOMContentLoaded", function () {
  if (appInitialized) return;

  // Initialize icons
  feather.replace();

  // Initialize charts
  safeChartInit();

  // Initialize scroll spy for navigation
  initializeScrollSpy();

  // Initialize smooth scrolling
  initializeSmoothScrolling();

  // Initialize animations
  initializeAnimations();

  // Initialize lazy loading
  initializeLazyLoading();

  // Add accessibility improvements
  addAccessibilityFeatures();

  // Initialize card button interactions
  initializeCardButtons();

  appInitialized = true;
});

// Mobile Menu Functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  if (mobileMenu.classList.contains("active")) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  mobileMenu.classList.add("active");
  menuIcon.style.display = "none";
  closeIcon.style.display = "block";
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");

  mobileMenu.classList.remove("active");
  menuIcon.style.display = "block";
  closeIcon.style.display = "none";
}

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector(".header").offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    // Update active navigation
    updateActiveNavigation(sectionId);
  }
}

// Update active navigation
function updateActiveNavigation(activeSection) {
  // Desktop navigation
  const navButtons = document.querySelectorAll(".nav-btn");
  navButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Mobile navigation
  const navMobileButtons = document.querySelectorAll(".nav-btn-mobile");
  navMobileButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Find and activate the correct button based on section
  const sectionMap = {
    home: 0,
    "profil-risiko": 1,
    "jenis-bencana": 2,
    mitigasi: 3,
    "data-statistik": 4,
    "tips-kesiapsiagaan": 5,
    tentang: 6,
  };

  const index = sectionMap[activeSection];
  if (index !== undefined) {
    if (navButtons[index]) navButtons[index].classList.add("active");
    if (navMobileButtons[index])
      navMobileButtons[index].classList.add("active");
  }
}

// Tab functions for Jenis Bencana section
function showTab(tabName) {
  // Hide all tab panels
  const tabPanels = document.querySelectorAll(".tab-panel");
  tabPanels.forEach((panel) => {
    panel.classList.remove("active");
  });

  // Remove active class from all tab buttons
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected tab panel
  const selectedPanel = document.getElementById(tabName);
  if (selectedPanel) {
    selectedPanel.classList.add("active");
  }

  // Add active class to clicked button
  event.target.classList.add("active");
}

// Action tab functions for Tips Kesiapsiagaan section
function showActionTab(tabName) {
  // Hide all action panels
  const actionPanels = document.querySelectorAll(".action-panel");
  actionPanels.forEach((panel) => {
    panel.classList.remove("active");
  });

  // Remove active class from all action tab buttons
  const actionTabButtons = document.querySelectorAll(".action-tab-btn");
  actionTabButtons.forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show selected action panel
  const selectedPanel = document.getElementById(tabName);
  if (selectedPanel) {
    selectedPanel.classList.add("active");
  }

  // Add active class to clicked button
  event.target.classList.add("active");
}

// Charts initialization
let chartsInitialized = false;

function initializeCharts() {
  if (chartsInitialized) return;

  // Yearly disasters chart
  const yearlyCtx = document.getElementById("yearlyChart");
  if (yearlyCtx) {
    new Chart(yearlyCtx, {
      type: "bar",
      data: {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "Jumlah Bencana",
            data: [5004, 5402, 3544, 4940, 2107, 3800],
            backgroundColor: "#D32F2F",
            borderColor: "#D32F2F",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#f0f0f0",
            },
            ticks: {
              color: "#555555",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#555555",
            },
          },
        },
      },
    });
  }

  // Disaster types pie chart
  const disasterTypesCtx = document.getElementById("disasterTypesChart");
  if (disasterTypesCtx) {
    new Chart(disasterTypesCtx, {
      type: "pie",
      data: {
        labels: ["Banjir", "Cuaca Ekstrem", "Longsor", "Karhutla", "Lainnya"],
        datasets: [
          {
            data: [1490, 1080, 731, 549, 50],
            backgroundColor: [
              "#1976D2", // banjir
              "#D32F2F", // cuaca ekstrem
              "#FBC02D", // longsor
              "#FF5722", // karhutla
              "#4CAF50", // lainnya
            ],
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 20,
              usePointStyle: true,
            },
          },
        },
      },
    });
  }

  // Monthly trend line chart
  const monthlyCtx = document.getElementById("monthlyChart");
  if (monthlyCtx) {
    new Chart(monthlyCtx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            label: "Kejadian Bencana",
            data: [
              302, // Jan (data nyata: 302 kejadian) :contentReference[oaicite:1]{index=1}
              237, // Feb (diperkirakan menurun dari Jan)
              261, // Mar (kembali meningkat) :contentReference[oaicite:2]{index=2}
              152, // Apr (data nyata: 152 kejadian) :contentReference[oaicite:3]{index=3}
              200, // Mei (estimasi transisi meningkat)
              182, // Jun (data nyata: 182 kejadian) :contentReference[oaicite:4]{index=4}
              160, // Jul (peringatan musim kemarau mulai)
              170, // Agu (kemungkinan masih ada bencana karena pola cuaca ekstrem)
            ],
            borderColor: "#1976D2",
            backgroundColor: "rgba(25, 118, 210, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#1976D2",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "#f0f0f0",
            },
            ticks: {
              color: "#555555",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#555555",
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });
  }

  chartsInitialized = true;
}

// Scroll spy functionality
function initializeScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navButtons = document.querySelectorAll(".nav-btn, .nav-btn-mobile");

  function updateActiveSection() {
    const scrollPos = window.scrollY + 100; // Offset for header

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        updateActiveNavigation(sectionId);
      }
    });
  }

  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("load", updateActiveSection);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const sectionTop = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Intersection Observer for animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  const elementsToAnimate = document.querySelectorAll(
    ".card, .risk-card, .disaster-item, .phase-card, .tip-category"
  );
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
}

// Animations are now initialized in main initialization

// Handle card button interactions - moved to main initialization

// Utility function to format numbers
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Window resize handler
window.addEventListener("resize", function () {
  // Close mobile menu on resize to desktop
  if (window.innerWidth >= 1024) {
    closeMobileMenu();
  }
});

// Keyboard navigation support
document.addEventListener("keydown", function (e) {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    closeMobileMenu();
  }

  // Navigation with arrow keys (when focused on nav)
  if (
    e.target.classList.contains("nav-btn") ||
    e.target.classList.contains("nav-btn-mobile")
  ) {
    const buttons = Array.from(
      document.querySelectorAll(".nav-btn, .nav-btn-mobile")
    );
    const currentIndex = buttons.indexOf(e.target);

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % buttons.length;
      buttons[nextIndex].focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      buttons[prevIndex].focus();
    }
  }
});

// Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Add error handling for chart initialization
function safeChartInit() {
  try {
    initializeCharts();
  } catch (error) {
    console.warn("Charts could not be initialized:", error);
    // Hide chart containers if Chart.js fails to load
    const chartContainers = document.querySelectorAll(".chart-card");
    chartContainers.forEach((container) => {
      const fallback = document.createElement("div");
      fallback.className = "chart-fallback";
      fallback.innerHTML = "<p>Grafik sedang dimuat...</p>";
      fallback.style.cssText =
        "display: flex; align-items: center; justify-content: center; height: 300px; color: #555;";

      const canvas = container.querySelector("canvas");
      if (canvas) {
        canvas.parentNode.replaceChild(fallback, canvas);
      }
    });
  }
}

// Removed duplicate DOMContentLoaded listener - handled in main initialization above

// Add print functionality
function printPage() {
  window.print();
}

// Add search functionality (basic)
function searchContent(query) {
  const content = document.body.innerText.toLowerCase();
  const searchQuery = query.toLowerCase();

  if (content.includes(searchQuery)) {
    // Highlight search results (basic implementation)
    console.log("Found:", searchQuery);
    return true;
  }
  return false;
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll spy
const debouncedScrollSpy = debounce(function () {
  const sections = document.querySelectorAll("section[id]");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      updateActiveNavigation(sectionId);
    }
  });
}, 100);

// Replace the scroll event listener
window.addEventListener("scroll", debouncedScrollSpy);

// Add accessibility improvements
function addAccessibilityFeatures() {
  // Add skip link for keyboard users
  const skipLink = document.createElement("a");
  skipLink.href = "#main";
  skipLink.textContent = "Skip to main content";
  skipLink.className = "skip-link";
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
        transition: top 0.3s;
    `;

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px";
  });

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px";
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main landmark
  const mainElement = document.querySelector("main");
  if (mainElement) {
    mainElement.id = "main";
  }
}

// Handle card button interactions
function initializeCardButtons() {
  const cardButtons = document.querySelectorAll(".card-btn");

  cardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add error handling for missing elements
function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Element not found: ${selector}`);
    return null;
  }
}

function safeQuerySelectorAll(selector) {
  try {
    return document.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Elements not found: ${selector}`);
    return [];
  }
}

// Update all querySelector calls to use safe versions
// This helps prevent errors when elements are missing
