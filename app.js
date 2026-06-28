async function sendChatMessage() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    if (!input.value) return;

    box.innerHTML += `<div class="msg user">${input.value}</div>`;
    const message = input.value;
    input.value = "";

    try {
        const res = await fetch("https://solarmind-backend-v2.onrender.com/api/chat", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });
        const data = await res.json();
        box.innerHTML += `<div class="msg bot">${data.reply}</div>`;
    } catch (e) {
        box.innerHTML += `<div class="msg bot">خطأ في الاتصال بالخادم.</div>`;
    }
}
