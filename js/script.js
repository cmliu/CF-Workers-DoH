const dohServers = [
    {
        name: '谷歌',
        url: 'https://doh.cmliussss.com/CMLiussss',
        logo: 'ico/google.ico'
    },
    {
        name: 'Cloudflare',
        url: 'https://doh.cmliussss.net/CMLiussss',
        logo: 'ico/cloudflare.ico'
    },
    {
        name: '阿里云',
        url: 'https://doh.090227.xyz/Ali-query',
        logo: 'ico/alibabacloud.png'
    },
    {
        name: '腾讯云',
        url: 'https://doh.090227.xyz/QQ-query',
        logo: 'ico/tencentcloud.ico'
    },
    {
        name: '360',
        url: 'https://doh.090227.xyz/360-query',
        logo: 'ico/360.ico'
    },
    {
        name: 'DNS.SB',
        url: 'https://doh.090227.xyz/SB-query',
        logo: 'ico/sb.png'
    },
    {
        name: 'NextDNS',
        url: 'https://doh.090227.xyz/Next-query',
        logo: 'ico/nextdns.png'
    }
];

let testResults = [];
let isTesting = false;

function createDohItemSkeleton(server, index) {
    return `
        <div class="doh-item loading-skeleton" id="doh-item-${index}">
            <div class="doh-item-main">
                <div class="doh-provider" data-label="服务商">
                    <img src="${server.logo}" alt="${server.name}" class="provider-logo">
                    <span>${server.name}</span>
                </div>
                <div class="doh-url" data-label="服务地址" title="${server.url}">
                    <span>${server.url}</span>
                </div>
                <div class="status" data-label="状态">
                    <span>检测中...</span>
                </div>
                <div class="response-time" data-label="响应时间">
                    <span>---</span>
                </div>
                <div class="pollution-status" data-label="纯净度">
                    <span>---</span>
                </div>
            </div>
            <div class="doh-item-details">
                <div class="ip-details">
                    <span class="ip-label">解析IP:</span>
                    <span class="ip-value">---</span>
                </div>
                <div class="location-details">
                    <span class="location-label">位置:</span>
                    <span class="location-value">---</span>
                </div>
                <div class="org-details">
                    <span class="org-label">组织:</span>
                    <span class="org-value">---</span>
                </div>
            </div>
        </div>
    `;
}

function renderDohListSkeletons() {
    const dohList = document.getElementById('dohList');
    dohList.innerHTML = dohServers.map(createDohItemSkeleton).join('');
    document.getElementById('totalServers').textContent = dohServers.length;
}

async function testDohServer(server, index) {
    const itemEl = document.getElementById(`doh-item-${index}`);
    itemEl.classList.remove('loading-skeleton');
    itemEl.onclick = () => copyToClipboard(server.url);

    const statusEl = itemEl.querySelector('.status');
    const responseTimeEl = itemEl.querySelector('.response-time');
    const pollutionStatusEl = itemEl.querySelector('.pollution-status');
    
    // 获取详细信息元素
    const ipValueEl = itemEl.querySelector('.ip-value');
    const locationValueEl = itemEl.querySelector('.location-value');
    const orgValueEl = itemEl.querySelector('.org-value');

    // Reset states
    statusEl.innerHTML = `<div class="status-dot testing"></div><span>检测中...</span>`;
    responseTimeEl.textContent = '---';
    pollutionStatusEl.innerHTML = '<span>---</span>';
    responseTimeEl.className = 'response-time';
    pollutionStatusEl.className = 'pollution-status';
    
    // 重置详细信息
    ipValueEl.textContent = '---';
    locationValueEl.textContent = '---';
    orgValueEl.textContent = '---';

    try {
        const startTime = performance.now();
        const testUrl = `${server.url}?name=www.google.com&type=A`;
        
        const response = await fetch(testUrl, { cache: 'no-store' });
        const endTime = performance.now();
        const responseTime = Math.round(endTime - startTime);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        statusEl.innerHTML = `<div class="status-dot success"></div><span>在线</span>`;
        responseTimeEl.textContent = `${responseTime}ms`;
        responseTimeEl.className = getResponseTimeClass(responseTime);

        let ip = 'N/A';
        let isClean = false;
        let ipDetails = null;
        
        if (data.Answer && data.Answer.length > 0) {
            ip = data.Answer[0].data;
            ipValueEl.textContent = ip;
            ipDetails = await getIpInfo(ip, pollutionStatusEl, locationValueEl, orgValueEl);
            isClean = ipDetails.isClean;
        } else {
            pollutionStatusEl.innerHTML = '<span>无响应</span>';
            ipValueEl.textContent = '无响应';
        }

        return { success: true, responseTime, isClean, ip };

    } catch (error) {
        statusEl.innerHTML = `<div class="status-dot error"></div><span>离线</span>`;
        responseTimeEl.textContent = '---';
        pollutionStatusEl.innerHTML = '<span>' + error.message + '</span>';
        ipValueEl.textContent = '错误';
        locationValueEl.textContent = '---';
        orgValueEl.textContent = '---';
        return { success: false, responseTime: null, isClean: false, ip: null };
    }
}

async function getIpInfo(ip, pollutionStatusEl, locationValueEl, orgValueEl) {
    try {
        const ipInfoUrl = `https://doh.090227.xyz/ip-info?ip=${ip}&token=CMLiussss`;
        const response = await fetch(ipInfoUrl, { cache: 'no-store' });
        
        if (!response.ok) {
            pollutionStatusEl.innerHTML = '<span>❓ 未知</span>';
            locationValueEl.textContent = '未知';
            orgValueEl.textContent = '未知';
            return { isClean: false, ipData: null };
        }

        const ipData = await response.json();
        const isClean = checkPollutionStatus(ipData);
        
        // 更新污染状态显示
        const statusText = isClean ? '✅ 纯净' : '🚫 污染';
        const statusClass = isClean ? 'clean' : 'suspicious';
        pollutionStatusEl.innerHTML = `<span>${statusText}</span>`;
        pollutionStatusEl.className = `pollution-status ${statusClass}`;
        
        // 更新详细信息行
        const location = `${ipData.country || '未知'} ${ipData.regionName || ''}`.trim();
        const organization = ipData.org || ipData.as || ipData.isp || '未知';
        
        locationValueEl.textContent = location;
        orgValueEl.textContent = organization;
        
        return { isClean, ipData };
        
    } catch (error) {
        console.warn('获取IP信息失败:', error);
        pollutionStatusEl.innerHTML = '<span>❓ 未知</span>';
        locationValueEl.textContent = '未知';
        orgValueEl.textContent = '未知';
        return { isClean: false, ipData: null };
    }
}

function checkPollutionStatus(ipData) {
    const { as, isp, org } = ipData;
    const fields = [as, isp, org].map(field => (field || '').toLowerCase());
    return fields.some(field => field.includes('google'));
}

function getResponseTimeClass(responseTime) {
    if (responseTime < 200) return 'response-time fast';
    if (responseTime < 500) return 'response-time medium';
    return 'response-time slow';
}

async function testAllServers() {
    if (isTesting) return;
    isTesting = true;
    
    const refreshBtn = document.getElementById('refreshBtn');
    const btnIcon = refreshBtn.querySelector('.icon');
    refreshBtn.disabled = true;
    btnIcon.classList.add('spinning');

    renderDohListSkeletons();
    
    const promises = dohServers.map((server, index) => testDohServer(server, index));
    testResults = await Promise.all(promises);
    
    updateStats();

    isTesting = false;
    refreshBtn.disabled = false;
    btnIcon.classList.remove('spinning');
}

function updateStats() {
    const onlineCount = testResults.filter(r => r.success).length;
    const cleanCount = testResults.filter(r => r.isClean).length;
    
    const responseTimes = testResults
        .filter(r => r.success && r.responseTime !== null)
        .map(r => r.responseTime);
    
    const avgResponseTime = responseTimes.length > 0 
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
        : 0;

    document.getElementById('onlineServers').textContent = onlineCount;
    document.getElementById('cleanServers').textContent = cleanCount;
    document.getElementById('averageResponseTime').textContent = avgResponseTime > 0 ? `${avgResponseTime}ms` : '-';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const toast = document.getElementById('copyToast');
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }).catch(err => {
        console.warn('复制失败:', err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    testAllServers();
});
