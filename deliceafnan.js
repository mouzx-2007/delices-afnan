// ==========================================
// 1️⃣ التحكم في طرق اختيار المقاس وتبديل الواجهات
// ==========================================
const btnDimensions = document.getElementById('btnDimensions');
const btnGuests = document.getElementById('btnGuests');
const dimensionsSection = document.getElementById('dimensionsSection');
const guestsSection = document.getElementById('guestsSection');

if (btnDimensions && btnGuests && dimensionsSection && guestsSection) {
    btnDimensions.addEventListener('click', function() {
        btnDimensions.classList.add('active');
        btnGuests.classList.remove('active');
        dimensionsSection.style.display = 'block';
        guestsSection.style.display = 'none';
        updateSummary();
    });

    btnGuests.addEventListener('click', function() {
        btnGuests.classList.add('active');
        btnDimensions.classList.remove('active');
        dimensionsSection.style.display = 'none';
        guestsSection.style.display = 'block';
        updateSummary();
    });
}

// ==========================================
// 2️⃣ دالة التحديث الحي لملخص المواصفات (المطورة والآمنة)
// ==========================================
function updateSummary() {
    const sumShapeEl = document.getElementById('sumShape');
    const sumColorEl = document.getElementById('sumColor');
    const sumSizeEl = document.getElementById('sumSize');

    const cakeShape = document.getElementById('cakeShape')?.value || 'دائري كلاسيكي';
    const cakeColor = document.getElementById('cakeColor')?.value || 'حسب اختيارك الموضح';
    
    let sizeText = '';
    const dimensionsSection = document.getElementById('dimensionsSection');
    const isDimensions = dimensionsSection && dimensionsSection.style.display === 'block';
    
    if (isDimensions) {
        const length = document.getElementById('cakeLength')?.value || '20';
        const width = document.getElementById('cakeWidth')?.value || '20';
        const height = document.getElementById('cakeHeight')?.value || 'طبقة واحدة';
        sizeText = `أبعادها ${length}×${width} سم (${height})`;
    } else {
        const guests = document.getElementById('guestsCount')?.value || '15';
        const slices = document.getElementById('slicesCount')?.value || '15';
        sizeText = `تكفي لـ ${guests} ضيف (مجهزة لـ ${slices} قطعة أكل)`;
    }

    if (sumShapeEl) sumShapeEl.textContent = cakeShape;
    if (sumColorEl) sumColorEl.textContent = cakeColor;
    if (sumSizeEl) sumSizeEl.textContent = sizeText;
}

// دالة مساعدة لربط الأحداث بأمان دون التسبب في خطأ Null
function safeAddListener(id, event, callback) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener(event, callback);
    }
}

safeAddListener('cakeShape', 'change', updateSummary);
safeAddListener('cakeColor', 'input', updateSummary);
safeAddListener('cakeLength', 'input', updateSummary);
safeAddListener('cakeWidth', 'input', updateSummary);
safeAddListener('cakeHeight', 'change', updateSummary);
safeAddListener('guestsCount', 'input', updateSummary);
safeAddListener('slicesCount', 'input', updateSummary);

// ==========================================
// 3️⃣ معالجة إرسال البيانات فوراً لـ Formspree و Messenger
// ==========================================
const formElement = document.getElementById('cakeOrderForm');
if (formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('customerName')?.value || 'زبون مجهول';
        const phone = document.getElementById('customerPhone')?.value || 'لا يوجد رقم';
        const shape = document.getElementById('cakeShape')?.value || 'دائري كلاسيكي';
        const color = document.getElementById('cakeColor')?.value || 'حسب ذوق الوالدة';
        const notes = document.getElementById('cakeNotes')?.value || 'لا توجد ملاحظات إضافية';
        
        let sizeInfo = '';
        const dimensionsSection = document.getElementById('dimensionsSection');
        const isDimensions = dimensionsSection && dimensionsSection.style.display === 'block';
        
        if (isDimensions) {
            sizeInfo = `📐 الأبعاد: الطول ${document.getElementById('cakeLength')?.value || '20'}سم × العرض ${document.getElementById('cakeWidth')?.value || '20'}سم (${document.getElementById('cakeHeight')?.value || 'طبقة واحدة'})`;
        } else {
            sizeInfo = `👥 الحجم: مناسب لـ ${document.getElementById('guestsCount')?.value || '15'} ضيف (القطع المطلوبة: ${document.getElementById('slicesCount')?.value || '15'} قطعة)`;
        }

        const messengerUrl = "https://m.me/afnan.delices"; 
        const formspreeApiUrl = 'https://formspree.io/f/mrevqdpw';

        fetch(formspreeApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "اسم الزبون": name,
                "رقم الهاتف": phone,
                "شكل الكعكة": shape,
                "الألوان والثيم": color,
                "المقاس والحجم": sizeInfo,
                "ملاحظات الزبون": notes
            })
        })
        .then(response => {
            window.open(messengerUrl, '_blank');
        })
        .catch(error => {
            console.error('Error sending data to Formspree:', error);
            window.open(messengerUrl, '_blank');
        });
    });
}