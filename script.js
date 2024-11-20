"use strict";

// Function to toggle a specific dropdown and its content
function toggleDropdown(dropdownId, ...siblings) {
  const dropdown = document.getElementById(dropdownId);

  if (dropdown) {
    dropdown.classList.toggle("hidden");

    // Hide all sibling dropdowns
    siblings.forEach((siblingId) => {
      const siblingDropdown = document.getElementById(siblingId);
      if (siblingDropdown) siblingDropdown.classList.add("hidden");
    });

    // Ensure nested dropdowns are visible when parent is expanded
    if (!dropdown.classList.contains("hidden")) {
      dropdown.querySelectorAll(".nested-dropdown").forEach((child) => {
        child.classList.remove("hidden");
      });
    } else {
      // Hide all nested dropdowns when the parent is collapsed
      dropdown.querySelectorAll(".nested-dropdown").forEach((childDropdown) => {
        childDropdown.classList.add("hidden");
      });
    }
  }
}

// Function to close all dropdowns globally
function closeAllDropdowns() {
  document.querySelectorAll(".nav-list ul").forEach((dropdown) => {
    dropdown.classList.add("hidden");
    dropdown.querySelectorAll(".nested-dropdown").forEach((child) => {
      child.classList.add("hidden");
    });
  });
}

// Adjust sidebar for mobile view
function adjustSidebarForMobile() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const navBar = document.querySelector(".navBar");

  if (window.innerWidth <= 768) {
    sidebar.classList.add("hidden");
    sidebar.classList.remove("w-20", "w-64");
    mainContent.style.marginLeft = "0";
    navBar.classList.remove("ml-20");
  } else {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("w-20");
    sidebar.classList.remove("w-64");
    mainContent.style.marginLeft = "5rem";
    navBar.classList.add("ml-20");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("closeBtn");
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll(".nav-list a");
  const logo = document.getElementById("logo");

  // Expand Sidebar
  const expandSidebar = () => {
    sidebar.classList.remove("hidden");
    sidebar.classList.add("expand-animation");
    if (window.innerWidth <= 768) {
      sidebar.classList.add("w-64");
      mainContent.style.marginLeft = "0";
    } else {
      sidebar.classList.add("w-64");
      sidebar.classList.remove("w-20");
      mainContent.style.marginLeft = "16rem";
    }

    logo.classList.remove("opacity-0");
    closeBtn.classList.remove("hidden");
    hamburger.classList.add("hidden");
  };

  // Collapse Sidebar
  const collapseSidebar = () => {
    sidebar.classList.remove("expand-animation");

    setTimeout(() => {
      if (window.innerWidth <= 768) {
        sidebar.classList.add("hidden");
        mainContent.style.marginLeft = "0";
      } else {
        sidebar.classList.add("w-20");
        sidebar.classList.remove("w-64", "hidden");
        mainContent.style.marginLeft = "5rem";
      }
    }, 300);

    logo.classList.add("opacity-0");
    closeBtn.classList.add("hidden");
    hamburger.classList.remove("hidden");
    closeAllDropdowns();
  };

  // Event Listeners for sidebar buttons
  hamburger.addEventListener("click", expandSidebar);
  closeBtn.addEventListener("click", collapseSidebar);

  // Expand sidebar on nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (sidebar.classList.contains("w-20")) {
        e.preventDefault();
        expandSidebar();
      }
    });
  });

  // Collapse sidebar when clicking outside it
  document.addEventListener("click", (e) => {
    const isClickInsideSidebar = sidebar.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);

    if (
      !isClickInsideSidebar &&
      !isClickOnHamburger &&
      !sidebar.classList.contains("hidden")
    ) {
      collapseSidebar();
    }
  });

  // Dropdown toggle
  document.querySelectorAll(".nav-list button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const dropdownId = button.dataset.target;
      const siblingIds = button.dataset.siblings
        ? button.dataset.siblings.split(",")
        : [];

      toggleDropdown(dropdownId, ...siblingIds);
    });
  });

  // Adjust sidebar for window resizing
  window.addEventListener("resize", adjustSidebarForMobile);

  // Initial adjustment
  adjustSidebarForMobile();
});

// Charts Initialization
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { threshold: 0.3 };
  const sections = [
    {
      id: "buyer-orders-section",
      canvas: "buyerOrdersChart",
      config: "buyerOrders",
    },
    {
      id: "purchase-indents-section",
      canvas: "purchaseIndentsChart",
      config: "purchaseIndents",
    },
    {
      id: "other-issues-section",
      canvas: "otherIssuesChart",
      config: "otherIssues",
    },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = sections.find((s) => s.id === entry.target.id);
        if (section) renderChart(section.id, section.canvas, section.config);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) observer.observe(element);
  });
});

// Chart rendering
const chartColors = {
  buyerOrders: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"],
  purchaseIndents: ["#34D399", "#10B981", "#6EE7B7", "#22C55E"],
  otherIssues: ["#3B82F6", "#F87171"],
};

const chartConfigs = {
  buyerOrders: {
    type: "pie",
    data: {
      labels: [
        "Total Orders",
        "Total Dispatched",
        "Total Pending",
        "Total Delayed POs",
      ],
      datasets: [
        {
          label: "Buyer Orders",
          data: [18, 1, 18, 10],
          backgroundColor: chartColors.buyerOrders,
          hoverBackgroundColor: chartColors.buyerOrders.map(
            (color) => color + "AA"
          ),
        },
      ],
    },
  },
  purchaseIndents: {
    type: "bar",
    data: {
      labels: [
        "Total Indents",
        "Total Received",
        "Pending",
        "Without Indent Received",
      ],
      datasets: [
        {
          label: "Purchase Indents",
          data: [7, 6, 2, 2],
          backgroundColor: chartColors.purchaseIndents,
          hoverBackgroundColor: chartColors.purchaseIndents.map(
            (color) => color + "AA"
          ),
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: "top" } } },
  },
  otherIssues: {
    type: "line",
    data: {
      labels: ["Weaving Delays", "Dyeing Delays"],
      datasets: [
        {
          label: "Other Issues",
          data: [811, 3],
          borderColor: chartColors.otherIssues,
          backgroundColor: chartColors.otherIssues.map((color) => color + "33"),
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: { responsive: true, plugins: { legend: { position: "top" } } },
  },
};

// Initialize charts
const charts = {};

function renderChart(sectionId, canvasId, configKey) {
  if (charts[configKey]) return;
  const ctx = document.getElementById(canvasId).getContext("2d");
  charts[configKey] = new Chart(ctx, chartConfigs[configKey]);
}

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = { threshold: 0.3 };
  const sections = [
    {
      id: "buyer-orders-section",
      canvas: "buyerOrdersChart",
      config: "buyerOrders",
    },
    {
      id: "purchase-indents-section",
      canvas: "purchaseIndentsChart",
      config: "purchaseIndents",
    },
    {
      id: "other-issues-section",
      canvas: "otherIssuesChart",
      config: "otherIssues",
    },
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = sections.find((s) => s.id === entry.target.id);
        if (section) renderChart(section.id, section.canvas, section.config);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) observer.observe(element);
  });
});

// Initial sidebar adjustment
window.addEventListener("resize", adjustSidebarForMobile);
document.addEventListener("DOMContentLoaded", adjustSidebarForMobile);
