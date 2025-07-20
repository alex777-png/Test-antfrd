const output = document.getElementById('output');
output.textContent = 'Collecting browser data...\n';

async function fetchIPQSData(ip) {
    const key = '8HOtxkVRNkdO1BNRJOx1MF5uE3EzcLxZ';
    const res = await fetch(`https://ipqualityscore.com/api/json/ip/${key}/${ip}`);
    const data = await res.json();
    return data;
}

async function fetchFingerprint() {
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4').then(FingerprintJS => FingerprintJS.load({ token: "hti80szbfMgrKbtXKZL7" }));
    const fp = await fpPromise;
    const result = await fp.get();
    return result;
}

async function collectData() {
    try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        const ip = ipData.ip;

        const ipqs = await fetchIPQSData(ip);
        const fp = await fetchFingerprint();

        const data = {
            ip_address: ip,
            ipqs_data: ipqs,
            fingerprint: fp,
            browser: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookies_enabled: navigator.cookieEnabled,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screen_resolution: `${screen.width}x${screen.height}`,
        };

        output.textContent = JSON.stringify(data, null, 2);
    } catch (e) {
        output.textContent = 'Error collecting data: ' + e.message;
    }
}

collectData();