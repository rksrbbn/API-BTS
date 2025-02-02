const express = require('express')
const router = express.Router()
const photoController = require('../controllers/photoController')
const photoValidator = require('../validator/photo/photo.validation')

// photo routers
router.get('/gambar/kelas', photoController.getAll) // get all photo class
router.get("/kelas/gambar/:kelas_id", photoController.getBykelasId); // get photo class by kelas id
router.get("/gambar/kelas/:gambar_id", photoController.getById); // get photo class by id

router.get("/gambar/jurusan/:jurusan_id", photoController.getJurusanPhoto) // get photo jurusan by jurusan id
router.get("/jumlah/gambar", photoController.getJumlah) // get jumlah photo
router.get("/jumlah/gambar/:kelas_id", photoController.totalClassPhoto) // get jumlah photo
router.post("/gambar/kelas/tambah", photoValidator.create, photoController.create); // create photo class
router.post('/gambar/kelas/upload', photoValidator.create, photoController.upload) // upload photo class
router.put('/gambar/kelas/ubah/:gambar_id', photoController.update) // update photo class by id
router.delete('/gambar/kelas/hapus/:gambar_id', photoController.delete) // delete photo class by id

router.post('/gambar/download/:gambar_id', photoController.download) // download image
module.exports = router