// Gemini API test script
async function testGeminiAPI() {
    const API_KEY = 'AIzaSyC_fWA3a89mp1QE6v_nKzRAOiO1UMKIqDI';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
    const requestBody = {
        contents: [{
            parts: [{
                text: "Salom, kim sensan?"
            }]
        }]
    };
    
    try {
        console.log("API ga so'rov yuborilyapti...");
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        console.log("Status:", response.status);
        console.log("Status text:", response.statusText);
        
        const data = await response.json();
        console.log("To'liq javob:", data);
        
        if (response.ok) {
            console.log("✅ API muvaffaqiyatli ishladi!");
            console.log("Javob:", data.candidates?.[0]?.content?.parts?.[0]?.text);
        } else {
            console.log("❌ API xatosi:");
            console.log("Xato kodi:", data.error?.code);
            console.log("Xato xabari:", data.error?.message);
        }
    } catch (error) {
        console.log("🌐 Network xatosi:", error.message);
    }
}

// Testni boshlash
console.log("=== Gemini API Test ===");
testGeminiAPI();