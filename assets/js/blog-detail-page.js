(function () {
    const posts = window.personalBlogPosts || [];
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('article');
    const index = Math.max(0, posts.findIndex(post => post.slug === slug));
    const post = posts[index] || posts[0];
    if (!post) return;

    document.title = `${post.title}｜WNA LYPING`;
    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    setText('articleCategory', post.category);
    setText('articleTitle', post.title);
    setText('articleLead', post.lead);
    setText('articleDate', post.date);
    setText('articleReadTime', post.readTime);

    const hero = document.getElementById('articleHeroImage');
    if (hero) {
        hero.src = post.image;
        hero.alt = post.imageAlt;
    }
    const body = document.getElementById('articleBody');
    if (body) body.innerHTML = post.content;

    const previous = posts[(index - 1 + posts.length) % posts.length];
    const next = posts[(index + 1) % posts.length];
    const nav = document.getElementById('articleNav');
    if (nav) {
        nav.innerHTML = `
            <a href="blog-detail.html?article=${previous.slug}"><span>上一篇</span><strong>${previous.title}</strong></a>
            <a class="next" href="blog-detail.html?article=${next.slug}"><span>下一篇</span><strong>${next.title}</strong></a>`;
    }

    const related = document.getElementById('relatedArticles');
    if (related) {
        related.innerHTML = [next, posts[(index + 2) % posts.length]].map(item => `
            <a class="related-card" href="blog-detail.html?article=${item.slug}">
                <img src="${item.image}" alt="${item.imageAlt}">
                <span>${item.category}</span>
                <strong>${item.title}</strong>
            </a>`).join('');
    }
})();
