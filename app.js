const API_BASE_URL = "http://127.0.0.1:8000/api";

async function fetchDashboardMetrics() {
    try {
        const response = await fetch(`${API_BASE_URL}/metrics`);
        const data = await response.json();
        document.getElementById('sales-value').innerText = `$${data.total_sales.toLocaleString()}`;
        document.getElementById('profit-value').innerText = `$${data.total_profit.toLocaleString()}`;
    } catch (error) {
        console.error("فشل جلب المؤشرات الحية:", error);
    }
}

async function sendChatMessage(customText = null) {
    const inputField = document.getElementById('user-input');
    const messageText = customText ? customText : inputField.value.trim();
    
    if (!messageText) return;
    if(!customText) inputField.value = "";
    
    appendMessage(messageText, 'user');
    
    try {
        const response = await fetch(`${API_BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });
        const data = await response.json();
        processBotReply(data.reply);
    } catch (error) {
        appendMessage("عذراً، واجه النظام مشكلة في الاتصال بالخادم المحمي.", 'bot');
    }
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    return msgDiv;
}

function processBotReply(replyText) {
    const buttonRegex = /\[BUTTONS:\s*(.*?)\s*\]/;
    const match = replyText.match(buttonRegex);
    
    let cleanText = replyText.replace(buttonRegex, '').trim();
    const msgElement = appendMessage(cleanText, 'bot');
    
    if (match && match[1]) {
        const buttonLabels = match[1].split('|').map(b => b.trim());
        const btnContainer = document.createElement('div');
        btnContainer.className = 'dynamic-buttons-container';
        
        buttonLabels.forEach(label => {
            const btn = document.createElement('button');
            btn.className = 'interactive-btn';
            btn.innerText = label;
            btn.onclick = () => sendChatMessage(label);
            btnContainer.appendChild(btn);
        });
        
        msgElement.appendChild(btnContainer);
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    }
}

window.onload = fetchDashboardMetrics;
