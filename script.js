"use strict";

function adjustSidebarForMobile() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");

  // Check the initial state of the sidebar
  if (window.innerWidth <= 768) {
    // If in mobile view, hide the sidebar and remove ml-20 or ml-64 from main content
    sidebar.classList.remove("w-20", "w-64"); // Remove any sidebar width classes
    sidebar.classList.add("hidden"); // Hide sidebar
    mainContent.classList.remove("ml-20", "ml-64"); // Remove both margin-left classes from main content
  } else {
    // If in desktop view, ensure the sidebar is visible
    sidebar.classList.remove("hidden"); // Ensure the sidebar is visible

    // Check the current width class and apply the appropriate margin
    if (sidebar.classList.contains("w-20")) {
      mainContent.classList.add("ml-20");
      mainContent.classList.remove("ml-64"); // Ensure ml-64 is removed
    } else if (sidebar.classList.contains("w-64")) {
      mainContent.classList.add("ml-64");
      mainContent.classList.remove("ml-20"); // Ensure ml-20 is removed
    }
  }
}

// Call the function on resize
window.addEventListener("resize", adjustSidebarForMobile);

// Call it initially when the DOM is loaded
document.addEventListener("DOMContentLoaded", adjustSidebarForMobile);

// Function to toggle dropdown visibility
function toggleDropdown(dropdownId, ...siblings) {
  const dropdown = document.getElementById(dropdownId);

  if (siblings.length > 0) {
    siblings.forEach((siblingId) => {
      const siblingDropdown = document.getElementById(siblingId);
      if (siblingDropdown) siblingDropdown.classList.add("hidden");
    });
  }

  dropdown.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("closeBtn");
  const mainContent = document.getElementById("main-content");
  const navLinks = document.querySelectorAll(".nav-list a");

  // Set the sidebar to collapsed initially
  if (window.innerWidth >= 768) {
    sidebar.classList.add("w-20");
    mainContent.classList.add("ml-20");
    logo.classList.add("opacity-0");
    closeBtn.classList.add("hidden");
  }

  // Expand Sidebar function
  const expandSidebar = () => {
    sidebar.classList.remove("w-20");
    sidebar.classList.add("w-64");
    mainContent.classList.remove("ml-20");
    mainContent.classList.add("ml-64");
    logo.classList.remove("opacity-0");
    closeBtn.classList.remove("hidden");
    hamburger.classList.add("hidden");
  };

  // Collapse Sidebar function
  const collapseSidebar = () => {
    sidebar.classList.add("w-20");
    sidebar.classList.remove("w-64");
    mainContent.classList.add("ml-20");
    mainContent.classList.remove("ml-64");
    logo.classList.add("opacity-0");
    closeBtn.classList.add("hidden");
    hamburger.classList.remove("hidden");

    // Hide all dropdowns when collapsing the sidebar
    const dropdowns = document.querySelectorAll("ul[id^='dropdown']");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.add("hidden");
    });
  };

  // Hamburger click handler for opening the sidebar
  hamburger.addEventListener("click", expandSidebar);

  // Close button click handler for collapsing the sidebar
  closeBtn.addEventListener("click", collapseSidebar);

  // Expand sidebar when clicking on any nav link if collapsed
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      if (sidebar.classList.contains("w-20")) {
        e.preventDefault();
        expandSidebar();
      }
    });
  });

  // Collapse sidebar when clicking outside of the sidebar (on main content or section)
  mainContent.addEventListener("click", () => {
    if (sidebar.classList.contains("w-64")) {
      collapseSidebar();
    }
  });

  // Handle the section or content click to collapse the sidebar
  const sectionContent = document.querySelector("section");
  if (sectionContent) {
    sectionContent.addEventListener("click", () => {
      if (sidebar.classList.contains("w-64")) {
        collapseSidebar();
      }
    });
  }

  // Functionality for handling dropdown click events
  document.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      // Check if the link is a dropdown toggle (based on your structure)
      if (
        a.nextElementSibling &&
        a.nextElementSibling.classList.contains("hidden")
      ) {
        // Prevent the default link action
        e.preventDefault();

        // Check if the sidebar is collapsed (and expand it)
        if (sidebar.classList.contains("w-20")) {
          expandSidebar();
        }

        // Toggle the dropdown and hide siblings
        const dropdownId = a.getAttribute("onclick").match(/'([^']+)'/)[1];
        toggleDropdown(
          dropdownId,
          ...a
            .getAttribute("onclick")
            .match(/'([^']+)'/g)
            .map((val) => val.replace(/'/g, "").replace(dropdownId, ""))
        );
      }
    });
  });
});

// Chart

// Define chart colors
const chartColors = {
  buyerOrders: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"],
  purchaseIndents: ["#34D399", "#10B981", "#6EE7B7", "#22C55E"],
  otherIssues: ["#3B82F6", "#F87171"],
};

// Chart Data
const buyerOrdersData = {
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
};

const purchaseIndentsData = {
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
};

const otherIssuesData = {
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
};

// Chart Configurations
const configs = {
  buyerOrders: {
    type: "pie",
    data: buyerOrdersData,
  },
  purchaseIndents: {
    type: "bar",
    data: purchaseIndentsData,
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
    },
  },
  otherIssues: {
    type: "line",
    data: otherIssuesData,
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
    },
  },
};

// Chart Instances
const charts = {
  buyerOrders: null,
  purchaseIndents: null,
  otherIssues: null,
};

// Render Chart
function renderChart(section, canvasId, configKey) {
  if (charts[configKey]) return; // Prevent re-rendering if already initialized
  const ctx = document.getElementById(canvasId).getContext("2d");
  charts[configKey] = new Chart(ctx, configs[configKey]);
}

// Intersection Observer
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

// Observe each section
sections.forEach((section) => {
  const element = document.getElementById(section.id);
  observer.observe(element);
});
