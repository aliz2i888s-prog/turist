document.addEventListener("DOMContentLoaded", () => {

    // ── CURSOR ──
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener("mousemove", e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + "px";
        cursor.style.top  = my + "px";
    });
    function animateFollower() {
        fx += (mx - fx) * 0.12;
        fy += (my - fy) * 0.12;
        follower.style.left = fx + "px";
        follower.style.top  = fy + "px";
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // ── LIGHTBOX ──
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    document.querySelectorAll(".card-img-wrap img").forEach(img => {
        img.addEventListener("click", () => {
            lightboxImg.src = img.src; lightboxImg.alt = img.alt;
            lightbox.classList.add("active");
        });
    });
    function closeLightbox() { lightbox.classList.remove("active"); }
    closeBtn.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

    // ── SERVICE MODAL ──
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");
    const modalBody = document.getElementById("modal-body");

    const serviceData = {
        expeditions: {
            title: "Экспедиции",
            desc: "Мы организуем экспедиции любой сложности — от семейных походов до профессиональных восхождений. Каждый маршрут разрабатывается индивидуально с учётом физической подготовки, предпочтений и бюджета участников.",
            details: "Сотрудничаем с более чем 40 местными операторами по всему миру. Все гиды имеют международные сертификаты UIAGM или ACMG. Предоставляем снаряжение топовых брендов (Salomon, Black Diamond, Arc'teryx).",
            includes: ["Разработка маршрута под группу", "Профессиональный сертифицированный гид", "Все необходимые разрешения и пермиты", "Аренда снаряжения и экипировки", "Трансфер и логистика", "Страховой полис для экстремальных видов"],
            price: "от 85 000 ₸ / человек"
        },
        guides: {
            title: "Профессиональные гиды",
            desc: "Наши гиды — не просто сопровождающие. Это специалисты с глубокими знаниями истории, культуры, языка и природы конкретного региона. Они открывают места, куда обычные туристы никогда не попадают.",
            details: "В нашей базе более 30 гидов на 12 языках. Минимальный опыт работы — 5 лет. Каждый гид регулярно проходит обучение и аттестацию.",
            includes: ["Гид на весь период поездки", "Авторский маршрут с закрытыми локациями", "Перевод и культурная медиация", "Гастрономические рекомендации от местных", "Экстренная связь 24/7", "Фотографирование по запросу"],
            price: "от 15 000 ₸ / день"
        },
        hotels: {
            title: "Подбор отелей",
            desc: "Мы берём на себя весь процесс поиска и бронирования жилья. Работаем с базой из более чем 10 000 отелей, лоджей, апартаментов и бутик-резиденций по всему миру. Гарантируем лучшую цену.",
            details: "У нас прямые контракты с ведущими сетями отелей — Marriott, Four Seasons, Aman, Six Senses. Если в день заезда нашли цену ниже — вернём разницу.",
            includes: ["Подбор отелей под ваш запрос и бюджет", "Гарантия лучшей цены", "Ранний заезд / поздний выезд по запросу", "Специальные условия для постоянных клиентов", "Координация трансфера аэропорт–отель", "Круглосуточная поддержка в поездке"],
            price: "Подбор бесплатно · оплата только за бронирование"
        }
    };

    document.querySelectorAll(".card-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const key = btn.dataset.service;
            const data = serviceData[key];
            if (!data) return;
            modalBody.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.desc}</p>
                <p>${data.details}</p>
                <ul>${data.includes.map(i => `<li>${i}</li>`).join("")}</ul>
                <p style="font-size:14px;font-weight:500;color:var(--ocean);margin-top:8px;">Стоимость: ${data.price}</p>
                <a href="#contacts" class="modal-cta" id="modal-cta-link">Оставить заявку →</a>
            `;
            modalOverlay.classList.add("active");
            document.getElementById("modal-cta-link").addEventListener("click", () => {
                modalOverlay.classList.remove("active");
            });
        });
    });

    function closeModal() { modalOverlay.classList.remove("active"); }
    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") { closeLightbox(); closeModal(); } });

    // ── STICKY HEADER ──
    const header = document.getElementById("header");
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 60);
    });

    // ── MOBILE NAV ──
    const burger = document.getElementById("burger");
    const mobileNav = document.getElementById("mobile-nav");
    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        mobileNav.classList.toggle("open");
    });
    document.querySelectorAll(".mob-link, .mob-cta").forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("open");
            mobileNav.classList.remove("open");
        });
    });

    // ── FAQ ACCORDION ──
    document.querySelectorAll(".faq-q").forEach(btn => {
        btn.addEventListener("click", () => {
            const item = btn.closest(".faq-item");
            const isOpen = item.classList.contains("open");
            document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
            if (!isOpen) item.classList.add("open");
        });
    });

    // ── CONTACT FORM ──
    const form = document.getElementById("contact-form");
    const formSuccess = document.getElementById("form-success");
    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = form.querySelector("#f-name").value.trim();
        const phone = form.querySelector("#f-phone").value.trim();
        if (!name || !phone) {
            [form.querySelector("#f-name"), form.querySelector("#f-phone")].forEach(inp => {
                if (!inp.value.trim()) {
                    inp.style.borderColor = "#e05555";
                    inp.addEventListener("input", () => inp.style.borderColor = "", { once: true });
                }
            });
            return;
        }
        // Simulate sending
        const submitBtn = form.querySelector(".form-submit");
        submitBtn.textContent = "Отправляем…";
        submitBtn.disabled = true;
        setTimeout(() => {
            form.style.display = "none";
            formSuccess.classList.add("active");
        }, 1200);
    });

    // ── SCROLL REVEAL ──
    const revealEls = document.querySelectorAll(
        ".about-grid, .section-title, .stat, .card, .contact-item, .services-header, .tour-card, .review-card, .faq-item, .feat-item, .hero-strip"
    );
    revealEls.forEach(el => el.classList.add("reveal"));
    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("visible"), i * 60);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealEls.forEach(el => observer.observe(el));

});
