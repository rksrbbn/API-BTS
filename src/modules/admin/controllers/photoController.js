const Photo = require("../models/photo");

module.exports = {
  // get all photo class
  getAll: (req, res) => {
    Photo.getAll(req.con, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Failed to get All Photo Class",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Success to get All Photo Class",
          data: result,
        });
      }
    });
  },

  // get all photo class by kelas id
  getBykelasId: (req, res) => {
    Photo.getBykelasId(req.con, req.params.kelas_id, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Failed to get image by kelas id",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Success to get image by kelas id",
          error: false,
          data: result,
        });
      }
    });
  },

  getJumlah: (req, res) => {
    Photo.getJumlahWajib(req.con, (err, wajib) => {
      if (err) {
        res.status(500).json({
          message: "Failed to get jumlah",
          error: err,
        });
      } else {
        Photo.getJumlahBebas(req.con, (err, bebas) => {
          if (err) {
            res.status(500).json({
              message: "Failed to get jumlah",
              error: err,
            });
          } else {
            Photo.getJumlah(req.con, (err, result) => {
              if (err) {
                res.status(500).json({
                  message: "Failed to get jumlah",
                  error: err,
                });
              } else {
                res.status(200).json({
                  message: "Success to get jumlah",
                  error: false,
                  wajib: wajib[0].jumlah_wajib,
                  bebas: bebas[0].jumlah_bebas,
                  total: result[0].jumlah,
                });
              }
            });
          }
        });
      }
    });
  },

  getJurusanPhoto: (req, res) => {
    Photo.getJurusanPhoto(req.con, req.params.jurusan_id, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Failed to get image by jurusan_id",
          error: err,
        });
      } else if (result.length < 1) {
        res.status(404).json({
          message: "Empty Result",
          error: true,
        });
      } else {
        res.status(200).json({
          message: "Success to get image by jurusan_id",
          jurusan: result[0].jurusan_nama,
          error: false,
          data: result,
        });
      }
    });
  },

  totalClassPhoto: (req, res) => {
    Photo.getJumlahWajibKelas(req.con, req.params.kelas_id, (err, wajib) => {
      if (err) {
        res.status(500).json({
          message: "Failed to get image by id",
          error: err,
        });
      } else {
        Photo.getJumlahBebasKelas(
          req.con,
          req.params.kelas_id,
          (err, bebas) => {
            if (err) {
              res.status(500).json({
                message: "Failed to get image by id",
                error: err,
              });
            } else {
              Photo.totalClassPhoto(
                req.con,
                req.params.kelas_id,
                (err, result) => {
                  if (err) {
                    res.status(500).json({
                      message: "Failed to get image by id",
                      error: err,
                    });
                  } else if (result.length < 1) {
                    res.status(404).json({
                      message: "data not found",
                      error: err,
                    });
                  } else {
                    res.status(200).json({
                      message: "success",
                      error: false,
                      wajib: wajib[0].jumlah_wajib_kelas,
                      bebas: bebas[0].jumlah_bebas_kelas,
                      total: result[0].jumlah_gambar_kelas,
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  },

  // get photo class by id
  getById: (req, res) => {
    Photo.getById(req.con, req.params.gambar_id, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Failed to get image by id",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Success to get image by id",
          error: false,
          data: result,
        });
      }
    });
  },

  // create photo class
  create: (req, res) => {
    Photo.create(req.con, req.body, req.files, req.res, (err) => {
      if (err) {
        res.status(500).json({
          message: "Failed to create photo class",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Success to create photo class",
          error: false,
        });
      }
    });
  },

  // update photo class
  update: (req, res) => {
    Photo.update(
      req.con,
      req.body,
      req.files,
      req.params.gambar_id,
      req.res,
      (err) => {
        if (err) {
          res.status(500).json({
            message: "Failed to update photo class",
            error: err,
          });
        } else {
          res.status(200).json({
            message: "Success to update photo class",
            error: false,
          });
        }
      }
    );
  },

  // delete photo class
  delete: (req, res) => {
    Photo.delete(req.con, req.params.gambar_id, req.res, (err) => {
      if (err) {
        res.status(500).json({
          message: "Failed to delete photo class",
          error: err,
        });
      } else {
        res.status(200).json({
          message: "Success to delete photo class",
          error: false,
        });
      }
    });
  },

  // upload photo class
  upload: (req, res) => {
    Photo.uploadValidation(
      req.con,
      res,
      req.files.filename,
      (filename, kelas) => {
        Photo.upload(req.con, res, filename, kelas);
      }
    );
  },

  //  download photo
  download: (req, res) => {
    Photo.download(req.con, req.params.gambar_id, req.res, (filename) => {
        const file = 'public/images/'+filename
        res.download(file);
        // res.status(200).json({
        //   message: "Success to download photo class",
        //   filename: filename,
        //   error: false,
        // });
    })
  }
};
