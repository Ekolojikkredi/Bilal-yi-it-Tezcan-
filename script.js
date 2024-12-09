const puanlama = {
    yag: 5,
    tekstil: 3,
    pil: 2,
    elektronik: 6,
    kagit: 2,
    cam: 1,
    metal: 4,
    plastik: 2
};

let kayitlar = [];

function kayitOl(event) {
    event.preventDefault();
    const adi = document.getElementById('ogrenci-adi').value;
    const soyadi = document.getElementById('ogrenci-soyadi').value;
    const okulNo = document.getElementById('ogrenci-numara').value;
    const okulAdi = document.getElementById('ogrenci-okul').value;
    const email = document.getElementById('ogrenci-email').value;
    const telefon = document.getElementById('ogrenci-telefon').value;

    if (adi && soyadi && okulNo && okulAdi && email && telefon) {
        const ogrenci = {
            adi, soyadi, okulNo, okulAdi, email, telefon, atiklar: []
        };

        localStorage.setItem(okulNo, JSON.stringify(ogrenci));
      alert('Öğrenci kaydedildi!');
        document.getElementById('ogrenciKayitForm').reset();
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
}

function veriGirisi(event) {
    event.preventDefault();
    const atikTuru = document.getElementById('atik-turu').value;
    const miktar = parseFloat(document.getElementById('miktar').value);
    const kayitYapan = document.getElementById('kayit-yapan').value;
    const okulNo = document.getElementById('ogrenci-numara').value;

    if (atikTuru && miktar && kayitYapan && okulNo) {
        const atikPuan = puanlama[atikTuru] * miktar;
        
        const ogrenci = JSON.parse(localStorage.getItem(okulNo));
        if (ogrenci) {
            const atik = {
                tarih: new Date().toLocaleDateString(),
                atikTuru,
                miktar,
                puan: atikPuan,
                kayitYapan
            };
            ogrenci.atiklar.push(atik);
            localStorage.setItem(okulNo, JSON.stringify(ogrenci));
            alert('Atık başarıyla kaydedildi!');
            document.getElementById('atikGirisForm').reset();
        } else {
            alert('Öğrenci bulunamadı! Lütfen doğru okul numarası girin.');
        }
    } else {
        alert('Lütfen tüm alanları doldurun!');
    }
}

function veriGoruntule() {
    const okulNo = document.getElementById('okul-no').value;
    const ogrenci = JSON.parse(localStorage.getItem(okulNo));

    const atikKayitlariTBody = document.querySelector('#atikkayitlari tbody');
    atikKayitlariTBody.innerHTML = ''; // Önceden eklenmiş verileri temizle

    if (ogrenci) {
        ogrenci.atiklar.forEach(atik => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${atik.tarih}</td>
                <td>${atik.atikTuru}</td>
                <td>${atik.miktar} kg</td>
                <td>${atik.puan}</td>
                <td>${atik.kayitYapan}</td>
            `;
            atikKayitlariTBody.appendChild(tr);
        });
    } else {
        alert('Öğrenci bulunamadı! Lütfen doğru okul numarası girin.');
    }
}

function toplamAtik() {
    const okulNo = document.getElementById('okul-no-toplam').value;
    const ogrenci = JSON.parse(localStorage.getItem(okulNo));

    if (ogrenci) {
        let toplamPuan = 0;
        ogrenci.atiklar.forEach(atik => {
            toplamPuan += atik.puan;
        });
        document.getElementById('toplam-atik-puan').textContent = `Toplam Atık Puanı: ${toplamPuan}`;
    } else {
        alert('Öğrenci bulunamadı! Lütfen doğru okul numarası girin.');
    }
}

function showPage(pageId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    const activeSection = document.getElementById(pageId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }
}

// Sayfa yüklendiğinde ilk olarak Kayıt Ol sayfasını göster
document.addEventListener('DOMContentLoaded', () => {
    showPage('kayit-form');
});
