(function () {
    const posts = window.personalBlogPosts || [];
    const featured = document.getElementById('featuredArticle');
    const grid = document.getElementById('articleGrid');
    const search = document.getElementById('blogSearch');
    const filters = document.querySelectorAll('[data-blog-filter]');
    const empty = document.getElementById('blogEmpty');
    let activeCategory = '全部';

    function articleUrl(slug) {
        return `blog-detail.html?article=${encodeURIComponent(slug)}`;
    }

    function renderFeatured(post) {
        if (!featured || !post) return;
        featured.innerHTML = `
            <a class="featured-entry-media" href="${articleUrl(post.slug)}">
                <img src="${post.image}" alt="${post.imageAlt}">
            </a>
            <div class="featured-entry-copy">
                <span class="editorial-label">本期文章 · ${post.category}</span>
                <p class="entry-meta">${post.date} · ${post.readTime}</p>
                <h2><a href="${articleUrl(post.slug)}">${post.title}</a></h2>
                <p>${post.summary}</p>
                <a class="editorial-link" href="${articleUrl(post.slug)}">阅读全文 <span>↗</span></a>
            </div>`;
    }

    function card(post, index) {
        const number = String(index + 1).padStart(2, '0');
        return `
            <article class="personal-post-card">
                <a class="post-card-image" href="${articleUrl(post.slug)}">
                    <img src="${post.image}" alt="${post.imageAlt}">
                    <span>${number}</span>
                </a>
                <div class="post-card-copy">
                    <div class="post-card-topline"><span>${post.category}</span><span>${post.readTime}</span></div>
                    <h3><a href="${articleUrl(post.slug)}">${post.title}</a></h3>
                    <p>${post.summary}</p>
                    <div class="post-card-footer"><time>${post.date}</time><a href="${articleUrl(post.slug)}" aria-label="阅读《${post.title}》">阅读 ↗</a></div>
                </div>
            </article>`;
    }

    function render() {
        const keyword = (search?.value || '').trim().toLowerCase();
        const filtered = posts.filter(post => {
            const matchesCategory = activeCategory === '全部' || post.category === activeCategory;
            const text = `${post.title} ${post.category} ${post.summary}`.toLowerCase();
            return matchesCategory && (!keyword || text.includes(keyword));
        });

        if (grid) grid.innerHTML = filtered.map(card).join('');
        if (empty) empty.hidden = filtered.length > 0;
        const count = document.getElementById('articleCount');
        if (count) count.textContent = `${filtered.length} 篇文章`;
    }

    renderFeatured(posts[0]);
    render();
    search?.addEventListener('input', render);
    filters.forEach(button => button.addEventListener('click', function () {
        filters.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.dataset.blogFilter;
        render();
    }));
})();
