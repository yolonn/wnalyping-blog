(() => {
  document.documentElement.classList.add("js-ready");

  const loader = document.querySelector(".page-loader");
  const navbar = document.querySelector("#navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const mainMenu = document.querySelector("#main-menu");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const backToTop = document.querySelector("#back-to-top");
  const modal = document.querySelector("#content-modal");
  const modalKicker = document.querySelector("#modal-kicker");
  const modalTitle = document.querySelector("#modal-title");
  const modalBody = document.querySelector("#modal-body");
  const toast = document.querySelector("#toast");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const hideLoader = () => window.setTimeout(() => loader?.classList.add("loaded"), 220);
  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 1800);

  const closeMenu = () => {
    menuToggle?.classList.remove("open");
    mainMenu?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "打开导航");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const willOpen = !mainMenu?.classList.contains("open");
    menuToggle.classList.toggle("open", willOpen);
    mainMenu?.classList.toggle("open", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "关闭导航" : "打开导航");
    document.body.classList.toggle("menu-open", willOpen);
  });

  const goTo = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;
    closeMenu();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const selector = link.getAttribute("href");
      if (!selector || selector === "#") return;
      event.preventDefault();
      goTo(selector);
    });
  });

  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => goTo(button.dataset.scroll));
  });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const updateScroll = () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
    backToTop?.classList.toggle("show", window.scrollY > 650);
    let activeId = sections[0]?.id;
    sections.forEach((section) => {
      if (window.scrollY + window.innerHeight * 0.36 >= section.offsetTop) activeId = section.id;
    });
    navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`));
  };
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

  const revealItems = [...document.querySelectorAll(".reveal")];
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const galleryItems = [...document.querySelectorAll(".gallery-item")];
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      galleryItems.forEach((item) => {
        const show = filter === "all" || item.dataset.category === filter;
        item.hidden = !show;
      });
    });
  });

  const content = {
    "work-website": {
      kicker: "SELECTED WORK · PERSONAL WEB",
      title: "WNA LYPING 个人网站",
      body: "<p>一个真正属于自己的互联网空间。从域名、结构到视觉语言，所有内容都围绕长期表达而设计。</p><h3>设计目标</h3><p>不是制作一张华丽但静止的名片，而是建立一个能持续容纳文章、项目与生活记录的系统。</p><p><strong>状态：</strong>正在持续生长。</p>"
    },
    "work-ai": {
      kicker: "EXPERIMENT · AI SYSTEM",
      title: "可复用的 AI 工作流",
      body: "<p>围绕研究、写作与工程实践，把 AI 从一次性问答变成有上下文、有检查点的协作流程。</p><h3>核心原则</h3><p>先定义问题，再分配任务；保留人的判断，也让机器承担重复劳动。</p>"
    },
    "work-notes": {
      kicker: "FIELD NOTES · KNOWLEDGE",
      title: "让复杂问题逐渐清晰",
      body: "<p>收集并不等于理解。这个笔记实验尝试把碎片信息转化成问题、观点与可以继续验证的路径。</p><p>写下来，是为了让思考变得可见。</p>"
    },
    "work-design": {
      kicker: "WEB DESIGN · FORM & VOICE",
      title: "找到页面自己的声音",
      body: "<p>设计不只是颜色和排版。好的页面应该让内容有节奏，让访问者能感受到背后那个人的判断与气质。</p><h3>方法</h3><p>从内容层级出发，用留白、字体、运动与少量鲜明色彩建立识别度。</p>"
    },
    "work-lab": {
      kicker: "OPEN LAB · EXPERIMENT",
      title: "尝试、失败，再迭代",
      body: "<p>这里收纳尚未成熟的工具、小程序和设计原型。它们不一定都会成为产品，但每一次尝试都留下新的能力。</p><p><strong>进行中：</strong>把更多实验整理成可访问的公开项目。</p>"
    },
    "work-life": {
      kicker: "DAILY LOG · LIFE",
      title: "慢一点，也是一种方向",
      body: "<p>技术之外，还有阅读、散步、影像和普通的一天。生活记录帮助我确认：创造不只发生在电脑前。</p><p>有些内容不需要证明价值，只需要被诚实地留下。</p>"
    },
    "article-space": {
      kicker: "JOURNAL · THINKING · 8 MIN",
      title: "为什么每个人都应该拥有自己的互联网角落",
      body: "<p>网站不只是名片。它更像一个长期容器，让零散的想法、作品和生活经验慢慢长出自己的形状。</p><h3>一个不必迎合算法的地方</h3><p>社交平台鼓励快速表达，简历要求压缩自己，而个人网站允许你慢一点。它可以保留过程、犹豫，以及还没有完成的东西。</p><h3>从一页开始</h3><p>不必先想清楚全部栏目。先放上一段文字、一件作品，或者一个正在做的实验。重要的不是一次完成，而是拥有一个可以不断回来的地方。</p><p><strong>拥有自己的空间，也是在练习如何定义自己。</strong></p>"
    },
    "article-ai": {
      kicker: "JOURNAL · AI · 12 MIN",
      title: "我如何把 AI 放进每天的工作流",
      body: "<p>我不把 AI 当成一个替我完成所有事情的按钮，而更愿意把它看作一个随时可以讨论的协作者。</p><h3>先从问题开始</h3><p>有效的工作流不是收集更多工具，而是把模糊的问题写出来，再决定哪些部分值得交给机器协助。</p><h3>留下判断</h3><p>AI 可以整理、比较和生成选项，但最后的取舍仍应回到人的经验、偏好与责任上。</p>"
    },
    "article-design": {
      kicker: "JOURNAL · DESIGN · 6 MIN",
      title: "好的个人网站，应该留下什么",
      body: "<p>我越来越喜欢那些不急着证明自己的个人网站。它们不把所有经历都做成奖杯，而是留下正在发生的事情。</p><h3>少一点包装</h3><p>真实的更新、还在进行的项目、偶尔改变的想法，都是比口号更有力量的内容。</p><h3>让人看见你的节奏</h3><p>一个好网站不一定信息很多，但应该让人感受到：这里确实有人在生活、工作和思考。</p>"
    }
  };

  const openModal = (key) => {
    const item = content[key];
    if (!item || !modal) return;
    modalKicker.textContent = item.kicker;
    modalTitle.textContent = item.title;
    modalBody.innerHTML = item.body;
    if (typeof modal.showModal === "function") modal.showModal();
    else modal.setAttribute("open", "");
  };

  document.querySelectorAll("[data-work], [data-article]").forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger.dataset.work || trigger.dataset.article));
  });

  document.querySelector(".modal-close")?.addEventListener("click", () => modal?.close());
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
  };

  document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "来自个人网站的新留言").trim();
    const message = String(data.get("message") || "").trim();
    const body = `你好，我是 ${name}。\n\n${message}\n\n回复邮箱：${email}`;
    showToast("正在打开邮件客户端……");
    window.location.href = `mailto:hello@wnalyping.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
