const URL_SHEET1_PROMO = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStVKNVl4FfeX193YQRDEFGE32rSDirwTdTY-unjHs5OseIiBROW0KKaMRtVTmMhQg0bnqmo3gaAejO/pub?gid=0&single=true&output=csv";
        const URL_SHEET2_HARGA = "https://docs.google.com/spreadsheets/d/e/2PACX-1vStVKNVl4FfeX193YQRDEFGE32rSDirwTdTY-unjHs5OseIiBROW0KKaMRtVTmMhQg0bnqmo3gaAejO/pub?gid=500363833&single=true&output=csv";

        const BOT_TOKEN = '8330506170:AAEsnemwSirxVMlUHG0ygNha2GFkxVBao-A';
        const CHAT_ID = '-1003594385102'; 
        const TOPIC_SALES = '2'; 
        const TOKEN_COMPLAINT = "8531770277:AAHeVSPnFszoaUxeGINKzF68EK0EiSX6j7c";
        const TOPIC_COMPLAINT = '13';

        let currentType = 'sales';
        let mapInitialized = false;
        let map, marker;

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal');
                else entry.target.classList.remove('reveal');
            });
        }, { root: null, threshold: 0.08 });

        function initScrollAnimations() {
            document.querySelectorAll('.scroll-animate').forEach(el => scrollObserver.observe(el));
        }

        function initTheme() {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.getElementById('themeToggleBtn').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
        }

        function toggleTheme() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            document.getElementById('themeToggleBtn').textContent = newTheme === 'dark' ? '☀️' : '🌙';
        }

        // 1. SKRIP LOGIKA VALIDASI & FORMAT OTOMATIS NOMOR WHATSAPP
        function validateAndFormatWA(input) {
            let val = input.value;
            // Bersihkan semua karakter non-angka
            let num = val.replace(/[^0-9]/g, '');
            
            // Auto-format jika mengetik berawalan 0 atau +62
            if (num.startsWith('0')) {
                num = '62' + num.substring(1);
            } else if (num.startsWith('8')) {
                num = '628' + num.substring(1);
            }
            
            input.value = num; // Masukkan kembali angka yang bersih ke dalam input field

            const hint = document.getElementById('wa-status-hint');
            if (num.length === 0) {
                hint.style.display = "none";
            } else if (num.length < 11 || num.length > 15) { 
                // Karena 62 + 9 digit minimal = 11 karakter total minimum
                hint.className = "input-hint-msg error";
                hint.innerText = "❌ Nomor terlalu pendek/panjang (Harus 9-13 digit angka).";
            } else {
                hint.className = "input-hint-msg success";
                hint.innerText = "✅ Format WhatsApp valid (Dimulai kode negara 62).";
            }
        }

        // HOVER EFFECT 3D DINAMIS KARTU PAKET
        function apply3DTiltEffect() {
            const cards = document.querySelectorAll('.custom-card');
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - (rect.left + rect.width / 2);
                    const y = e.clientY - (rect.top + rect.height / 2);
                    const rx = (+12 * (y / (rect.height / 2))).toFixed(2);
                    const ry = (-12 * (x / (rect.width / 2))).toFixed(2);
                    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });
            });
        }

        function toggleArticleContent() {
            const container = document.getElementById('articleContentArea');
            const button = document.getElementById('toggleArticleBtn');
            if (container.classList.contains('hidden-content')) {
                container.classList.remove('hidden-content');
                button.innerHTML = `<span>Sembunyikan Artikel</span> 📐`;
            } else {
                container.classList.add('hidden-content');
                button.innerHTML = `<span>Tampilkan Artikel</span> 📁`;
            }
        }

        function parseCSV(text) {
            const lines = text.split('\n').filter(l => l.trim() !== '');
            if(lines.length === 0) return [];
            const delimiter = lines[0].includes(';') ? ';' : ',';
            const headers = lines[0].split(delimiter).map(h => h.replace(/["\r]/g, '').trim());
            return lines.slice(1).map(line => {
                const values = line.split(delimiter).map(v => v.replace(/["\r]/g, '').trim());
                let obj = {};
                headers.forEach((header, index) => { obj[header] = values[index] || ''; });
                return obj;
            });
        }

        async function fetchSpreadsheetData() {
            try {
                const resHarga = await fetch(URL_SHEET2_HARGA);
                const csvHarga = await resHarga.text();
                renderHarga(parseCSV(csvHarga));
            } catch (err) { document.getElementById('harga-container').innerHTML = `Gagal memuat harga.`; }
            
            try {
                const resPromo = await fetch(URL_SHEET1_PROMO);
                const csvPromo = await resPromo.text();
                renderPromo(parseCSV(csvPromo));
            } catch (err) { document.getElementById('promo-container').innerHTML = `Gagal memuat promo.`; }
        }

        function renderHarga(data) {
            const container = document.getElementById('harga-container');
            if(!data || data.length === 0) return;
            const keys = Object.keys(data[0]);
            const first = data[0];
            const others = data.slice(1);
            
            document.getElementById('promo-paket-utama').innerHTML = `
            <div class="custom-card-wrapper">
                <div class="custom-card">
                    <div class="promo-ribbon">🚀 Khusus area tertentu</div>
                    <div>
                        <div class="card-top" style="align-items: center; margin-bottom: 0;">
                            <h4 class="package-name">${first[keys[0]] || 'Paket'}</h4>
                            <span class="speed-badge">${first[keys[1]] || ''}</span>
                        </div>
                        <div class="price-tag">${first[keys[2]] || ''}<span>/ bln</span></div>
                        <p class="package-desc">${first[keys[3]] || ''}</p>
                    </div>
                    <button class="btn-card-action" onclick="toggleChatBoxWithPackage('${first[keys[0]]}')">Pilih Paket</button>
                </div>
            </div>`;
            
            container.innerHTML = others.map(item => `
                <div class="custom-card-wrapper scroll-animate">
                    <div class="custom-card">
                        <div>
                            <div class="card-top">
                                <h4 class="package-name">${item[keys[0]] || 'Paket'}</h4>
                                <span class="speed-badge">${item[keys[1]] || ''}</span>
                            </div>
                            <div class="price-tag">${item[keys[2]] || ''} <span>/ bln</span></div>
                            <p class="package-desc">${item[keys[3]] || ''}</p>
                        </div>
                        <button class="btn-card-action" onclick="toggleChatBoxWithPackage('${item[keys[0]]}')">Pilih Paket</button>
                    </div>
                </div>
            `).join('');

            container.querySelectorAll('.scroll-animate').forEach(card => scrollObserver.observe(card));
            apply3DTiltEffect();
        }

        function renderPromo(data) {
            const container = document.getElementById('promo-container');
            const bottomContainer = document.getElementById('full-promo-bottom');
            if(!data || data.length === 0) return;
            const keys = Object.keys(data[0]);

            let filteredData = [...data];
            let firstPromoText = (data[0][keys[2]] || '').trim();

            if (firstPromoText.startsWith('http://') || firstPromoText.startsWith('https://')) {
                bottomContainer.innerHTML = `<img src="${firstPromoText}" class="full-promo-img" alt="Promo" loading="lazy">`;
                filteredData = data.slice(1);
            }

            container.innerHTML = filteredData.map(item => {
                const nama = item[keys[0]] || 'Pelanggan';
                const ratingCount = parseInt(item[keys[3]]) || 5;
                const isiTeks = (item[keys[2]] || '').trim();
                let kontenHTML = (isiTeks.startsWith('http://') || isiTeks.startsWith('https://')) 
                    ? `<img src="${isiTeks}" class="promo-banner-img" loading="lazy">`
                    : `<p class="review-text">"${isiTeks}"</p>`;
                return `
                    <div class="custom-card-wrapper scroll-animate">
                        <div class="custom-card">
                            <div>
                                <div class="review-header">
                                    <div class="review-avatar">${nama.charAt(0)}</div>
                                    <div class="review-info"><h4>${nama}</h4><span>${item[keys[1]] || ''}</span></div>
                                </div>
                                <div class="rating">${"⭐".repeat(ratingCount)}</div>
                                ${kontenHTML}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            container.querySelectorAll('.scroll-animate').forEach(card => scrollObserver.observe(card));
            apply3DTiltEffect();
        }

        function toggleChatBoxWithPackage(packageName) {
            const chatBox = document.getElementById('chatBox');
            if(!chatBox.classList.contains('active')) { toggleChatBox(); }
            switchChatType('sales');
            document.getElementById('form-paket-terpilih').value = packageName;
        }

        function toggleChatBox() {
            const chatBox = document.getElementById('chatBox');
            const backdrop = document.getElementById('chatBackdrop');
            chatBox.classList.toggle('active');
            backdrop.classList.toggle('active');
            document.body.classList.toggle('popup-open');
            if (chatBox.classList.contains('active') && currentType === 'sales') { 
                setTimeout(initLazyMap, 100);
            }
        }

        // 2. LOGIKA SELEKSI PETA TENTANG TAB KELUHAN (PETA DIHAPUS DARI KELUHAN)
        function switchChatType(type) {
            currentType = type;
            document.getElementById('tab-sales').classList.toggle('active', type === 'sales');
            document.getElementById('tab-complain').classList.toggle('active', type === 'complain');
            const dynamicFields = document.getElementById('dynamic-fields');
            document.getElementById('wa-status-hint').style.display = "none";
            document.getElementById('clientForm').reset();

            if(type === 'sales') {
                document.getElementById('chat-title').innerText = "Cek Cover Area";
                dynamicFields.innerHTML = `
                    <div class="field-group">
                        <input type="text" id="form-alamat" placeholder="Alamat Lengkap Rumah" required>
                    </div>
                    <div class="field-group">
                        <div id="map"></div>
                        <input type="text" id="form-coords" placeholder="Mencari titik lokasi map..." readonly style="background:var(--bg-main); font-size:0.8rem;">
                    </div>
                `;
                mapInitialized = false;
                setTimeout(initLazyMap, 100);
            } else {
                // Tab Keluhan diubah menjadi ringkas tanpa memuat Peta/GPS sama sekali
                document.getElementById('chat-title').innerText = "Pusat Gangguan & Komplain";
                dynamicFields.innerHTML = `
                    <div class="field-group">
                        <input type="text" id="form-idpel" placeholder="ID Pelanggan (Contoh: 102495)" required>
                    </div>
                    <div class="field-group">
                        <textarea id="form-keluhan" rows="3" placeholder="Tulis detail gangguan yang dialami..." required></textarea>
                    </div>
                    <div class="field-group">
                        <div class="upload-area" onclick="openMiniNote()">
                            <p>📸 Unggah Bukti Kendala (Foto/Video Router)</p>
                            <span id="preview-file-label" class="file-preview-text"></span>
                        </div>
                        <input type="file" id="form-file" accept="image/*,video/*" style="display: none;" onchange="handleFileProcessing(this)">
                    </div>
                `;
            }
        }

        function openMiniNote() {
            document.getElementById('noteOverlay').style.display = 'block';
            document.getElementById('notePopup').style.display = 'block';
        }

        function closeNoteAndTriggerUpload() {
            document.getElementById('noteOverlay').style.display = 'none';
            document.getElementById('notePopup').style.display = 'none';
            document.getElementById('form-file').click();
        }

        function handleFileProcessing(input) {
            const file = input.files[0];
            const label = document.getElementById('preview-file-label');
            if (file) {
                if (file.size > 10 * 1024 * 1024) {
                    alert("Berkas maksimal berkapasitas 10 MB.");
                    input.value = "";
                    label.style.display = "none";
                    return;
                }
                label.innerText = `📎 Terpilih: ${file.name}`;
                label.style.display = "block";
            }
        }

        function initLazyMap() {
            if(mapInitialized || !document.getElementById('map')) return;
            let defaultLat = -7.4266; let defaultLng = 111.0224;
            map = L.map('map').setView([defaultLat, defaultLng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            marker = L.marker([defaultLat, defaultLng], {draggable: true}).addTo(map);
            document.getElementById('form-coords').value = `${defaultLat}, ${defaultLng}`;
            
            const up = (la, ln) => document.getElementById('form-coords').value = `${la.toFixed(6)}, ${ln.toFixed(6)}`;
            marker.on('dragend', () => { const p = marker.getLatLng(); up(p.lat, p.lng); });
            map.on('click', (e) => { marker.setLatLng(e.latlng); up(e.latlng.lat, e.latlng.lng); });
            mapInitialized = true;

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude; const lng = position.coords.longitude;
                    map.setView([lat, lng], 16); marker.setLatLng([lat, lng]); up(lat, lng);
                }, null, { enableHighAccuracy: true, timeout: 5000 });
            }
        }

        async function handleSubmit(event) {
            event.preventDefault();
            
            const hpValue = document.getElementById('form-hp').value;
            if (hpValue.length < 11) {
                alert("Nomor WhatsApp belum lengkap/terlalu pendek. Periksa kembali.");
                return;
            }

            const overlay = document.getElementById('global-loading-overlay');
            overlay.style.display = 'flex';

            const nama = document.getElementById('form-nama').value;
            const textFormatWA = `Halo Kak ${nama}! Saya dari tim MyRepublic. Saya ingin mengonfirmasi pendaftaran pemasangan WiFi MyRepublic yang masuk ke sistem kami. Benar dengan Kakak untuk rencana pemasangannya? Mohon informasinya ya, Kak. Terima kasih.`;
            const linkWA = `https://wa.me/${hpValue}?text=${encodeURIComponent(textFormatWA)}`;

            let msg = `🚀 *DATA BARU MASUK WEBSITE*\n━━━━━━━━━━━━━━━━━━━━\n👤 *Nama:* ${nama}\n📞 *WhatsApp:* [${hpValue}](${linkWA})\n`;
            let currentToken = BOT_TOKEN; let threadId = TOPIC_SALES; let isComplaint = false;

            if (currentType === 'sales') {
                const alamat = document.getElementById('form-alamat').value;
                const paket = document.getElementById('form-paket-terpilih').value;
                const coords = document.getElementById('form-coords').value;
                msg += `📦 *Paket:* ${paket}\n📍 *Alamat:* ${alamat}\n🗺️ *Peta:* [Buka Peta](https://www.google.com/maps?q=${encodeURIComponent(coords)})`;
            } else {
                msg += `📁 *Kategori:* Komplain\n🆔 *ID Pelanggan:* ${document.getElementById('form-idpel').value}\n` +
                       `📝 *Keluhan:* ${document.getElementById('form-keluhan').value}`;
                currentToken = TOKEN_COMPLAINT; threadId = TOPIC_COMPLAINT; isComplaint = true;
            }

            try {
                let sendSuccess = false;
                const fileInput = document.getElementById('form-file');

                if (isComplaint && fileInput && fileInput.files.length > 0) {
                    const fileObj = fileInput.files[0];
                    const formData = new FormData();
                    formData.append('chat_id', CHAT_ID);
                    formData.append('message_thread_id', threadId);
                    formData.append('caption', msg);
                    formData.append('parse_mode', 'Markdown');

                    let method = "sendPhoto";
                    const ext = fileObj.name.toLowerCase();
                    if (ext.endsWith('.mp4') || ext.endsWith('.mov')) { method = "sendVideo"; formData.append('video', fileObj); }
                    else { formData.append('photo', fileObj); }

                    const res = await fetch(`https://api.telegram.org/bot${currentToken}/${method}`, { method: 'POST', body: formData });
                    sendSuccess = res.ok;
                } else {
                    const res = await fetch(`https://api.telegram.org/bot${currentToken}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: CHAT_ID, message_thread_id: threadId, text: msg, parse_mode: 'Markdown' })
                    });
                    sendSuccess = res.ok;
                }

                if (sendSuccess) {
                    alert('Data sukses terkirim tim Teknisi kami.');
                    document.getElementById('clientForm').reset();
                    toggleChatBox();
                } else { alert('Gagal mengirim data.'); }
            } catch (err) { alert('Terjadi gangguan jaringan.'); }
            finally { overlay.style.display = 'none'; }
        }

        window.onload = function() {
            initTheme();
            fetchSpreadsheetData();
            initScrollAnimations();
            document.getElementById('current-year').textContent = new Date().getFullYear();
        };

const dataHargaStatis = [{PAKET:"Ringan",KECEPATAN:"50 Mbps",HARGA:"Rp110.000"},{PAKET:"PAS",KECEPATAN:"75 Mbps",HARGA:"Rp138.750"},{PAKET:"EKONOMIS",KECEPATAN:"100 Mbps",HARGA:"Rp166.500"},{PAKET:"NEO",KECEPATAN:"200 Mbps",HARGA:"Rp233.100"},{PAKET:"VELO",KECEPATAN:"300 Mbps",HARGA:"Rp277.500"},{PAKET:"NEXUS",KECEPATAN:"400 Mbps",HARGA:"Rp333.000"},{PAKET:"PRIME",KECEPATAN:"500 Mbps",HARGA:"Rp555.000"},{PAKET:"WONDER",KECEPATAN:"750 Mbps",HARGA:"Rp721.500"},{PAKET:"ULTRA 1Gb",KECEPATAN:"1 Gbps",HARGA:"Rp943.500"},{PAKET:"MyGamer S350",KECEPATAN:"350 Mbps",HARGA:"Rp444.000"},{PAKET:"MyGamer G500",KECEPATAN:"500 Mbps",HARGA:"Rp610.500"},{PAKET:"MyGamer D750",KECEPATAN:"750 Mbps",HARGA:"Rp777.000"},{PAKET:"MyGamer P1",KECEPATAN:"1 Gbps",HARGA:"Rp999.000"}]; renderHarga(dataHargaStatis);