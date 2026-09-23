
// Loading Screen
// Do not wait for every external font or icon request to finish. Some networks
// can leave those requests pending and otherwise keep the page covered forever.
function hidePageLoader() {
    const loader = document.getElementById('loader');
    if (!loader || loader.classList.contains('hidden')) return;

    loader.classList.add('hidden');
    window.setTimeout(function () {
        loader.remove();
    }, 600);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        window.setTimeout(hidePageLoader, 250);
    }, { once: true });
} else {
    window.setTimeout(hidePageLoader, 250);
}

// Final JavaScript failsafe, independent of the document load event.
window.setTimeout(hidePageLoader, 3000);

// Initialize AOS only when the optional library is available.
if (window.AOS && typeof window.AOS.init === 'function') {
    window.AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

if (slides) {

    function nextSlide() {
        if (!slides.length) return;

        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
}


// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active menu on scroll
    updateActiveMenu();
});

// Active Menu Management
function updateActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.querySelector('.navbar-collapse');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Close mobile menu if open
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
if (lightbox) {

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').getAttribute('src');
            lightboxImg.setAttribute('src', imgSrc);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}


// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});


// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// Initialize active menu on load
updateActiveMenu();

document.getElementById("subscribe").addEventListener("click", function () {
    const emailInput = document.getElementById("subscribe-email");
    const email = emailInput.value.trim();

    // Email regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        alert("Please enter your email address.");
        emailInput.focus();
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
    }

    // Success
    alert("Thank you for subscribing!");
    emailInput.value = "";
});

// Homepage article reader
const articleModal = document.getElementById('articleModal');
const articleModalTitle = document.getElementById('articleModalTitle');
const articleModalCategory = document.getElementById('articleModalCategory');
const articleModalMeta = document.getElementById('articleModalMeta');
const articleModalBody = document.getElementById('articleModalBody');

const articleContent = {
    'portrait-settings': {
        category: '技巧分享',
        meta: '2024 年 3 月 15 日 · 阅读 5 分钟',
        title: '人像摄影必学的 10 个相机设置',
        body: `
            <p>拍好人像不只靠一台好相机，更重要的是理解每一个设置如何影响画面。下面这些基础设置，能帮助你更稳定地拍出自然、有质感的人像作品。</p>
            <h3>1. 先从光圈开始</h3>
            <p>使用较大的光圈可以让人物从背景中突出出来。户外拍摄时可以尝试 f/1.8 到 f/2.8；如果多人合影，则适当收小光圈，保证每个人都清晰。</p>
            <h3>2. 保证快门速度</h3>
            <p>人物会自然移动，快门速度太慢容易造成模糊。手持拍摄时建议至少保持在 1/125 秒；拍摄运动中的人物时，可以提高到 1/500 秒左右。</p>
            <h3>3. 控制 ISO</h3>
            <p>光线充足时尽量使用较低的 ISO，画面会更加细腻。光线不足时，与其拍出模糊照片，不如适当提高 ISO，优先保证清晰度。</p>
            <h3>4. 让对焦落在眼睛上</h3>
            <p>眼睛是人像照片的视觉中心。开启人眼识别或单点对焦，并注意人物眼睛是否处于清晰范围内。</p>
            <p><strong>小练习：</strong>同一个人物分别使用三组不同的光圈和快门拍摄，回看照片时比较背景、动作与表情的变化。</p>
        `
    },
    'wedding-prep': {
        category: '婚礼摄影',
        meta: '2024 年 2 月 28 日 · 阅读 7 分钟',
        title: '如何准备一场完美的婚礼摄影',
        body: `
            <p>婚礼当天节奏很快，提前准备能让你更安心，也能让照片更自然、更完整。除了选择摄影师，还可以从时间、服装和重要环节三个方面做好准备。</p>
            <h3>提前确定拍摄时间线</h3>
            <p>预留化妆、换装、合影和转场时间，不要把所有环节安排得过于紧凑。给摄影师一份流程表，也方便我们提前判断光线和拍摄位置。</p>
            <h3>准备值得记录的细节</h3>
            <p>戒指、请柬、手捧花、婚纱和家人的小物件，都可以成为当天故事的一部分。把这些物品集中放在一起，摄影师就能在不打扰流程的情况下快速完成细节拍摄。</p>
            <h3>留出属于两个人的时间</h3>
            <p>仪式之外，建议安排 20 到 30 分钟的双人肖像时间。不需要复杂摆拍，只要一起散步、聊天，真实的情绪就会自然出现在照片里。</p>
            <p><strong>最重要的是：</strong>不要把婚礼过成一场拍摄任务。放松下来，享受当天发生的一切，照片会因此更有生命力。</p>
        `
    },
    'lightroom-editing': {
        category: '后期技巧',
        meta: '2024 年 2 月 10 日 · 阅读 8 分钟',
        title: '让照片更出彩的 Lightroom 后期技巧',
        body: `
            <p>好的后期不是把每一项参数都调到最大，而是让照片回到拍摄时想表达的情绪。一个稳定的流程，可以让你的作品更统一，也能节省大量时间。</p>
            <h3>先整理，再调整</h3>
            <p>导入照片后先完成筛选、分组和标记，再开始调色。把相似光线和场景放在一起，可以让一组照片拥有更一致的风格。</p>
            <h3>从白平衡与曝光开始</h3>
            <p>先处理整体明暗和色温，再进入高光、阴影与对比度。不要一开始就过度调整饱和度，准确的基础曝光比强烈的颜色更重要。</p>
            <h3>用局部调整突出主体</h3>
            <p>通过蒙版、画笔或渐变工具，轻轻提亮人物脸部，压低干扰视线的背景。局部调整应该服务于主体，而不是让观众先看到后期效果。</p>
            <h3>导出前统一检查</h3>
            <p>最后检查肤色、地平线、裁切比例和文件命名。为社交平台和打印分别导出合适尺寸，保留一份高质量原图作为存档。</p>
        `
    }
};

function closeArticleModal() {
    if (!articleModal) return;
    articleModal.classList.remove('is-open');
    articleModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('article-modal-open');
}

function openArticleModal(articleId) {
    const article = articleContent[articleId];
    if (!article || !articleModal) return;

    articleModalCategory.textContent = article.category;
    articleModalMeta.textContent = article.meta;
    articleModalTitle.textContent = article.title;
    articleModalBody.innerHTML = article.body;
    articleModal.classList.add('is-open');
    articleModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('article-modal-open');
}

document.querySelectorAll('[data-article]').forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
        event.preventDefault();
        openArticleModal(trigger.dataset.article);
    });
});

document.querySelector('[data-modal-close]')?.addEventListener('click', closeArticleModal);
articleModal?.addEventListener('click', function (event) {
    if (event.target === articleModal) closeArticleModal();
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeArticleModal();
});
