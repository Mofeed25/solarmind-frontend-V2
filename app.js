const API_BASE_URL = "https://solarmind-backend-v2.onrender.com/api";

// دالة تحديث المؤشرات والرسوم البيانية
async function fetchDashboardMetrics() {
    try {
        const response = await fetch(`${API_BASE_URL}/metrics`);
        const data = await response.json();
        document.getElementById('sales-value').innerText = `$${data.total_sales.toLocaleString()}`;
        document.getElementById('profit-value').innerText = `$${data.total_profit.toLocaleString()}`;
        
        // رسم الدوائر البيانية الأنيقة
        drawMiniChart('salesChart', data.total_sales, '#FFB703');
        drawMiniChart('profitChart', data.total_profit, '#2A9D8F');
    } catch (e) { console.error(e); }
}

function drawMiniChart(id, value, color) {
    new Chart(document.getElementById(id), {
        type: 'doughnut',
        data: { datasets: [{ data: [value, 100000], backgroundColor: [color, '#e0e0e0'] }] },
        options: { cutout: '70%', plugins: { legend: { display: false } } }
    });
}

// دالة إرسال الرسائل (بقية المنطق كما هو)
async function sendChatMessage(customText = null) {
    const inputField = document.getElementById('user-input');
    const messageText = customText || inputField.value.trim();
    if (!messageText) return;
    appendMessage(messageText, 'user');
    inputField.value = "";
    // ... باقي الكود الخاص بك ...
}
