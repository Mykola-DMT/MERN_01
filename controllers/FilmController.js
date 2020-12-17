const Film = require('../models/Film')

exports.addFilm = async function (req, res){
    try{
        const {name, genre, year, isWatched } = req.body

        const existing = await Film.findOne({name})

        if(existing){
            return res.json({message:'Already existed!'})
        }

        const film = new Film({
            name, genre, year, isWatched, owner: req.user.userId
        })

        await film.save()
        res.status(201).json({message:'Successfully added!',film})

    }catch (e){
        res.status(500).json({message:'Something wrong, try again!'})
    }
}

exports.getFilms = async function(req, res){
    try{
        const films = await Film.find({ owner: req.user.userId }).sort({isWatched: 1})
        res.json(films)
    }catch (e){
        res.status(500).json({message:'Something wrong, try again!'})
    }
}

exports.updateFilm = async function(req, res){
    try{
        await Film.findByIdAndUpdate(req.params.id, req.body)
        const film = await Film.findById(req.params.id)
            res.status(200).json(film)
    }catch (e) {
        res.status(500).json({message:'Something wrong, try again!'})
    }
}

exports.getFilm = async function(req, res) {
    try{
        const film = await Film.findById(req.params.id)
        res.json(film)
    }catch (e){
        res.status(500).json({message:'Something wrong, try again!'})
    }
}

exports.deleteFilm = async function(req, res){
    try{
        await Film.deleteOne({_id: req.params.id}, function(err, obj) {
            if (err) throw err;
            console.log("1 film deleted");
        })    }catch (e) {
        res.json({message:'Problems with id'})
    }

    res.status(201).json({message:'Successfully deleted!'})
}

exports.editFilm = async function(req, res){
    try{
        const film = await Film.findById(req.params.id)
        const {name, genre, year, isWatched } = req.body

        if(!film){
            res.status(404).json({message:'Not found!'})
        }

        await film.updateOne({$set: {name, genre, year, isWatched}})

        res.status(201).json({message:'Successfully edited!'})
    }catch (e) {
        res.status(500).json({message:'Something wrong, try again!'})
    }
}
