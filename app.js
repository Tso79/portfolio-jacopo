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
            title: "Campagna Social Media",
            description: "Strategia di comunicazione per brand emergente",
            image: "/images/project1.jpg",
            video: "/videos/project1.mp4",
            category: "Social Media"
        },
        {
            id: 2,
            title: "Brand Identity",
            description: "Sviluppo identità visiva completa",
            image: "/images/project2.jpg",
            video: "/videos/project2.mp4",
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