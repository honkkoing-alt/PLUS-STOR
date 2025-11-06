// 1. قائمة التطبيقات ومعلومات الشحن
const appsData = [
    { name: "كوكو لايف", id: "koko", img: "https://example.com/koko.png", prices: { "10000 كوينز": 10, "100000 كوينز": 5, "50000 كوينز": 1 } },
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

const container = document.querySelector('.app-list-container');
const modal = document.getElementById('purchaseModal');
const closeButton = document.querySelector('.close-button');
const quantityInput = document.getElementById('quantity');
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
    document.getElementById('quantity').value = ''; // مسح حقل الكمية

    // ربط حقل الكمية النصي بتحديث السعر فوراً عند الكتابة
    document.getElementById('quantity').oninput = updatePriceDisplay;
    
    // إعادة تعيين السعر الأولي
    priceDisplay.textContent = '0'; 
    modal.style.display = 'block';
}

// 4. تحديث عرض السعر بناءً على النص المدخل
function updatePriceDisplay() {
    const quantityText = document.getElementById('quantity').value.trim();
    let price = '0';
    
    // البحث عن الكمية المدخلة (يجب أن تتطابق تماماً مع مفاتيح الأسعار في appsData)
    if (currentApp && quantityText) {
        if (currentApp.prices.hasOwnProperty(quantityText)) {
            price = currentApp.prices[quantityText];
        } else {
             // إذا لم يحدث تطابق (مثل "1000" بدلاً من "1000 كوينز")، يبقى السعر صفر
        }
    }
    
    priceDisplay.textContent = price;
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

// 6. وظيفة إتمام الطلب
function completePurchase() {
    const userId = document.getElementById('userId').value;
    const quantityText = document.getElementById('quantity').value.trim(); // النص المدخل
    
    let price = '0';
    if (currentApp && currentApp.prices.hasOwnProperty(quantityText)) {
        price = currentApp.prices[quantityText];
    }

    if (!userId || price === '0' || !quantityText) {
        alert("الرجاء إدخال إيدي المستخدم والكمية بشكل صحيح لتحديد السعر. تأكد من كتابة الكمية مع الوحدة (مثال: 1000 كوينز).");
        return;
    }

    // هنا يمكنك إضافة كود إرسال بيانات الشراء
    const message = `
        تم طلب الشحن بنجاح!
        التطبيق: ${currentApp.name}
        إيدي المستخدم: ${userId}
        الكمية: ${quantityText}
        السعر الإجمالي: ${price}$
    `;

    alert(message); // لعرض رسالة تأكيد بسيطة
    modal.style.display = 'none'; // إغلاق النافذة بعد الطلب
}
