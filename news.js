// Load news from JSON
fetch('news.json')
  .then(res => res.json())
  .then(data => {
    const newsGrid = document.getElementById('news-grid');
    data.sort((a,b) => new Date(b.date) - new Date(a.date));

    data.forEach(news => {
      const div = document.createElement('div');
      div.className = 'news-card';

      div.innerHTML = `
        <div class="scroll-arrow">
          <i class="fas fa-arrow-down"></i>
        </div>

        <div class="news-top">
          <img src="${news.image}" alt="${news.title}">
          <div class="news-header">
            <span class="news-date">${new Date(news.date).toLocaleDateString()}</span>
            <h4>${news.title}</h4>
          </div>
        </div>

        <p class="news-excerpt">${news.excerpt}</p>
        <div class="news-content"></div>
      `;

      const arrow = div.querySelector('.scroll-arrow');
      const contentDiv = div.querySelector('.news-content');

      const expandCard = () => {
        if (div.classList.contains('expanded')) return;

        div.classList.add('expanded');
        arrow.style.display = 'none';

        contentDiv.innerHTML = '';
        const words = news.full_content.split(' ');
        words.forEach((word, i) => {
          const span = document.createElement('span');
          span.className = 'word';
          span.style.animationDelay = `${i * 0.04}s`;
          span.innerHTML = word + '&nbsp;';
          contentDiv.appendChild(span);
        });
      };

      const collapseCard = () => {
        div.classList.remove('expanded');
        arrow.style.display = 'block';
        contentDiv.innerHTML = '';
      };

      // ONE unified interaction handler
      div.addEventListener('click', (e) => {
        e.stopPropagation();

        if (div.classList.contains('expanded')) {
          collapseCard();
        } else {
          expandCard();
        }
      });

      // Desktop hover support (optional but safe)
      div.addEventListener('mouseenter', expandCard);
      div.addEventListener('mouseleave', collapseCard);

      newsGrid.appendChild(div);
    });
  });
