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
});
