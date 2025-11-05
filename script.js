// 1. قائمة التطبيقات ومعلومات الشحن
const appsData = [
    { name: "كوكو لايف", id: "koko", img: "https://example.com/koko.png", prices: { "500 كوينز": 5, "1000 كوينز": 9, "2500 كوينز": 20 } },
    { name: "اوهلا شات", id: "ohla", img: "https://example.com/ohla.png", prices: { "100 ماسة": 2, "500 ماسة": 8, "1000 ماسة": 15 } },
    { name: "وناسة", id: "wanasa", img: "https://example.com/wanasa.png", prices: { "500 نقطة": 7, "1500 نقطة": 20, "3000 نقطة": 35 } },
    { name: "هلا شات", id: "hala", img: "https://example.com/hala.png", prices: { "300 كوينز": 4, "900 كوينز": 10, "2000 كوينز": 22 } },
    { name: "مرحبا شات", id: "marhaba", img: "https://example.com/marhaba.png", prices: { "100 عملة": 3, "600 عملة": 15, "1200 عملة": 28 } },
    { name: "سول شيل", id: "soulchill", img: "https://example.com/soulchill.png", prices: { "500 رصيد": 6, "1000 رصيد": 11, "2000 رصيد": 21 } },
    { name: "سول يو", id: "soulyou", img: "https://example.com/soulyou.png", prices: { "50 ماسة": 1, "300 ماسة": 5, "1000 ماسة": 16 } },
    { name: "تاكا تاكا", id: "takataka", img: "https://example.com/takataka.png", prices: { "1000 نقطة": 12, "5000 نقطة": 55 } },
    { name: "بارتي ستار", id: "partystar", img: "https://example.com/partystar.png", prices: { "500 قطعة": 8, "1000 قطعة": 15 } },
    { name: "بيغو لايف", id: "bigo", img: "https://example.com/bigo.png", prices: { "420 ماسة": 10, "850 ماسة": 20, "2125 ماسة": 49 } },
    { name: "ليجو لايف", id: "lego", img: "https://example.com/lego.png", prices: { "1000 كوينز": 15, "5000 كوينز": 70 } }
    // يمكنك إضافة المزيد هنا
];

// ملاحظة: روابط الصور (img: "https://example.com/...") يجب استبدالها بروابط صور التطبيقات الحقيقية الخاصة بك.

const container = document.querySelector('.app-list-container');
const modal = document.getElementById('purchaseModal');
const closeButton = document.querySelector('.close-button');
const quantitySelect = document.getElementById('quantity');
const priceDisplay = document.getElementById('currentPrice');
let currentApp = null; // لتخزين بيانات التطبيق الحالي

// 2. إنشاء بطاقات التطبيقات في HTML
appsData.forEach(app => {
    const card = document.createElement('div');
    card.classList.add('app-card');
    card.setAttribute('data-app-id', app.id);
    card.innerHTML = `
        <img src="${app.img}" alt="صورة ${app.name}">
        <div class="app-name-box">
            ${app.name}
        </div>
    `;
    card.addEventListener('click', () => openPurchaseModal(app));
    container.appendChild(card);
});

// 3. فتح نافذة الشراء (المودال)
function openPurchaseModal(app) {
    currentApp = app;
    document.getElementById('modalAppName').textContent = app.name;
    document.getElementById('modalAppImage').src = app.img;
    document.getElementById('userId').value = ''; // مسح حقل الإيدي
    
    // تعبئة خيارات الكمية
    quantitySelect.innerHTML = '<option value="" disabled selected>اختر الكمية</option>';
    for (const quantity in app.prices) {
        const option = document.createElement('option');
        // القيمة (value) ستكون السعر، والنص المرئي هو الكمية
        option.value = app.prices[quantity]; 
        option.textContent = `${quantity} (السعر: ${app.prices[quantity]}$)`;
        quantitySelect.appendChild(option);
    }

    // تحديث السعر عند اختيار كمية
    quantitySelect.onchange = updatePriceDisplay;
    
    // إعادة تعيين السعر الأولي
    priceDisplay.textContent = '0'; 
    modal.style.display = 'block';
}

// 4. تحديث عرض السعر
function updatePriceDisplay() {
    const selectedPrice = quantitySelect.value;
    priceDisplay.textContent = selectedPrice || '0';
}

// 5. إغلاق النافذة
closeButton.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// 6. وظيفة إتمام الطلب (يمكنك تعديلها لإرسال الطلب فعلياً)
function completePurchase() {
    const userId = document.getElementById('userId').value;
    const quantityOption = quantitySelect.options[quantitySelect.selectedIndex];
    const price = quantityOption ? quantityOption.value : '0';
    const quantityName = quantityOption ? quantityOption.textContent.split(' (')[0] : 'غير محدد';

    if (!userId || price === '0') {
        alert("الرجاء إدخال إيدي المستخدم واختيار الكمية.");
        return;
    }

    // هنا يمكنك إضافة كود إرسال بيانات الشراء إلى خادمك أو نظام الدفع.
    const message = `
        تم طلب الشحن بنجاح!
        التطبيق: ${currentApp.name}
        إيدي المستخدم: ${userId}
        الكمية: ${quantityName}
        السعر الإجمالي: ${price}$
    `;

    alert(message); // لعرض رسالة تأكيد بسيطة
    modal.style.display = 'none'; // إغلاق النافذة بعد الطلب
}
