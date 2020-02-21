const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
    
        const { git_username, techs, latitude, longitude } = request.body;
        console.log(git_username, techs, latitude, longitude);
        
        let dev = await Dev.findOne({git_username});

        if (!dev){
            const git_ret = await axios.get(`https://api.github.com/users/${git_username}`);
            let {name, avatar_url, bio} = git_ret.data;
            if (!name) name = git_ret.data.login;
            if (!bio) bio = 'Empty!';
        
            const techsArray = parseStringAsArray(techs);
            const location =  {
                type: 'Point',
                coordinates: [longitude, latitude ],
            };
            
            dev = await Dev.create({
                name,
                git_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            });
        }
            
        return response.json(dev);
        
    },

    async show(request, response) {
        const dev = await Dev.find({git_username: request.params.id});
        let ret = {message: 'Dev not found!'};
        if (dev && dev.length > 0){
            ret = dev;
        }

        return response.json(ret);
    },
    
    async update(request, response) {
        
        const dev = await Dev.find({git_username: request.params.id});
        let ret = {};
        if (dev && dev.length > 0){
            
            const {_id} = dev[0];
            const { bio, avatar_url, techs, latitude, longitude } = request.body;
            const techsArray = parseStringAsArray(techs);
            
            const location =  {
                type: 'Point',
                coordinates: [longitude, latitude ],
            };
            
            
            ret = await Dev.updateOne({_id},
                                   { bio, 
                                     avatar_url,
                                     techs: techsArray,
                                     location
                                    });
        }
        return response.json(ret);
    },
    
    async destroy(request, response) {
        const dev = await Dev.find({git_username: request.params.id});
        let ret = {};
        if (dev && dev.length > 0){
            const {_id} = dev[0];
            await Dev.deleteOne({_id}, {useFindAndModify: false});
            ret = {message: 'Removed dev!'};
        }
        return response.json(ret);
    },
};