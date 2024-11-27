export function initCharts() {
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

  // Adjust chart size on window resize
  window.addEventListener('resize', () => {
    sections.forEach((section) => {
      const chartElement = document.getElementById(section.canvas);
      const chart = Chart.instances.find(c => c.canvas === chartElement);
      if (chart) {
        chart.resize();
      }
    });
  });
}

// Render a chart
function renderChart(sectionId, canvasId, configKey) {
  const ctx = document.getElementById(canvasId)?.getContext("2d");
  if (ctx) {
    const chart = new Chart(ctx, chartConfigs[configKey]);
    // Store the chart instance to adjust it later
    Chart.instances.push(chart);
  }
}

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
          backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"],
          hoverBackgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"].map(
            (color) => `${color}AA`
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
        "Total Pending",
        "Total Delayed",
      ],
      datasets: [
        {
          label: "Purchase Indents",
          data: [6, 1, 4, 1],
          backgroundColor: ["#34D399", "#10B981", "#6EE7B7", "#22C55E"],
          hoverBackgroundColor: ["#34D399", "#10B981", "#6EE7B7", "#22C55E"].map(
            (color) => `${color}AA`
          ),
        },
      ],
    },
  },
  otherIssues: {
    type: "line",
    data: {
      labels: ["Weaving Delays", "Dyeing Delays"],
      datasets: [
        {
          label: "Other Issues",
          data: [811, 3],
          borderColor: ["#3B82F6", "#F87171"],
          backgroundColor: ["#3B82F6", "#F87171"].map((color) => `${color}33`),
          fill: true,
          tension: 0.4,
        },
      ],
    },
  },
};

// Store chart instances
Chart.instances = [];

// Initialize charts when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initCharts();
});

// Function to handle dashboard click and render the charts again
const dashboard = document.getElementById("Dashboard");

dashboard.addEventListener("click", () => {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; // Clear current content

  // Inject new dashboard content
  const dashboardHTML = renderDashboard(); // Your renderDashboard function
  mainContent.innerHTML = dashboardHTML;

  // Reinitialize charts after content is injected
  setTimeout(() => {
    initCharts();
  }, 100); // Wait for the new content to be loaded
});

// Adjust chart canvas size based on window width, ensuring minimum size of 350px
function adjustCanvasSize() {
  const minWidth = 350; // Minimum width for the chart

  document.querySelectorAll('canvas').forEach((canvas) => {
    const width = window.innerWidth > minWidth ? window.innerWidth * 0.8 : minWidth;
    canvas.width = width;
  });
}

// Call adjustCanvasSize on window resize
window.addEventListener('resize', adjustCanvasSize);

// Initial adjustment of canvas size on page load
adjustCanvasSize();

