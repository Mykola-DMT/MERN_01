const {Router} = require('express')
const Film = require('../models/Film')
const auth = require('../middleware/auth.middleware')
const router = Router()

const filmController = require('../controllers/FilmController')

// router.post('/add', auth, async (req,res) => {
//     try{
//         const {name, genre, year, isWatched } = req.body
//
//         const existing = await Film.findOne({name})
//
//         if(existing){
//             return res.json({message:'Already existed!'})
//         }
//
//         const film = new Film({
//             name, genre, year, isWatched, owner: req.user.userId
//         })
//
//         await film.save()
//         res.status(201).json({message:'Successfully added!',film})
//
//     }catch (e){
//         res.status(500).json({message:'Something wrong, try again!'})
//     }
// })

router.post('/add', auth, filmController.addFilm)

// router.get('/',auth, async (req,res) => {
//     try{
//         const films = await Film.find({ owner: req.user.userId })
//         res.json(films)
//     }catch (e){
//         res.status(500).json({message:'Something wrong, try again!'})
//     }
// })

router.get('/', auth, filmController.getFilms)

// router.get('/:id', auth, async (req,res) => {
//     try{
//         const film = await Film.findById(req.params.id)
//         res.json(film)
//     }catch (e){
//         res.status(500).json({message:'Something wrong, try again!'})
//     }
// })

router.get('/:id', auth, filmController.getFilm)


// router.delete('/:id/delete', auth, async (req,res) => {
//     try{
//         await Film.deleteOne({_id: req.params.id}, function(err, obj) {
//             if (err) throw err;
//             console.log("1 film deleted");
//         })    }catch (e) {
//         res.json({message:'Problems with id'})
//     }
//
//     res.status(201).json({message:'Successfully deleted!'})
// })

router.delete('/:id/delete', auth, filmController.deleteFilm)

// router.put('/:id/edit', auth, async (req,res) => {
//     try{
//         const film = await Film.findById(req.params.id)
//         const {name, genre, year, isWatched } = req.body
//
//         if(!film){
//             res.status(404).json({message:'Not found!'})
//         }
//
//         await film.updateOne({$set: {name, genre, year, isWatched}})
//
//         res.status(201).json({message:'Successfully edited!'})
//     }catch (e) {
//         res.status(500).json({message:'Something wrong, try again!'})
//     }
// })

router.put('/:id/edit', auth, filmController.editFilm)

// patch request '/api/film/:id/edit'

router.patch('/:id/edit', auth, filmController.updateFilm)

module.exports = router
