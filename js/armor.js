import { PriceStorage } from './common.js';

export const ArmorModule = (function() {
    const data = [
        { name: "神暮臨", runes: ["焱", "撼", "洛", "-"], effect: "天使系傷害加成+20、泰坦系傷害加成+20、惡魔系傷害加成+20" },
        { name: "諸神黃昏", runes: ["焱", "撼", "洛", "勒"], effect: "天使系傷害加成+40、泰坦系傷害加成+40、惡魔系傷害加成+40" },
        { name: "佛癒", runes: ["焱", "沌", "-", "-"], effect: "藥水恢復量+6、藥水恢復率+6%" },
        { name: "佛恩療", runes: ["焱", "沌", "穆", "-"], effect: "體力回復+14、藥水恢復量+6、藥水恢復率+6%" },
        { name: "藥師佛", runes: ["焱", "沌", "璿", "-"], effect: "體力回復+7、魔力回復+14、藥水恢復量+9、藥水恢復率+9%" },
        { name: "淨世藥光", runes: ["焱", "沌", "穆", "璿"], effect: "體力上限+70、體力回復+14、藥水恢復量+9、藥水恢復率+9%" },
        { name: "羅生裁", runes: ["淼", "仝", "奧", "-"], effect: "天使系傷害減免+5、傷害減免+4、體力上限+105" },
        { name: "羅生刑", runes: ["淼", "仝", "坦", "-"], effect: "泰坦系傷害減免+5、傷害減免+4、體力上限+105" },
        { name: "羅生盡", runes: ["淼", "仝", "燮", "-"], effect: "惡魔系傷害減免+5、傷害減免+4、體力上限+105" },
        { name: "終羅生", runes: ["淼", "仝", "凡", "-"], effect: "天使系傷害減免+10、泰坦系傷害減免+10、惡魔系傷害減免+10" },
        { name: "三重羅生", runes: ["淼", "仝", "凡", "婭"], effect: "天使系傷害減免+20、泰坦系傷害減免+20、惡魔系傷害減免+20" },
        { name: "浮榮", runes: ["摩", "仝", "-", "-"], effect: "體力上限+35" },
        { name: "榮華幻", runes: ["摩", "仝", "旭", "-"], effect: "體力上限+35、魔力上限+35" },
        { name: "無窮虛榮", runes: ["摩", "仝", "旭", "璿"], effect: "體力上限+70、魔力上限+70、PVP傷害減免+6" },
        { name: "聖臨", runes: ["圭", "凡", "-", "-"], effect: "物理防禦-4" },
        { name: "萬物聖", runes: ["圭", "凡", "洛", "-"], effect: "物理防禦-4、金幣獲得+15%" },
        { name: "萬物巨聖", runes: ["圭", "凡", "洛", "奧"], effect: "智力+1、物理防禦-4、金幣獲得+15%" },
        { name: "古擁", runes: ["漪", "迪", "-", "-"], effect: "龍屬耐性+8" },
        { name: "神臂攬", runes: ["漪", "迪", "凡", "-"], effect: "龍屬耐性+8、PVP傷害減免+4" },
        { name: "古神擁抱", runes: ["漪", "迪", "凡", "勒"], effect: "物理防禦-4、龍屬耐性+8、PVP傷害減免+6" },
        { name: "削傷", runes: ["別", "榮", "-", "-"], effect: "傷害減免+4" },
        { name: "減傷盾", runes: ["別", "榮", "撼", "-"], effect: "體力上限+35、傷害減免+4" },
        { name: "吸傷壁", runes: ["別", "榮", "燮", "-"], effect: "地屬性防禦+5、體力上限+70、傷害減免+6" },
        { name: "護壁削傷", runes: ["別", "榮", "撼", "燮"], effect: "魔法防禦+6、物理防禦-4、PVP傷害減免+6" },
        { name: "滅聖", runes: ["嵐", "瓦", "-", "-"], effect: "魔法防禦+6" },
        { name: "裂天使", runes: ["嵐", "瓦", "穆", "-"], effect: "魔法防禦+6、天使系傷害加成+40" },
        { name: "褻聖擊", runes: ["嵐", "瓦", "奧", "-"], effect: "體力回復量+7、天使系傷害加成+40、魔法防禦+10" },
        { name: "褻聖制裁", runes: ["嵐", "瓦", "穆", "爚"], effect: "魔法防禦+6、天使系傷害加成+40、體力回復量+14" },
        { name: "弒聖裁決", runes: ["嵐", "瓦", "奧", "爚"], effect: "魔法防禦+6、天使系傷害加成+60、體力回復量+21" },
        { name: "滅邪", runes: ["巽", "仄", "-", "-"], effect: "傷害減免+4" },
        { name: "破邪魔", runes: ["巽", "仄", "洛", "-"], effect: "傷害減免+4、惡魔系傷害加成+40" },
        { name: "滅邪擊", runes: ["巽", "仄", "坦", "-"], effect: "體力回復量+7、惡魔系傷害加成+40、傷害減免+6" },
        { name: "煉獄制裁", runes: ["巽", "仄", "洛", "勒"], effect: "傷害減免+4、惡魔系傷害加成+40、體力回復量+14" },
        { name: "誅魔裁決", runes: ["巽", "仄", "坦", "勒"], effect: "傷害減免+4、惡魔系傷害加成+60、體力回復量+21" },
        { name: "滅坦", runes: ["囚", "撼", "-", "-"], effect: "體力上限+35" },
        { name: "滅泰力", runes: ["囚", "撼", "叱", "-"], effect: "體力上限+70、泰坦系傷害加成+40" },
        { name: "碎嶺擊", runes: ["囚", "撼", "婭", "-"], effect: "體力回復量+14、泰坦系傷害加成+40、體力上限+105" },
        { name: "崩泰破碎", runes: ["囚", "撼", "叱", "璿"], effect: "體力上限+70、泰坦系傷害加成+40、體力回復量+14" },
        { name: "滅坦裁決", runes: ["囚", "撼", "婭", "璿"], effect: "體力上限+70、泰坦系傷害加成+60、體力回復量+21" },
        { name: "逆神意", runes: ["迪", "撼", "洛", "-"], effect: "天使系傷害加成+40、1%收取魔力+14" },
        { name: "神奈我何", runes: ["迪", "撼", "洛", "爚"], effect: "天使系傷害加成+60、1%收取魔力+14、火屬性防禦+10" },
        { name: "逆靈意", runes: ["旭", "凡", "斯", "-"], effect: "泰坦系傷害加成+40、1%收取體力+14" },
        { name: "靈奈我何", runes: ["旭", "凡", "斯", "勒"], effect: "泰坦系傷害加成+60、1%收取體力+14、地屬性防禦+10" },
        { name: "逆魔意", runes: ["仝", "迪", "凡", "-"], effect: "惡魔系傷害加成+40、PVP傷害減免+4" },
        { name: "魔奈我何", runes: ["仝", "迪", "凡", "劮"], effect: "惡魔系傷害加成+60、PVP傷害減免+4、水屬性防禦+10" },
        { name: "聖壁", runes: ["迪", "沌", "-", "-"], effect: "體力上限+105" },
        { name: "聖佑壁", runes: ["迪", "沌", "斯", "-"], effect: "天使系PVP傷害減免+5、體力上限+105" },
        { name: "聖潔護盾", runes: ["迪", "沌", "斯", "輝"], effect: "天使系PVP傷害減免+10、物理防禦-4、體力上限+105" },
        { name: "聖光守護", runes: ["迪", "沌", "坦", "-"], effect: "天使系PVP傷害減免+10、PVP傷害減免+2、體力上限+105" },
        { name: "聖恩護盾", runes: ["迪", "沌", "坦", "輝"], effect: "天使系PVP傷害減免+20、PVP傷害減免+4、體力上限+105" },
        { name: "磐守", runes: ["迪", "赫", "-", "-"], effect: "體力上限+105" },
        { name: "磐石守", runes: ["迪", "赫", "斯", "-"], effect: "泰坦系PVP傷害減免+5、體力上限+105" },
        { name: "磐石之固", runes: ["迪", "赫", "斯", "勒"], effect: "泰坦系PVP傷害減免+10、物理防禦-4、體力上限+105" },
        { name: "磐岩防禦", runes: ["迪", "赫", "坦", "-"], effect: "泰坦系PVP傷害減免+10、PVP傷害減免+2、體力上限+105" },
        { name: "磐嶽守護", runes: ["迪", "赫", "坦", "勒"], effect: "泰坦系PVP傷害減免+20、PVP傷害減免+4、體力上限+105" },
        { name: "獄甲", runes: ["迪", "穆", "-", "-"], effect: "體力上限+105" },
        { name: "獄焰甲", runes: ["迪", "穆", "斯", "-"], effect: "惡魔系PVP傷害減免+5、體力上限+105" },
        { name: "烈獄煉甲", runes: ["迪", "穆", "斯", "燮"], effect: "惡魔系PVP傷害減免+10、物理防禦-4、體力上限+105" },
        { name: "獄焰重甲", runes: ["迪", "穆", "坦", "-"], effect: "惡魔系PVP傷害減免+10、PVP傷害減免+2、體力上限+105" },
        { name: "煉獄戰體", runes: ["迪", "穆", "坦", "燮"], effect: "惡魔系PVP傷害減免+20、PVP傷害減免+4、體力上限+105" },
        { name: "晏尊老", runes: ["仄", "斯", "卍", "-"], effect: "智力+1、精神+1、魔法爆擊率+4" },
        { name: "凌世尊", runes: ["契", "沌", "坦", "-"], effect: "力量+1、精神+1、近距離爆擊率+4" },
        { name: "次元智者", runes: ["仄", "斯", "卍", "劮"], effect: "智力+1、精神+2、魔法爆擊率+6" },
        { name: "傲世尊者", runes: ["契", "沌", "坦", "奧"], effect: "力量+2、精神+1、近距離爆擊率+6" },
        { name: "暮巡", runes: ["穆", "赫", "-", "-"], effect: "PVP傷害減免+2、技術耐性+4" },
        { name: "宙觀者", runes: ["穆", "赫", "沌", "-"], effect: "PVP傷害減免+2、技術耐性+8" },
        { name: "界穹引者", runes: ["穆", "赫", "沌", "坦"], effect: "PVP傷害減免+4、技術耐性+12、魔法防禦+6" },
        { name: "界歸者", runes: ["迪", "契", "婭", "-"], effect: "力量+1、PVP傷害減免+6" },
        { name: "星賢者", runes: ["契", "洛", "爚", "-"], effect: "體力上限+70、PVP傷害減免+6" },
        { name: "風引者", runes: ["仝", "熙", "奧", "-"], effect: "敏捷+1、PVP傷害減免+6" },
        { name: "智御者", runes: ["沌", "契", "卍", "-"], effect: "智力+1、PVP傷害減免+6" },
        { name: "夜巡御者", runes: ["迪", "契", "婭", "璿"], effect: "力量+2、PVP傷害減免+6、技術耐性+12" },
        { name: "超凡歸者", runes: ["契", "洛", "爚", "輝"], effect: "體力上限+105、PVP傷害減免+6、技術耐性+12" },
        { name: "尋風行者", runes: ["仝", "熙", "婭", "奧"], effect: "敏捷+2、PVP傷害減免+6、技術耐性+12" },
        { name: "天宇賢者", runes: ["沌", "契", "卍", "輝"], effect: "智力+2、PVP傷害減免+6、技術耐性+12" },
        { name: "緋靈炎", runes: ["仄", "爚", "璿", "-"], effect: "物理防禦-4、增加負重+300、擊中時3%施展變形術" },
        { name: "狂靈的緋炎", runes: ["仄", "爚", "璿", "輝"], effect: "物理防禦-6、增加負重+500、擊中時6%施展變形術" },
        { name: "英魂裔", runes: ["凡", "坦", "奧", "-"], effect: "傷害減免+4、體力上限+35、擊中時3%施展魔法封印" },
        { name: "英魂的後裔", runes: ["凡", "坦", "奧", "劮"], effect: "傷害減免+6、體力上限+70、擊中時6%施展魔法封印" },
        { name: "審罪光", runes: ["榮", "坦", "奧", "-"], effect: "PVP傷害減免+4、魔法防禦+3、擊中時3%發動束縛術" },
        { name: "艾莉絲的審判", runes: ["榮", "坦", "奧", "璿"], effect: "PVP傷害減免+6、精神+1、擊中時6%發動束縛術" },
        { name: "死亡照明", runes: ["仝", "坦", "奧", "輝"], effect: "物理防禦-4、體力上限+70、6%釋放精準目標" },
        { name: "固守", runes: ["坦", "奧", "-", "-"], effect: "傷害減免+2、藥水恢復量+3、藥水恢復率+3%、1%機率傷害減免+60" },
        { name: "鐵壁化", runes: ["坦", "奧", "婭", "-"], effect: "傷害減免+4、藥水恢復量+6、藥水恢復率+6%、3%機率傷害減免+60" },
        { name: "堅不可摧", runes: ["坦", "奧", "婭", "劮"], effect: "傷害減免+6、藥水恢復量+9、藥水恢復率+9%、6%機率傷害減免+60" },
        { name: "霜盾座", runes: ["卍", "奧", "輝", "-"], effect: "物理防禦-4、魔法防禦+6、擊中時1%施展冰矛圍籬" },
        { name: "冰封的王座", runes: ["卍", "奧", "輝", "劮"], effect: "物理防禦-6、魔法防禦+10、擊中時2%施展冰矛圍籬" },
        { name: "黯雷", runes: ["卍", "坦", "-", "-"], effect: "1%收取體力+7、藥水恢復量+3、藥水恢復率+3%、擊中時1%施展奪命之雷" },
        { name: "冥雷壁", runes: ["卍", "坦", "爚", "-"], effect: "1%收取體力+14、藥水恢復量+6、藥水恢復率+6%、擊中時3%施展奪命之雷" },
        { name: "黑雷的殞落", runes: ["卍", "坦", "爚", "璿"], effect: "1%收取體力+21、藥水恢復量+9、藥水恢復率+9%、擊中時6%施展奪命之雷" },
        { name: "祈護", runes: ["奧", "爚", "-", "-"], effect: "1%收取體力+7、傷害減免+2、擊中時1%施展藥水霜化術" },
        { name: "祈恩護", runes: ["奧", "爚", "輝", "-"], effect: "1%收取體力+14、傷害減免+4、擊中時3%施展藥水霜化術" },
        { name: "祭司的庇護", runes: ["奧", "爚", "輝", "勃"], effect: "1%收取體力+21、傷害減免+6、擊中時6%施展藥水霜化術" },
        { name: "絢殺", runes: ["坦", "卍", "-", "-"], effect: "魔法防禦+3、擊中時1%施展衝擊之暈" },
        { name: "燦光殺", runes: ["坦", "卍", "璿", "-"], effect: "精神+1、魔法防禦+6、擊中時3%施展衝擊之暈" },
        { name: "絢欄的虐殺", runes: ["坦", "卍", "璿", "劮"], effect: "精神+2、魔法防禦+10、擊中時5%施展衝擊之暈" },
        { name: "有罪", runes: ["婭", "奧", "-", "-"], effect: "物理防禦-2、PVP傷害減免+2、擊中時1%施展木乃伊的詛咒" },
        { name: "罪之判", runes: ["婭", "奧", "璿", "-"], effect: "物理防禦-4、PVP傷害減免+4、擊中時3%施展木乃伊的詛咒" },
        { name: "不存在的審判", runes: ["婭", "奧", "璿", "劮"], effect: "物理防禦-6、PVP傷害減免+6、擊中時6%施展木乃伊的詛咒" },
        { name: "碎境", runes: ["坦", "婭", "-", "-"], effect: "魔法防禦+3、傷害減免+2、擊中時1%施展魔力奪取" },
        { name: "崩欲境", runes: ["坦", "婭", "爚", "-"], effect: "魔法防禦+6、傷害減免+4、擊中時3%施展魔力奪取" },
        { name: "崩裂的幻境", runes: ["坦", "婭", "爚", "劮"], effect: "魔法防禦+10、傷害減免+6、擊中時6%施展魔力奪取" }
    ];

    function ensureGlobalTooltip() {
        let tooltip = document.getElementById('globalRuneTooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'globalRuneTooltip';
            document.body.appendChild(tooltip);
        }
        return tooltip;
    }

    async function render() {
        const tooltip = ensureGlobalTooltip();
        const nameQuery = document.getElementById('armorSearchName').value.trim().toLowerCase();
        const runeQuery = document.getElementById('armorSearchRune').value.trim().toLowerCase();
        const effectQuery = document.getElementById('armorSearchEffect').value.trim().toLowerCase();

        const tbody = document.getElementById('armorTableBody');
        tbody.innerHTML = '<tr><td colspan="4" class="no-result">雲端資料載入中...</td></tr>';
        
        const history = await PriceStorage.getHistoryAsync();

        // 統計各神字價格區間與最新價格
        const runeStats = {};
        history.forEach(item => {
            const price = Number(item.price);
            if (!runeStats[item.name]) {
                runeStats[item.name] = { minPrice: price, maxPrice: price, latestPrice: price, latestDate: item.date };
            } else {
                if (price < runeStats[item.name].minPrice) runeStats[item.name].minPrice = price;
                if (price > runeStats[item.name].maxPrice) runeStats[item.name].maxPrice = price;
                if (new Date(item.date) >= new Date(runeStats[item.name].latestDate)) {
                    runeStats[item.name].latestDate = item.date;
                    runeStats[item.name].latestPrice = price;
                }
            }
        });

        tbody.innerHTML = '';

        const filtered = data.filter(item => {
            const matchName = !nameQuery || item.name.toLowerCase().includes(nameQuery);
            const matchRune = !runeQuery || item.runes.some(r => r !== '-' && r.toLowerCase().includes(runeQuery));
            const matchEffect = !effectQuery || item.effect.toLowerCase().includes(effectQuery);

            return matchName && matchRune && matchEffect;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-result">未找到符合條件的神憶組合</td></tr>';
            document.getElementById('armorRecordCount').innerText = '顯示筆數：0';
            return;
        }

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            let totalPrice = 0;
            const missingRunes = [];

            const runeTd = document.createElement('td');

            item.runes.filter(r => r !== '-').forEach(r => {
                const stat = runeStats[r];
                const tag = document.createElement('span');
                tag.className = 'rune-tag';
                tag.innerText = r;
                tag.onclick = () => window.ArmorModule.quickSearchRune(r);

                if (stat) {
                    totalPrice += stat.latestPrice;
                } else {
                    missingRunes.push(r);
                }

                // 綁定 Hover 顯示動態 Floating Tooltip 事件
                tag.onmouseenter = (e) => {
                    if (stat) {
                        const rangeText = stat.minPrice === stat.maxPrice 
                            ? `${stat.minPrice.toLocaleString()}`
                            : `${stat.minPrice.toLocaleString()} ~ ${stat.maxPrice.toLocaleString()}`;
                        
                        tooltip.innerHTML = `
                            <div><strong style="color:#f1c40f;">【${r}】價格資訊</strong></div>
                            <div>區間：${rangeText}</div>
                            <div>最新：${stat.latestPrice.toLocaleString()} <span style="color:#888;">(${stat.latestDate})</span></div>
                        `;
                    } else {
                        tooltip.innerHTML = `
                            <div><strong style="color:#f1c40f;">【${r}】價格資訊</strong></div>
                            <div style="color:#e74c3c;">尚未登錄價格資料</div>
                        `;
                    }
                    tooltip.style.display = 'block';
                    tooltip.style.left = (e.clientX + 12) + 'px';
                    tooltip.style.top = (e.clientY + 12) + 'px';
                };

                tag.onmousemove = (e) => {
                    tooltip.style.left = (e.clientX + 12) + 'px';
                    tooltip.style.top = (e.clientY + 12) + 'px';
                };

                tag.onmouseleave = () => {
                    tooltip.style.display = 'none';
                };

                runeTd.appendChild(tag);
            });

            // 組合估算總價：計算已有總價，並加註缺字
            let priceDisplay = `<span class="price-tag">${totalPrice.toLocaleString()}</span>`;
            if (missingRunes.length > 0) {
                priceDisplay += ` <small class="price-missing">(缺: ${missingRunes.join(', ')})</small>`;
            }

            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td></td>
                <td>${priceDisplay}</td>
                <td>${item.effect}</td>
            `;
            tr.children[1].replaceWith(runeTd);
            tbody.appendChild(tr);
        });

        document.getElementById('armorRecordCount').innerText = `顯示筆數：${filtered.length} / ${data.length}`;
    }

    return {
        filterTable: render,
        clearSearch: function() {
            document.getElementById('armorSearchName').value = '';
            document.getElementById('armorSearchRune').value = '';
            document.getElementById('armorSearchEffect').value = '';
            render();
        },
        quickSearchRune: function(rune) {
            document.getElementById('armorSearchRune').value = rune;
            render();
        },
        getRawData: function() { return data; }
    };
})();