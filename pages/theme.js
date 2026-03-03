document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle logic
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle';
    toggleBtn.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    Object.assign(toggleBtn.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'var(--bg-toggle, #fff)',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: '1000',
        fontSize: '20px',
        transition: 'all 0.3s ease'
    });

    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        toggleBtn.innerHTML = isDark ? '☀️' : '🌙';
    });

    // --- Search functionality ---
    const h1 = document.querySelector('h1');
    if (h1) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-wrapper';
        searchContainer.innerHTML = `
            <div class="search-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="commandSearch" placeholder="Pesquisar comando ou descrição...">
            </div>
        `;
        h1.after(searchContainer);

        const searchInput = document.getElementById('commandSearch');
        const tables = document.querySelectorAll('table');
        const headings = document.querySelectorAll('h2');

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();

            tables.forEach((table, index) => {
                const rows = table.querySelectorAll('tbody tr');
                let hasVisibleRow = false;

                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    if (text.includes(term)) {
                        row.style.display = '';
                        hasVisibleRow = true;
                    } else {
                        row.style.display = 'none';
                    }
                });

                // Hide table if empty
                table.style.display = hasVisibleRow ? '' : 'none';
                
                // Hide corresponding h2
                if (headings[index]) {
                    headings[index].style.display = hasVisibleRow ? '' : 'none';
                }
            });
        });
    }
});
