const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/users', (request, response) => {
    console.log();
    return response.json({message: "Hello inhosw users!"});
});

routes.get('/devs', DevController.index);
routes.get('/devs/:id', DevController.show);
routes.post('/devs', DevController.store);
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;