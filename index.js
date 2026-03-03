document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchBar = document.getElementById('searchBar');
    const cardsGrid = document.getElementById('cardsGrid');
    const cards = document.querySelectorAll('.card');

    if (searchBar) {
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('.card-desc').textContent.toLowerCase();
                const tag = card.querySelector('.card-tag').textContent.toLowerCase();

                if (title.includes(searchTerm) || desc.includes(searchTerm) || tag.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Newsletter Email Suggestions Adaptation
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        const suggestions = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];

        const suggestionBox = document.createElement('div');
        Object.assign(suggestionBox.style, {
            position: 'absolute',
            background: '#1e293b',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            display: 'none',
            zIndex: '1000',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)',
            color: '#f8fafc',
            marginTop: '5px'
        });
        document.body.appendChild(suggestionBox);

        emailInput.addEventListener('input', () => {
            const value = emailInput.value;
            const atIndex = value.indexOf('@');
            if (atIndex > -1) {
                const typedDomain = value.slice(atIndex + 1);
                const filtered = suggestions.filter(domain => domain.startsWith(typedDomain));

                if (filtered.length > 0) {
                    suggestionBox.innerHTML = '';
                    filtered.forEach(domain => {
                        const item = document.createElement('div');
                        item.textContent = value.slice(0, atIndex + 1) + domain;
                        Object.assign(item.style, {
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'background 0.2s'
                        });

                        item.addEventListener('mouseover', () => item.style.background = '#334155');
                        item.addEventListener('mouseout', () => item.style.background = 'transparent');

                        item.addEventListener('mousedown', () => {
                            emailInput.value = value.slice(0, atIndex + 1) + domain;
                            suggestionBox.style.display = 'none';
                            emailInput.focus();
                        });
                        suggestionBox.appendChild(item);
                    });

                    const rect = emailInput.getBoundingClientRect();
                    suggestionBox.style.left = rect.left + window.scrollX + 'px';
                    suggestionBox.style.top = rect.bottom + window.scrollY + 'px';
                    suggestionBox.style.width = rect.width + 'px';
                    suggestionBox.style.display = 'block';
                } else {
                    suggestionBox.style.display = 'none';
                }
            } else {
                suggestionBox.style.display = 'none';
            }
        });

        emailInput.addEventListener('blur', () => {
            setTimeout(() => suggestionBox.style.display = 'none', 150);
        });
    }

    // Simple Form Submission Feedback
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Inscrito! 🎉';
            btn.style.background = '#10b981';
            emailInput.value = '';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 3000);
        });
    }
});