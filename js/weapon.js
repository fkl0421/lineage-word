import { PriceStorage } from './common.js';

export const WeaponModule = (function() {
    const data = [
        { name: "災火餘", runes: ["焱", "炯", "洛", "-"], effect: "天使系傷害加成+20、泰坦系傷害加成+20、惡魔系傷害加成+20" },
        { name: "末日燎原", runes: ["焱", "炯", "洛", "勒"], effect: "天使系傷害加成+40、泰坦系傷害加成+40、惡魔系傷害加成+40" },
        { name: "翼標", runes: ["甸", "瓦", "-", "-"], effect: "近距離傷害+4" },
        { name: "聖光孔", runes: ["甸", "瓦", "榮", "-"], effect: "近距離傷害+4、天使系傷害加成+40" },
        { name: "破翼擊", runes: ["甸", "瓦", "卍", "-"], effect: "3%機率提升傷害15%、天使系傷害加成+40、近距離傷害+6" },
        { name: "墜天貫穿", runes: ["甸", "瓦", "榮", "燮"], effect: "近距離傷害+4、天使系傷害加成+40、6%機率提升傷害15%" },
        { name: "裂聖狙殺", runes: ["甸", "瓦", "卍", "燮"], effect: "近距離傷害+4、天使系傷害加成+60、9%機率提升傷害15%" },
        { name: "逆光", runes: ["殤", "契", "-", "-"], effect: "遠距離傷害+4" },
        { name: "聖域碎", runes: ["殤", "契", "熙", "-"], effect: "遠距離傷害+4、天使系傷害加成+40" },
        { name: "褻聖斬", runes: ["殤", "契", "婭", "-"], effect: "3%機率提升傷害15%、天使系傷害加成+40、遠距離傷害+6" },
        { name: "墮天裁決", runes: ["殤", "契", "熙", "勒"], effect: "遠距離傷害+4、天使系傷害加成+40、6%機率提升傷害15%" },
        { name: "屠聖終章", runes: ["殤", "契", "婭", "勒"], effect: "遠距離傷害+4、天使系傷害加成+60、9%機率提升傷害15%" },
        { name: "巨影", runes: ["諾", "炯", "-", "-"], effect: "近距離傷害+4" },
        { name: "岩甲穿", runes: ["諾", "炯", "斯", "-"], effect: "近距離傷害+4、泰坦系傷害加成+40" },
        { name: "破嶺擊", runes: ["諾", "炯", "坦", "-"], effect: "3%機率提升傷害15%、泰坦系傷害加成+40、近距離傷害+6" },
        { name: "崩岳貫穿", runes: ["諾", "炯", "斯", "卍"], effect: "近距離傷害+4、泰坦系傷害加成+40、6%機率提升傷害15%" },
        { name: "滅坦狙殺", runes: ["諾", "炯", "坦", "卍"], effect: "近距離傷害+4、泰坦系傷害加成+60、9%機率提升傷害15%" },
        { name: "巨軀", runes: ["泰", "叱", "-", "-"], effect: "遠距離傷害+4" },
        { name: "岩鎧碎", runes: ["泰", "叱", "洛", "-"], effect: "遠距離傷害+4、泰坦系傷害加成+40" },
        { name: "碎嶺斬", runes: ["泰", "叱", "勒", "-"], effect: "3%機率提升傷害15%、泰坦系傷害加成+40、遠距離傷害+6" },
        { name: "崩山裁決", runes: ["泰", "叱", "洛", "輝"], effect: "遠距離傷害+4、泰坦系傷害加成+40、6%機率提升傷害15%" },
        { name: "屠坦終章", runes: ["泰", "叱", "勒", "輝"], effect: "遠距離傷害+4、泰坦系傷害加成+60、9%機率提升傷害15%" },
        { name: "魔痕", runes: ["煨", "斯", "-", "-"], effect: "近距離傷害+4" },
        { name: "邪焰孔", runes: ["煨", "斯", "旭", "-"], effect: "近距離傷害+4、惡魔系傷害加成+40" },
        { name: "破獄擊", runes: ["煨", "斯", "燮", "-"], effect: "3%機率提升傷害15%、惡魔系傷害加成+40、近距離傷害+6" },
        { name: "深淵貫穿", runes: ["煨", "斯", "旭", "坦"], effect: "近距離傷害+4、惡魔系傷害加成+40、6%機率提升傷害15%" },
        { name: "誅魔狙殺", runes: ["煨", "斯", "燮", "坦"], effect: "近距離傷害+4、惡魔系傷害加成+60、9%機率提升傷害15%" },
        { name: "魔狙", runes: ["怨", "撼", "-", "-"], effect: "遠距離傷害+4" },
        { name: "邪鐵碎", runes: ["怨", "撼", "迪", "-"], effect: "遠距離傷害+4、惡魔系傷害加成+40" },
        { name: "破魔斬", runes: ["怨", "撼", "婭", "-"], effect: "3%機率提升傷害15%、惡魔系傷害加成+40、遠距離傷害+6" },
        { name: "煉獄裁決", runes: ["怨", "撼", "迪", "奧"], effect: "遠距離傷害+4、惡魔系傷害加成+40、6%機率提升傷害15%" },
        { name: "屠魔終章", runes: ["怨", "撼", "婭", "奧"], effect: "遠距離傷害+4、惡魔系傷害加成+60、9%機率提升傷害15%" },
        { name: "能脈", runes: ["泠", "迪", "-", "-"], effect: "魔法爆擊率+4" },
        { name: "魔律曲", runes: ["泠", "迪", "榮", "-"], effect: "魔法爆擊率+4、智力+1" },
        { name: "法核爆裂", runes: ["泠", "迪", "榮", "爚"], effect: "魔法爆擊率+4、智力+1、魔攻+6" },
        { name: "專注", runes: ["庠", "仝", "-", "-"], effect: "技術命中+4" },
        { name: "鋼心準", runes: ["庠", "仝", "旭", "-"], effect: "近距離攻擊+4、技術命中+4" },
        { name: "戰志命中", runes: ["庠", "仝", "旭", "卍"], effect: "力量+1、近距離攻擊+6、技術命中+8" },
        { name: "靈感", runes: ["莫", "凡", "-", "-"], effect: "精靈命中+4" },
        { name: "翱影準", runes: ["莫", "凡", "榮", "-"], effect: "近距離攻擊+4、精靈命中+4" },
        { name: "命軌靈律", runes: ["莫", "凡", "榮", "婭"], effect: "力量+1、近距離攻擊+6、精靈命中+8" },
        { name: "龍鏈", runes: ["克", "瓦", "-", "-"], effect: "龍屬命中+4" },
        { name: "鎮牙準", runes: ["克", "瓦", "熙", "-"], effect: "近距離攻擊+4、龍屬命中+4" },
        { name: "龍擊必中", runes: ["克", "瓦", "熙", "坦"], effect: "力量+1、近距離攻擊+6、龍屬命中+8" },
        { name: "震懾", runes: ["沁", "仄", "-", "-"], effect: "恐怖命中+4" },
        { name: "戰懾準", runes: ["沁", "仄", "洛", "-"], effect: "近距離攻擊+4、恐怖命中+4" },
        { name: "血威制壓", runes: ["沁", "仄", "洛", "奧"], effect: "力量+1、近距離攻擊+6、恐怖命中+8" },
        { name: "誓念韻", runes: ["炯", "叱", "洛", "-"], effect: "天使系傷害加成+40、1%收取魔力+14" },
        { name: "頭標信仰", runes: ["炯", "叱", "洛", "爚"], effect: "天使系傷害加成+60、1%收取魔力+14、火屬性防禦+10" },
        { name: "荒獵跡", runes: ["炯", "迪", "熙", "-"], effect: "泰坦系傷害加成+40、1%收取體力+14" },
        { name: "無盡荒獵", runes: ["炯", "迪", "熙", "勒"], effect: "泰坦系傷害加成+60、1%收取體力+14、地屬性防禦+10" },
        { name: "審判裁", runes: ["迪", "旭", "洛", "-"], effect: "惡魔系傷害加成+40、PVP額外傷害+4" },
        { name: "末日審判", runes: ["迪", "旭", "洛", "燮"], effect: "惡魔系傷害加成+60、PVP額外傷害+4、水屬性防禦+10" },
        { name: "原罪", runes: ["叱", "斯", "-", "-"], effect: "魔法命中+1" },
        { name: "原之罪", runes: ["叱", "斯", "卍", "-"], effect: "精神+1、魔法命中+2" },
        { name: "不滅原罪", runes: ["叱", "斯", "卍", "劮"], effect: "智力+1、精神+2、魔法命中+4" },
        { name: "冥血", runes: ["契", "沌", "-", "-"], effect: "近距離命中+2、3%機率傷害提升15%" },
        { name: "冥血脈", runes: ["契", "沌", "坦", "-"], effect: "力量+1、近距離命中+4、6%機率傷害提升15%" },
        { name: "冥血之裔", runes: ["契", "沌", "坦", "奧"], effect: "力量+1、近距離命中+6、9%機率傷害提升15%" },
        { name: "屠戮", runes: ["契", "洛", "-", "-"], effect: "PVP額外傷害+2、2%機率傷害提升15%" },
        { name: "屠戮令", runes: ["契", "洛", "奧", "-"], effect: "敏捷+1、PVP額外傷害+4、6%機率傷害提升15%" },
        { name: "屠戮殆盡", runes: ["契", "洛", "奧", "爚"], effect: "敏捷+1、PVP額外傷害+6、9%機率傷害提升15%" },
        { name: "聖諭", runes: ["旭", "熙", "-", "-"], effect: "近距離攻擊+6" },
        { name: "聖諭錄", runes: ["旭", "熙", "爚", "-"], effect: "近距離攻擊+6、魔法命中+2" },
        { name: "聖諭史詩", runes: ["旭", "熙", "爚", "璿"], effect: "近距離攻擊+6、1%收取魔力+14、魔法命中+4" },
        { name: "精靈誓", runes: ["叱", "卍", "婭", "-"], effect: "精靈命中+4、遠距離命中+4、遠距離傷害+4" },
        { name: "精靈神話", runes: ["叱", "卍", "婭", "勒"], effect: "精靈命中+8、遠距離命中+6、遠距離傷害+6" },
        { name: "雷鳴起", runes: ["洛", "爚", "輝", "-"], effect: "6%機率傷害提升15%、魔法爆擊率+2%、擊中時5%施展極道落雷" },
        { name: "萬雷的怒吼", runes: ["洛", "爚", "輝", "璿"], effect: "9%機率傷害提升15%、魔法爆擊率+4%、擊中時8%施展極道落雷" },
        { name: "赤焰兆", runes: ["斯", "坦", "燮", "-"], effect: "近距離命中+4、PVP額外傷害+2、擊中時3%施展烈炎術" },
        { name: "末日的狂歡", runes: ["斯", "坦", "燮", "奧"], effect: "近距離命中+6、PVP額外傷害+4、擊中時6%施展烈炎術" },
        { name: "地血汲", runes: ["赫", "坦", "璿", "-"], effect: "6%機率傷害提升15%、1%收取體力+14、擊中時3%發動吸血鬼之吻" },
        { name: "蓋婭的復仇", runes: ["赫", "坦", "璿", "劮"], effect: "9%機率傷害提升15%、1%收取體力+21、擊中時6%發動吸血鬼之吻" },
        { name: "風暴", runes: ["斯", "輝", "爚", "-"], effect: "1%收取魔力+14、傷害減免+2、擊中時1%發動雷霆風暴" },
        { name: "暴虐", runes: ["斯", "輝", "爚", "璿"], effect: "1%收取魔力+21、傷害減免+4、擊中時3%發動雷霆風暴" },
        { name: "迅流動", runes: ["卍", "燮", "輝", "-"], effect: "技術命中+8、精靈命中+8、閃避率+10" },
        { name: "急速之流", runes: ["卍", "燮", "輝", "劮"], effect: "技術命中+12、精靈命中+12、閃避率+20" },
        { name: "霜銑", runes: ["坦", "卍", "-", "-"], effect: "1%收取體力+7、藥水恢復量+3、藥水恢復率+3%、擊中時2%施展冰錐" },
        { name: "寒冷冽", runes: ["坦", "卍", "爚", "-"], effect: "1%收取體力+14、藥水恢復量+6、藥水恢復率+6%、擊中時5%施展冰錐" },
        { name: "殘暴的榮耀", runes: ["坦", "卍", "爚", "璿"], effect: "1%收取體力+21、藥水恢復量+9、藥水恢復率+9%、擊中時8%施展冰錐" },
        { name: "悔誓", runes: ["奧", "燮", "-", "-"], effect: "近距離攻擊+2、近距離爆擊率+2%、擊中時1%施展究極光裂術" },
        { name: "稟魔誓", runes: ["奧", "燮", "爚", "-"], effect: "近距離攻擊+4、近距離爆擊率+4%、擊中時2%施展究極光裂術" },
        { name: "惡魔的背棄", runes: ["奧", "燮", "爚", "輝"], effect: "近距離攻擊+6、近距離爆擊率+6%、擊中時3%施展究極光裂術" },
        { name: "霸影", runes: ["卍", "坦", "-", "-"], effect: "遠距離爆擊率+2%、魔法爆擊率+2%、擊中時1%施展地裂術" },
        { name: "權勢裂", runes: ["卍", "坦", "燮", "-"], effect: "遠距離爆擊率+4%、魔法爆擊率+4%、擊中時3%施展地裂術" },
        { name: "霸業的沉淪", runes: ["卍", "坦", "燮", "璿"], effect: "遠距離爆擊率+6%、魔法爆擊率+6%、擊中時6%施展地裂術" },
        { name: "神裂", runes: ["婭", "奧", "-", "-"], effect: "3%機率傷害提升15%、藥水恢復量+3、藥水恢復率+3%、擊中時1%施展寒冰尖刺" },
        { name: "叛神令", runes: ["婭", "奧", "燮", "-"], effect: "6%機率傷害提升15%、藥水恢復量+6、藥水恢復率+6%、擊中時2%施展寒冰尖刺" },
        { name: "諸神的反叛", runes: ["婭", "奧", "燮", "璿"], effect: "9%機率傷害提升15%、藥水恢復量+9、藥水恢復率+9%、擊中時4%施展寒冰尖刺" },
        { name: "至高誓", runes: ["燮", "奧", "爚", "-"], effect: "近距離攻擊+4、近距離爆擊率+4%、擊中時1%發動流星雨" },
        { name: "無上的誓言", runes: ["燮", "奧", "爚", "劮"], effect: "近距離攻擊+6、近距離爆擊率+6%、擊中時3%發動流星雨" },
        { name: "聖光護", runes: ["卍", "坦", "勒", "-"], effect: "力量+1、近距離命中+4、擊中時1%發動聖結界" },
        { name: "天使的庇護", runes: ["卍", "坦", "勒", "劮"], effect: "力量+1、近距離命中+6、擊中時2%發動聖結界" },
        { name: "怒兆", runes: ["坦", "婭", "-", "-"], effect: "1%收取魔力+7、傷害減免+2、擊中時1%發動地裂術" },
        { name: "泰權怒", runes: ["坦", "婭", "卍", "-"], effect: "1%收取魔力+14、傷害減免+4、擊中時3%發動地裂術" },
        { name: "克洛諾斯之怒", runes: ["坦", "婭", "卍", "燮"], effect: "1%收取魔力+21、傷害減免+6、擊中時6%發動地裂術" },
        { name: "焰勢動", runes: ["婭", "坦", "卍", "-"], effect: "1%收取魔力+7、傷害減免+2、擊中時1%發動流星雨" },
        { name: "怒火燎原", runes: ["婭", "坦", "卍", "輝"], effect: "1%收取魔力+21、傷害減免+4、擊中時3%發動流星雨" },
        { name: "恩光", runes: ["奧", "勒", "-", "-"], effect: "近距離爆擊率+2%、遠距離爆擊率+2%、1%施展仝部治癒術" },
        { name: "聖恩臨", runes: ["奧", "勒", "輝", "-"], effect: "近距離爆擊率+4%、遠距離爆擊率+4%、2%施展仝部治癒術" },
        { name: "天使的救贖", runes: ["奧", "勒", "輝", "璿"], effect: "近距離爆擊率+6%、遠距離爆擊率+6%、4%施展仝部治癒術" },
        { name: "雲潮動", runes: ["坦", "卍", "輝", "-"], effect: "3%機率傷害提升15%、1%收取魔力+7、擊中時1%施展龍捲風" },
        { name: "風起雲湧", runes: ["坦", "卍", "輝", "璿"], effect: "6%機率傷害提升15%、1%收取魔力+14、擊中時3%施展龍捲風" },
        { name: "星湧", runes: ["坦", "燮", "-", "-"], effect: "近距離傷害+2、1%收取魔力+7、擊中時1%機率施展魔力奪取" },
        { name: "星牽引", runes: ["坦", "燮", "爚", "-"], effect: "近距離傷害+4、1%收取魔力+14、擊中時3%機率施展魔力奪取" },
        { name: "吸星渦流", runes: ["坦", "燮", "爚", "璿"], effect: "近距離傷害+6、1%收取魔力+21、擊中時6%機率施展魔力奪取" }
    ];

    // 初始化全域 Tooltip 容器
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
        const nameQuery = document.getElementById('weaponSearchName').value.trim().toLowerCase();
        const runeQuery = document.getElementById('weaponSearchRune').value.trim().toLowerCase();
        const effectQuery = document.getElementById('weaponSearchEffect').value.trim().toLowerCase();

        const tbody = document.getElementById('weaponTableBody');
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
            document.getElementById('weaponRecordCount').innerText = '顯示筆數：0';
            return;
        }

        filtered.forEach(item => {
            const tr = document.createElement('tr');
            let totalPrice = 0;
            let missingPrice = false;

            const runeTd = document.createElement('td');

            item.runes.filter(r => r !== '-').forEach(r => {
                const stat = runeStats[r];
                const tag = document.createElement('span');
                tag.className = 'rune-tag';
                tag.innerText = r;
                tag.onclick = () => window.WeaponModule.quickSearchRune(r);

                if (stat) {
                    totalPrice += stat.latestPrice;
                } else {
                    missingPrice = true;
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

            // 組合估算總價：有缺價則顯示缺價
            let priceDisplay = missingPrice 
                ? '<span class="price-missing">缺價</span>' 
                : `<span class="price-tag">${totalPrice.toLocaleString()}</span>`;

            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td></td>
                <td>${priceDisplay}</td>
                <td>${item.effect}</td>
            `;
            tr.children[1].replaceWith(runeTd);
            tbody.appendChild(tr);
        });

        document.getElementById('weaponRecordCount').innerText = `顯示筆數：${filtered.length} / ${data.length}`;
    }

    return {
        filterTable: render,
        clearSearch: function() {
            document.getElementById('weaponSearchName').value = '';
            document.getElementById('weaponSearchRune').value = '';
            document.getElementById('weaponSearchEffect').value = '';
            render();
        },
        quickSearchRune: function(rune) {
            document.getElementById('weaponSearchRune').value = rune;
            render();
        },
        getRawData: function() { return data; }
    };
})();