const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware per file statici
app.use(express.static(path.join(__dirname, 'public')));

// Middleware per parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dati del portfolio (per ora mock, poi si può spostare in JSON)
const portfolioData = {
    name: "Jacopo",
    title: "Marketing & Comunicazione Specialist",
    description: "Esperto in strategie di marketing digitale e comunicazione integrata",
    skills: ["Social Media Marketing", "Content Creation", "Brand Strategy", "Digital Analytics"],
    projects: [
        {
            id: 1,
            title: "DJ Music Producer",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
            image: "/images/portfolio/illustrazione-di-dj-di-cartoni-animati-3d.jpg",
            category: "Musical"
        },
        {
            id: 2,
            title: "Party DJ Controller",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud.",
            image: "/images/portfolio/personaggio-di-cartone-animato-3d-che-fa-il-dj-alla-festa.jpg",
            category: "Musical"
        },
        {
            id: 3,
            title: "Urban Style Project",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
            image: "/images/portfolio/cane-stile-futuristico-natura.jpg",
            category: "Musical"
        },
        {
            id: 4,
            title: "Wild Character Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non.",
            image: "/images/portfolio/personaggio-dei-cartoni-animati-di-opossum-selvatico.jpg",
            category: "Musical"
        },
        {
            id: 5,
            title: "Fashion Style Project",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste.",
            image: "/images/portfolio/veduta-di-un-cane-con-un-abito-divertente.jpg",
            category: "Musical"
        },
        {
            id: 6,
            title: "Urban Lion Design",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam voluptatem quia.",
            image: "/images/portfolio/leone-carino-citta.jpg",
            category: "Branding"
        }
    ]
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { data: portfolioData });
});

// API endpoint for form submission
app.post('/api/contact', (req, res) => {
    // TODO: Handle contact form submission
    console.log('Contact form submission:', req.body);
    res.json({ success: true, message: 'Messaggio ricevuto con successo!' });
});

// API endpoint for project details (for future modal implementation)
app.get('/api/project/:id', (req, res) => {
    const project = portfolioData.projects.find(p => p.id == req.params.id);
    if (!project) {
        return res.status(404).json({ error: 'Progetto non trovato' });
    }
    res.json({ project });
});

// Catch all route - redirect to home for SPA
app.get('*', (req, res) => {
    res.redirect('/');
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});