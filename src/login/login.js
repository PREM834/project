"use strict";

// Get references to the DOM elements
const showHidePass = document.getElementById("showHidePassword");
const userPassword = document.getElementById("password");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const contentArea = document.getElementById("content");
const loginCard = document.getElementById("loginCard");

// Users with ID, passwords, and roles
const users = {
  101: {
    username: "admin@gmail.com",
    password: "123456",
    role: "Administrator",
  },
  102: {
    username: "prodUser@gmail.com",
    password: "prodPass",
    role: "Production",
  },
  103: {
    username: "rawUser@gmail.com",
    password: "rawPass",
    role: "Raw Material",
  },
  104: {
    username: "packUser@gmail.com",
    password: "packPass",
    role: "Packing",
  },
  105: {
    username: "contractUser@gmail.com",
    password: "contractPass",
    role: "Contractor",
  },
};

// Roles and their permissions
const rolePermissions = {
  Administrator: {
    canAccess: ["dashboard", "settings", "manageUsers", "reports"],
  },
  Production: {
    canAccess: ["dashboard", "productionSchedule", "inventory"],
  },
  "Raw Material": {
    canAccess: ["dashboard", "inventory", "rawMaterialManagement"],
  },
  Packing: {
    canAccess: ["dashboard", "packingSchedule", "qualityControl"],
  },
  Contractor: {
    canAccess: ["dashboard", "taskManagement", "reports"],
  },
};

// Toggle password visibility
showHidePass.addEventListener("click", function () {
  const showHideAttr = userPassword.getAttribute("type");
  if (showHideAttr === "password") {
    userPassword.setAttribute("type", "text");
  } else {
    userPassword.setAttribute("type", "password");
  }
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});

// Login function
loginButton.addEventListener("click", function (event) {
  event.preventDefault(); 

  const username = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const user = Object.values(users).find((u) => u.username === username);

  if (user) {
    // Validate password
    if (user.password === password) {
      console.log(`Welcome ${username}!`);
      console.log(`Role: ${user.role}`);
      
      loginCard.style.display = "none";
      contentArea.classList.remove("hidden");

      // Display role-based content in contentArea
    //   displayUserContent(user.role);

    } else {
      console.error("Invalid password. Access denied.");
    }
  } else {
    console.error("User not found. Access denied.");
  }
});

// Function to display content based on the user's role
// function displayUserContent(role) {
//   // Get the permissions for the user's role
//   const permissions = rolePermissions[role].canAccess;
  
//   // Update the contentArea with personalized content
//   contentArea.innerHTML = `
//     <h2>Welcome, ${role}!</h2>
//     <p>You have access to the following features:</p>
//     <ul>
//       ${permissions.map(permission => `<li>${permission}</li>`).join('')}
//     </ul>
//   `;
// }
