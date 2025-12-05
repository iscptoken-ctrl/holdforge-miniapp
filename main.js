const tg = window.Telegram?.WebApp || {};
const userId = tg.initDataUnsafe?.user?.id || 0;

async function loadProfile() {
    try {
        const res = await fetch(`https://YOUR_BACKEND/profile?user_id=${userId}`);
        const data = await res.json();

        document.getElementById("stats").innerHTML = `
            <b>Level:</b> ${data.level}<br>
            <b>Copper:</b> ${data.copper.toFixed(2)}<br>
            <b>Silver:</b> ${data.silver.toFixed(2)}<br>
            <b>Gold:</b> ${data.gold.toFixed(2)}<br>
            <b>Mithral:</b> ${data.mithral.toFixed(6)}<br>
        `;
    } catch (e) {
        document.getElementById("stats").innerText = "Backend yok veya bağlanamadı. Local test modu aktif.";
    }
}

document.getElementById("level-btn").onclick = async () => {
    await fetch(`https://YOUR_BACKEND/levelup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
    }).catch(()=>{/* hata yut */});
    loadProfile();
};

setInterval(loadProfile, 1000);
