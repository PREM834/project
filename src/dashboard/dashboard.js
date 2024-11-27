export default () => {
  return ` <div class="container mx-auto">
        <!-- Section 1: Buyer Orders -->
        <div id="buyer-orders-section" class="chart-section ">
          <div class="flex-1 p-2">
            <h2
              class="text-2xl font-bold text-blue-500 border-b border-gray-300 pb-2 mt-2"
            >
  Buyer Orders 🛍️
</h2>

            <div
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-6 pb-6"
            >
              <!-- Card 1 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-green-500">18</p>
                  <p class="text-2xl sm:text-2xl">🛒</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Orders
                </p>
              </div>
              <!-- Card 2 -->

              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-blue-500">1</p>
                  <p class="text-2xl sm:text-2xl">📦</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Dispatched
                </p>
              </div>
              <!-- Card 3 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-purple-500">18</p>
                  <p class="text-2xl sm:text-2xl">⏳</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Pending
                </p>
              </div>
              <!-- Card 4 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-red-500">10</p>
                  <p class="text-2xl sm:text-2xl">🚨</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Delayed POs
                </p>
              </div>
            </div>
          </div>
          <canvas id="buyerOrdersChart">
          </canvas>
        </div>

        <!-- Section 2: Purchase Indents -->
        <div id="purchase-indents-section" class="chart-section">
          <div class="flex-1 p-2">
            <h2
              class="text-2xl font-bold text-green-500 border-b border-gray-300 pb-2 mt-2"
            >
              Purchase Indents 📝
            </h2>
            <div
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-6 pb-6"
            >
              <!-- Card 1 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-green-500">7</p>
                  <p class="text-2xl sm:text-2xl">📄</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Indents
                </p>
              </div>
              <!-- Card 2 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-green-500">6</p>
                  <p class="text-2xl sm:text-2xl">✅</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Indents Received
                </p>
              </div>
              <!-- Card 3 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-green-500">2</p>
                  <p class="text-2xl sm:text-2xl">⏳</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Indents Pending
                </p>
              </div>
              <!-- Card 4 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-green-500">2</p>
                  <p class="text-2xl sm:text-2xl">❌</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Without Indent Received
                </p>
              </div>
            </div>
          </div>

          <canvas id="purchaseIndentsChart"></canvas>
        </div>

        <!-- Section 3: Other Issues -->
        <div id="other-issues-section" class="chart-section">
          <div class="flex-1 p-6">
            <h2
              class="text-2xl font-bold text-red-600 border-b border-gray-300 pb-2 mt-2"
            >
              Other Issues ⚠️
            </h2>
            <div
              class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6 mb-6 pb-6"
            >
              <!-- Card 1 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-purple-500">811</p>
                  <p class="text-2xl sm:text-2xl">🧵</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Weaving Delays
                </p>
              </div>
              <!-- Card 2 -->
              <div
                class="bg-white p-6 rounded-lg shadow hover:bg-gray-100 hover:text-blue-500"
              >
                <div class="flex justify-between">
                  <p class="text-3xl sm:text-2xl text-purple-500">3</p>
                  <p class="text-2xl sm:text-2xl">🎨</p>
                </div>
                <p class="text-gray-500 mt-4 text-sm sm:text-xs text-center">
                  Total Dyeing Delays
                </p>
              </div>
            </div>
          </div>

          <canvas id="otherIssuesChart"></canvas>
        </div>
      </div>`;
};

