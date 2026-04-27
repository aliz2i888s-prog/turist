document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const optionsList = document.getElementById('optionsList');
    const priceTag = document.getElementById('priceTag');
    const closeBtn = document.querySelector('.modal__close');

    const data = {
        expeditions: {
            title: "Выберите экспедицию",
            items: [
                { name: "🏔️ Восхождение на Эльбрус", price: "85 000 ₽" },
                { name: "🌋 Гейзеры Камчатки", price: "125 000 ₽" },
                { name: "🛶 Сплав по Карелии", price: "45 000 ₽" }
            ]
        },
        hotels: {
            title: "Premium Отели",
            items: [
                { name: "🏨 Burj Al Arab (Дубай)", price: "150 000 ₽/сут" },
                { name: "🏝️ Ritz-Carlton (Мальдивы)", price: "95 000 ₽/сут" },
                { name: "🏰 Palace Hotel (Швейцария)", price: "70 000 ₽/сут" }
            ]
        },
        guides: {
            title: "Авторские гиды",
            items: [
                { name: "👨‍🎨 Искусство Рима (Марко)", price: "15 000 ₽" },
                { name: "👩‍🍳 Гастро-Париж (Софи)", price: "12 000 ₽" },
                { name: "🕵️ Тайны Лондона (Джеймс)", price: "10 000 ₽" }
            ]
        }
    };

    document.querySelectorAll('.btn--select').forEach(btn => {
        btn.onclick = () => {
            const type = btn.dataset.type;
            const content = data[type];
            modalTitle.innerText = content.title;
            optionsList.innerHTML = '';
            priceTag.innerText = '';

            content.items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'modal__option';
                div.innerText = item.name;
                div.onclick = () => {
                    document.querySelectorAll('.modal__option').forEach(el => el.style.borderColor = '#ddd');
                    div.style.borderColor = '#ffc300';
                    priceTag.innerText = `Стоимость: ${item.price}`;
                };
                optionsList.appendChild(div);
            });
            modal.style.display = 'block';
        };
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };
});
