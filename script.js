'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");
  const mainContent = document.getElementById("mainContent");

  // Function to close the sidebar
  const closeSidebar = () => {
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("static");
    mainContent.classList.remove("ml-64");
    hamburger.classList.remove("hidden");
  };

  // Open Sidebar
  hamburger.addEventListener("click", () => {
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("static");
    mainContent.classList.add("ml-64");
    hamburger.classList.add("hidden");
  });

  // Close Sidebar on Close Button Click
  closeBtn.addEventListener("click", closeSidebar);

  // Close Sidebar on Main Content Click
  mainContent.addEventListener("click", () => {
    if (!sidebar.classList.contains("-translate-x-full")) {
      closeSidebar();
    }
  });
});




function toggleDropdown(dropdownId, ...siblings) {
  // Get the clicked dropdown element
  const dropdown = document.getElementById(dropdownId);

  if (siblings.length > 0) {
    siblings.forEach(siblingId => {
      const siblingDropdown = document.getElementById(siblingId);
      if (siblingDropdown) siblingDropdown.classList.add("hidden");
    });
  }

  dropdown.classList.toggle("hidden");
}
