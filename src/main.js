"use strict";
import renderDashboard from "./dashboard/dashboard.js";
import { initCharts } from "./dashboard/chart.js";

document.addEventListener("DOMContentLoaded", () => {
  // Utility to close all dropdowns except the current
  function closeAllDropdowns(exceptId) {
    document.querySelectorAll(".nav-list ul").forEach((dropdown) => {
      if (dropdown.id !== exceptId) dropdown.classList.add("hidden");
    });
  }

  // Handle dropdown toggles
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-toggle='dropdown']");
    if (!target) return;

    event.preventDefault();
    const dropdownId = target.getAttribute("data-target");
    const dropdown = document.getElementById(dropdownId);

    if (dropdown) {
      const isHidden = dropdown.classList.toggle("hidden");
      if (!isHidden) {
        // Close other dropdowns
        closeAllDropdowns(dropdownId);
      }
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-list")) {
      closeAllDropdowns();
    }
  });
});

// Function to close siblings
function closeSiblings(siblingIds) {
  siblingIds.forEach((id) => {
    const sibling = document.getElementById(id);
    if (sibling) sibling.classList.add("hidden");
  });
}

// Dropdown Toggle Handler
document.addEventListener("click", (event) => {
  const target = event.target;

  // Check for dropdown toggle button
  if (target.matches("[data-toggle='dropdown']")) {
    event.preventDefault();

    const dropdownId = target.getAttribute("data-target");
    const siblingIds = target.getAttribute("data-siblings")?.split(",") || [];
    const dropdown = document.getElementById(dropdownId);

    if (dropdown) {
      // Toggle current dropdown
      const isHidden = dropdown.classList.toggle("hidden");

      // Close sibling dropdowns if toggling to visible
      if (!isHidden) {
        closeSiblings(siblingIds);
      }

      // Ensure nested dropdowns are visible when parent is expanded
      dropdown.querySelectorAll(".nested-dropdown").forEach((child) => {
        child.classList.remove("hidden");
      });
    }
  }
});

// Close all dropdowns when clicking outside
document.addEventListener("click", (e) => {
  const insideDropdown = e.target.closest("[data-toggle='dropdown']");
  const openDropdown = document.querySelectorAll(".nav-list ul:not(.hidden)");

  // If clicking outside all dropdowns
  if (!insideDropdown && openDropdown.length > 0) {
    openDropdown.forEach((dropdown) => dropdown.classList.add("hidden"));
  }
});

// Toggle Dropdown Function for sibling and sub-sibling handling
function toggleDropdown(dropdownId, ...siblings) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;

  const isHidden = dropdown.classList.toggle("hidden");

  // Update sibling dropdowns
  siblings.forEach((siblingId) => {
    const siblingDropdown = document.getElementById(siblingId);
    if (siblingDropdown) siblingDropdown.classList.add("hidden");
  });

  // Hide nested dropdowns if parent is closed
  if (isHidden) {
    dropdown.querySelectorAll(".nested-dropdown").forEach((child) => {
      child.classList.add("hidden");
    });
  } else {
    dropdown.querySelectorAll(".nested-dropdown").forEach((child) => {
      child.classList.remove("hidden");
    });
  }
}

// Close All Dropdowns Globally
function closeAllDropdowns() {
  document.querySelectorAll(".nav-list ul").forEach((dropdown) => {
    dropdown.classList.add("hidden");
    dropdown.querySelectorAll(".nested-dropdown").forEach((child) => {
      child.classList.add("hidden");
    });
  });
}

// Adjust Sidebar for Mobile
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
    mainContent.style.marginLeft = "4rem";
    navBar.style.marginLeft = "4rem";
  }
}

// Expand Sidebar
function expandSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const logo = document.getElementById("logo");
  const closeBtn = document.getElementById("closeBtn");
  const hamburger = document.getElementById("hamburger");
  const navBar = document.querySelector(".navBar");

  sidebar.classList.remove("hidden");
  sidebar.classList.add("expand-animation");
  if (window.innerWidth <= 768) {
    sidebar.classList.add("w-64");
    mainContent.style.marginLeft = "0";
    navBar.style.marginLeft = "0";
  } else {
    sidebar.classList.add("w-64");
    sidebar.classList.remove("w-20");
    mainContent.style.marginLeft = "16rem";
    navBar.style.marginLeft = "16rem";
  }

  logo.classList.remove("opacity-0");
  closeBtn.classList.remove("hidden");
  hamburger.classList.add("hidden");
}

// Collapse Sidebar
function collapseSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const logo = document.getElementById("logo");
  const closeBtn = document.getElementById("closeBtn");
  const hamburger = document.getElementById("hamburger");
  const navBar = document.querySelector(".navBar");

  sidebar.classList.remove("expand-animation");

  setTimeout(() => {
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hidden");
      mainContent.style.marginLeft = "0";
      navBar.style.marginLeft = "0";
    } else {
      sidebar.classList.add("w-20");
      sidebar.classList.remove("w-64", "hidden");
      mainContent.style.marginLeft = "4rem";
      navBar.style.marginLeft = "4rem";
    }
  }, 300);

  logo.classList.add("opacity-0");
  closeBtn.classList.add("hidden");
  hamburger.classList.remove("hidden");
  closeAllDropdowns();
}

// Destroy All Chart Instances
function destroyCharts() {
  if (Chart.helpers && Chart.helpers.instances) {
    Chart.helpers.each(Chart.instances, (chart) => {
      chart.destroy();
    });
  }
}

// Initialize Dashboard and Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  const closeBtn = document.getElementById("closeBtn");
  const navLinks = document.querySelectorAll(".nav-list a");
  const mainContent = document.getElementById("main-content");
  const dashboard = document.getElementById("Dashboard");

  // Handle dropdown toggles
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.matches("[data-toggle='dropdown']")) {
      event.preventDefault();
      const dropdownId = target.getAttribute("data-target");
      const siblingIds = target.getAttribute("data-siblings")?.split(",") || [];
      toggleDropdown(dropdownId, ...siblingIds);
    }
  });

  // Expand Sidebar
  hamburger.addEventListener("click", expandSidebar);

  // Collapse Sidebar
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

  // Adjust sidebar for window resizing
  window.addEventListener("resize", adjustSidebarForMobile);

  // Initial adjustment
  adjustSidebarForMobile();

  // Initially render dashboard content
  mainContent.innerHTML = renderDashboard();
  initCharts();

  // Render dashboard content when "Dashboard" is clicked
  dashboard.addEventListener("click", () => {
    mainContent.innerHTML = `<div class="spinner">Loading...</div>`;
    requestAnimationFrame(() => {
      destroyCharts();
      mainContent.innerHTML = renderDashboard();
      initCharts();
    });
  });
});



