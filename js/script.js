document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const esLink = document.getElementById('es-link');
    const enLink = document.getElementById('en-link');
    const ptLink = document.getElementById('pt-link');
    const timelineAnimation = document.getElementById('timeline-animation');
    const timelineYear = document.getElementById('timeline-year');
    const timelineRole = document.getElementById('timeline-role');
    const yearMenu = document.getElementById('year-menu');

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

    yearMenu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const year = event.target.getAttribute('data-year');
            showExperienceForYear(year);
            setActiveYearLink(event.target);
        }
    });

    function loadContent(lang) {
        fetch(`content/content-${lang}.html`)
            .then(response => response.text())
            .then(data => {
                content.querySelector('.timeline').innerHTML = data;
                attachLinks();
                attachToggleDetailsEvent();
                window.addEventListener('scroll', updateTimelineAnimation);
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
        const links = {
            gwinn: "https://gwinn.com.ar/",
            israelToWorld: "https://www.israeltotheworld.org/",
            digitalAsado: "https://digitalasado.com/",
            nelo: "https://nellomarket.com.ar/",
            lubricacion: "https://lubricacionsaic.net/",
            romboidal: "https://www.instagram.com/romboidalok/",
            siglo21: "https://21.edu.ar/",
            marketingStrategies: "https://www.linkedin.com/learning/marketing-strategies-in-linkedin",
            linkedinFundamentals: "https://www.linkedin.com/learning/linkedin-marketing-fundamentals",
            efSet: "https://www.efset.org/cert/SL2gyW",
            intermediateSQL: "https://www.datacamp.com/statement-of-accomplishment/course/814e9a757e00f9d5ab209090acfa98313b498f69",
            intermediatePython: "https://www.datacamp.com/statement-of-accomplishment/course/aff02223d15bdc4167aa1dc26109dd88d17ec2cc",
            introDataScience: "https://www.datacamp.com/statement-of-accomplishment/course/9cb4975a022c56113dc93d39115e616febdebe6a",
            pythonIBM: "https://courses.cognitiveclass.ai/certificates/5b2fc0f5084f466db521c4daab0a33da",
            argentinaPrograma: "https://mumuki.io/argentina-programa/certificates/verify/ccvYTLGkzw1Yoci3",
            masterExcel: "https://udemy-certificate.s3.amazonaws.com/image/UC-4bea49ec-044f-4f17-99a3-b6e8ce5ce039.jpg?v=1584575565000",
            tangoGestion: "https://www.cio.com.ar/certifications/verify/xyz"
        };

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

    function updateTimelineAnimation() {
        const sections = document.querySelectorAll('.timeline ul li');
        let currentSection = sections[0];
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                currentSection = section;
            }
        });

        const year = currentSection.getAttribute('data-year');
        const role = currentSection.querySelector('a').textContent;

        timelineYear.textContent = year;
        timelineRole.textContent = role;
    }

    function showExperienceForYear(year) {
        const sections = document.querySelectorAll('.timeline ul li');
        sections.forEach(section => {
            if (section.getAttribute('data-year') === year) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        updateTimelineAnimation();
    }

    function setActiveYearLink(activeLink) {
        document.querySelectorAll('.year-menu ul li a').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    loadContent('es'); // Load Spanish content by default
});
