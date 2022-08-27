let express = require('express');
let mustache = require('mustache-express');

let app = express();
app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', './views');

let movies = require('./movies');
movies.load('movies.json');

app.get('/movie-details/:id', (req, res) => {
res.render('movie-details', movies.read(req.params.id));
});

//Page principale qui affiche la liste des film
app.get('/', (req, res) =>{
    res.render('movie-list.html', {movies : movies.list()});
});


//Direction version le formulaire de modification modifier
app.get('/edit_movie_form/:id', (req, res) =>{
    res.render('edit_movie_form.html', movies.read(req.params.id))
});

//modifier les information d'un film
app.get('/edit-movie/:id', (req, res) =>{
    movies.update(req.query.id,req.query.title, req.query.year, req.query.actors, req.query.plot, req.query.poster);
    movies.save('./movies.json');
    res.redirect('/')
})

//direction vers le formulaire d'ajout
app.get('/add_movie_form', (req, res) =>{
    res.render('add_movie_form')
})

//Ajouter un film
app.get('/add-movie', (req, res) =>{
    movies.create(req.query.title, req.query.year,req.query.actors, req.query.plot, req.query.poster);
    movies.save('./movies.json');
    res.redirect('/');
})

//Direction vers le formulaire de supprésiion
app.get('/delete_movie_form/:id', (req, res) =>{
    res.render('delete_movie_form', movies.read(req.params.id));
})

//supprimer un film
app.get('/delete-movie/:id', (req, res) => {
    movies.delete(req.params.id);
    movies.save('./movies.json');
    res.redirect('/');
    });

app.listen(1900, () => console.log('movie server at http://localhost:1900'));