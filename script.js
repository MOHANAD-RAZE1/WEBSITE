function startLiveUpdates() {
  setInterval(fetchStats, 1000); // يحدث كل ثانية
}

async function fetchStats() {
  const code = document.getElementById("codeInput").value.trim().toUpperCase();
  if (!code) return;

  const url = `https://mainchat-21f83-default-rtdb.firebaseio.com/playerStats/${code}.json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.players !== undefined) {
      document.getElementById("result").innerHTML = `
        <p class="fade-in">🧍 Players Around You: <strong>${data.players}</strong></p>
        <p class="fade-in">🔑 Your Code: <strong>${data.code}</strong></p>
      `;
    } else {
      document.getElementById("result").innerHTML = `<p class="fade-in" style="color:red;">No data found for this code.</p>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("result").innerHTML = `<p class="fade-in" style="color:red;">An error occurred. Please try again later.</p>`;
  }
}
