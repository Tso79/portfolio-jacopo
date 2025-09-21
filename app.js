const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurazione EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware per file statici
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/portfolio', (req, res) => {
    res.render('portfolio', { data: portfolioData });
});

app.get('/project/:id', (req, res) => {
    const project = portfolioData.projects.find(p => p.id == req.params.id);
    if (!project) {
        return res.status(404).render('404');
    }
    res.render('project', { project, data: portfolioData });
});

app.get('/contact', (req, res) => {
    res.render('contact', { data: portfolioData });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
});