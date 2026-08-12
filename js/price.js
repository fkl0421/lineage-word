import { PriceStorage, Auth, BRIGHT_RUNES, AGILE_RUNES } from './common.js';
import { WeaponModule } from './weapon.js';
import { ArmorModule } from './armor.js';

export const PriceModule = (function() {

    let currentSelectedCategory = 'dim'; // 預設選擇微光神字
    let currentSelectedRune = null;      // 當前選擇單字

    function getCategorizedRunes() {
        const allRunes = new Set();
        const weaponData = WeaponModule.getRawData();
        const armorData = ArmorModule.getRawData();

        [...weaponData, ...armorData].forEach(item => {
            item.runes.forEach(r => {
                if (r !== '-') allRunes.add(r);
            });
        });

        const bright = [];
        const agile = [];
        const dim = [];

        Array.from(allRunes).sort().forEach(r => {
            if (BRIGHT_RUNES.has(r)) {
                bright.push(r);
            } else if (AGILE_RUNES.has(r)) {
                agile.push(r);
            } else {
                dim.push(r);
            }
        });

        return { dim, bright, agile };
    }

    async function calculateStats() {
        const history = await PriceStorage.getHistoryAsync();
        const stats = {};

        history.forEach(item => {
            const price = Number(item.price);
            if (!stats[item.name]) {
                stats[item.name] = { 
                    minPrice: price, 
                    maxPrice: price, 
                    count: 0, 
                    latestPrice: 0, 
                    latestDate: '' 
                };
            }
            
            if (price < stats[item.name].minPrice) stats[item.name].minPrice = price;
            if (price > stats[item.name].maxPrice) stats[item.name].maxPrice = price;

            stats[item.name].count += 1;

            if (!stats[item.name].latestDate || new Date(item.date) >= new Date(stats[item.name].latestDate)) {
                stats[item.name].latestDate = item.date;
                stats[item.name].latestPrice = price;
            }
        });

        return stats;
    }

    function renderCategoryTabs() {
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        const targetBtn = document.getElementById(`catBtn-${currentSelectedCategory}`);
        if (targetBtn) targetBtn.classList.add('active');

        const categorized = getCategorizedRunes();
        const runeList = categorized[currentSelectedCategory] || [];
        const container = document.getElementById('runeBtnContainer');
        container.innerHTML = '';

        if (runeList.length === 0) {
            container.innerHTML = '<span style="color:#888;">無神文字</span>';
            return;
        }

        runeList.forEach(rune => {
            const btn = document.createElement('button');
            btn.className = `rune-select-btn ${currentSelectedRune === rune ? 'active' : ''}`;
            btn.innerText = rune;
            btn.onclick = () => selectRune(rune);
            container.appendChild(btn);
        });
    }

    async function selectCategory(catKey) {
        currentSelectedCategory = catKey;
        const categorized = getCategorizedRunes();
        const runeList = categorized[catKey] || [];
        
        // 切換分類時，預設選擇該分類的第一個字
        if (runeList.length > 0) {
            currentSelectedRune = runeList[0];
        } else {
            currentSelectedRune = null;
        }

        renderCategoryTabs();
        await updateAllViews();
    }

    async function selectRune(rune) {
        currentSelectedRune = rune;
        renderCategoryTabs();
        await updateAllViews();
    }

    async function updateAllViews() {
        const titleElem = document.getElementById('selectedRuneTitle');
        if (currentSelectedRune) {
            titleElem.innerText = `🔍 當前檢視神文字：『 ${currentSelectedRune} 』`;
        } else {
            titleElem.innerText = '請點擊上方神文字查看數據與走勢';
        }

        await renderAvgPriceTable();
        await renderHistoryTable();
        await drawChart();
    }

    async function renderAvgPriceTable() {
        const tbody = document.getElementById('avgPriceTableBody');
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">載入中...</td></tr>';
        
        if (!currentSelectedRune) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">請選擇神文字以檢視統計</td></tr>';
            return;
        }

        const stats = await calculateStats();
        tbody.innerHTML = '';

        const runeStat = stats[currentSelectedRune];

        if (!runeStat) {
            tbody.innerHTML = `<tr>
                <td><strong>${currentSelectedRune}</strong></td>
                <td colspan="3" style="text-align:center; color:#888;">尚未有紀錄資料</td>
            </tr>`;
            return;
        }

        const tr = document.createElement('tr');
        const priceRangeStr = runeStat.minPrice === runeStat.maxPrice 
            ? `${runeStat.minPrice.toLocaleString()}`
            : `${runeStat.minPrice.toLocaleString()} ~ ${runeStat.maxPrice.toLocaleString()}`;

        const latestPriceStr = `${runeStat.latestPrice.toLocaleString()} <span style="color:#aaa; font-size:13px;">(${runeStat.latestDate})</span>`;

        tr.innerHTML = `
            <td><strong>${currentSelectedRune}</strong></td>
            <td><span class="price-tag">${priceRangeStr}</span></td>
            <td>${latestPriceStr}</td>
            <td>${runeStat.count} 筆</td>
        `;
        tbody.appendChild(tr);
    }

    async function renderHistoryTable() {
        const tbody = document.getElementById('historyTableBody');
        tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#888;">載入中...</td></tr>';

        const history = await PriceStorage.getHistoryAsync();
        tbody.innerHTML = '';
        const isAdmin = Auth.isAdmin();

        document.getElementById('thActionHeader').style.display = isAdmin ? 'table-cell' : 'none';

        if (!currentSelectedRune) {
            tbody.innerHTML = `<tr><td colspan="${isAdmin ? 4 : 3}" style="text-align:center; color:#888;">請選擇神文字</td></tr>`;
            return;
        }

        const filtered = history
            .filter(r => r.name === currentSelectedRune)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="${isAdmin ? 4 : 3}" style="text-align:center; color:#888;">尚無『 ${currentSelectedRune} 』的歷史明細</td></tr>`;
            return;
        }

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            let actionTd = isAdmin ? `<td><button class="btn-del" onclick="window.PriceModule.deleteRecord('${item.id}')">刪除</button></td>` : '';
            
            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.date}</td>
                <td>${Number(item.price).toLocaleString()}</td>
                ${actionTd}
            `;
            tbody.appendChild(tr);
        });
    }

    function renderAuthBar() {
        const authBar = document.getElementById('authBar');
        if (!authBar) return;

        if (Auth.isLoggedIn()) {
            const user = Auth.getUser();
            const isAdmin = Auth.isAdmin();

            if (isAdmin) {
                authBar.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="${user.photoURL || ''}" style="width:24px; height:24px; border-radius:50%;" alt="Avatar">
                        <span>當前登入：<strong>${user.displayName || user.email}</strong> <span style="color:#2ecc71;">[系統管理者]</span></span>
                    </div>
                    <button class="btn-clear" style="padding: 4px 10px; font-size: 13px;" onclick="window.PriceModule.logout()">登出</button>
                `;
                document.getElementById('adminAddSection').style.display = 'block';
            } else {
                authBar.innerHTML = `
                    <div style="display:flex; align-items:center; gap:8px;">
                        <img src="${user.photoURL || ''}" style="width:24px; height:24px; border-radius:50%;" alt="Avatar">
                        <span>當前登入：<strong>${user.displayName || user.email}</strong> <span style="color:#e74c3c;">(訪客模式 - 無修改權限)</span></span>
                    </div>
                    <button class="btn-clear" style="padding: 4px 10px; font-size: 13px;" onclick="window.PriceModule.logout()">登出</button>
                `;
                document.getElementById('adminAddSection').style.display = 'none';
            }
        } else {
            authBar.innerHTML = `
                <span>👀 當前身分：<strong>一般訪客 (唯讀模式)</strong></span>
                <button class="btn-add" style="padding: 4px 12px; font-size: 13px;" onclick="window.PriceModule.loginWithGoogle()">🔑 管理員 Google 登入</button>
            `;
            document.getElementById('adminAddSection').style.display = 'none';
        }
    }

    async function drawChart() {
        const canvas = document.getElementById('priceChartCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = canvas.parentElement.clientWidth - 30;
        canvas.height = 250;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!currentSelectedRune) {
            ctx.fillStyle = "#888";
            ctx.font = "16px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("請點擊上方神文字以檢視走勢曲線", canvas.width / 2, canvas.height / 2);
            return;
        }

        const history = await PriceStorage.getHistoryAsync();
        const runeRecords = history
            .filter(r => r.name === currentSelectedRune)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (runeRecords.length < 2) {
            ctx.fillStyle = "#888";
            ctx.font = "16px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`『 ${currentSelectedRune} 』資料筆數不足（需至少 2 筆紀錄）以劃出走勢曲線`, canvas.width / 2, canvas.height / 2);
            return;
        }

        const padding = 40;
        const width = canvas.width - padding * 2;
        const height = canvas.height - padding * 2;

        const prices = runeRecords.map(r => Number(r.price));
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        const priceRange = maxPrice === minPrice ? 1 : maxPrice - minPrice;

        ctx.beginPath();
        ctx.strokeStyle = "#444";
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        const points = runeRecords.map((r, idx) => {
            const x = padding + (idx / (runeRecords.length - 1)) * width;
            const y = canvas.height - padding - ((Number(r.price) - minPrice) / priceRange) * height;
            return { x, y, price: r.price, date: r.date };
        });

        ctx.beginPath();
        ctx.strokeStyle = "#e67e22";
        ctx.lineWidth = 3;
        points.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = "#f1c40f";
            ctx.fill();

            ctx.fillStyle = "#e1e1e6";
            ctx.font = "12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(Number(p.price).toLocaleString(), p.x, p.y - 10);
            ctx.fillText(p.date.slice(5), p.x, canvas.height - padding + 20);
        });
    }

    return {
        init: function() {
            Auth.onAuthReady(async () => {
                renderAuthBar();
                if (document.getElementById('priceDateInput')) {
                    document.getElementById('priceDateInput').valueAsDate = new Date();
                }

                // 預設選擇微光神字的第一個字
                const categorized = getCategorizedRunes();
                if (categorized.dim && categorized.dim.length > 0) {
                    currentSelectedRune = categorized.dim[0];
                }

                renderCategoryTabs();
                await updateAllViews();
            });
        },
        selectCategory: selectCategory,
        selectRune: selectRune,
        loginWithGoogle: async function() {
            const res = await Auth.loginWithGoogle();
            if (!res.success) {
                alert("登入失敗: " + res.message);
            }
        },
        logout: function() {
            Auth.logout();
        },
        onAddCategoryChange: function(catSelectId, runeSelectId) {
            const catValue = document.getElementById(catSelectId).value;
            const runeSelect = document.getElementById(runeSelectId);
            const categorized = getCategorizedRunes();

            runeSelect.innerHTML = '<option value="">2. 選擇神字...</option>';

            if (!catValue || !categorized[catValue]) return;

            categorized[catValue].forEach(r => {
                const opt = document.createElement('option');
                opt.value = r;
                opt.innerText = r;
                runeSelect.appendChild(opt);
            });
        },
        addRecord: async function() {
            if (!Auth.isAdmin()) {
                alert('權限不足！你的 Google 帳號沒有修改權限。');
                return;
            }

            const name = document.getElementById('priceAddRuneSelect').value;
            const date = document.getElementById('priceDateInput').value;
            const price = parseFloat(document.getElementById('priceValueInput').value);

            if (!name || !date || isNaN(price)) {
                alert('請完整選擇神文字分類、神字、日期並輸入有效價格！');
                return;
            }

            try {
                await PriceStorage.addRecordAsync(name, date, price);
                document.getElementById('priceValueInput').value = '';
                
                // 新增紀錄後自動切換至該神文字進行檢視
                currentSelectedRune = name;
                renderCategoryTabs();
                await updateAllViews();
            } catch (err) {
                alert("新增失敗: " + err.message);
            }
        },
        deleteRecord: async function(id) {
            if (!Auth.isAdmin()) {
                alert('權限不足！你的 Google 帳號沒有修改權限。');
                return;
            }

            if (!confirm('確定要刪除這筆雲端價格紀錄嗎？')) return;

            try {
                await PriceStorage.deleteRecordAsync(id);
                await updateAllViews();
            } catch (err) {
                alert("刪除失敗: " + err.message);
            }
        },
        drawChart: drawChart
    };
})();