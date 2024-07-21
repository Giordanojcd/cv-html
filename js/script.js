document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const currentLang = document.getElementById('current-lang');
    const languageOptions = document.getElementById('language-options');

    const links = {
        es: "content/content-es.html",
        en: "content/content-en.html",
        pt: "content/content-pt.html"
    };

    function loadContent(lang) {
        fetch(links[lang])
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
                attachLinks();
                attachToggleDetailsEvent();
            })
            .catch(error => console.error('Error loading content:', error));
    }

    function attachLinks() {
        document.querySelectorAll('[data-link]').forEach(element => {
            const linkKey = element.getAttribute('data-link');
            element.setAttribute('href', links[linkKey]);
        });
    }

    function attachToggleDetailsEvent() {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                const details = button.nextElementSibling;
                details.classList.toggle('active');
                button.textContent = details.classList.contains('active') ? '<' : '>';
            });
        });
    }

    languageOptions.addEventListener('click', (event) => {
        const lang = event.target.getAttribute('data-lang');
        if (lang) {
            currentLang.src = event.target.src;
            loadContent(lang);
        }
    });

    // Load Spanish content by default
    loadContent('es');
});
