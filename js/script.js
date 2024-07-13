document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const esLink = document.getElementById('es-link');
    const enLink = document.getElementById('en-link');
    const ptLink = document.getElementById('pt-link');

    esLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('es');
        setActiveLink(event.target);
    });
    enLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('en');
        setActiveLink(event.target);
    });
    ptLink.addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('pt');
        setActiveLink(event.target);
    });

    function loadContent(lang) {
        fetch(`content/content-${lang}.html`)
            .then(response => response.text())
            .then(data => {
                content.innerHTML = data;
                attachLinks();
                attachToggleDetailsEvent();
            })
            .catch(error => console.error('Error loading content:', error));
    }

    function setActiveLink(activeLink) {
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
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
                button.textContent = details.classList.contains('active') ? 'Mostrar menos' : 'Mostrar más';
            });
        });
    }

    loadContent('es'); // Load Spanish content by default
});
