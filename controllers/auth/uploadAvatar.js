const Jimp = require('jimp');
const fs = require("fs/promises");
const {UserModel} = require("../../models/users");
const path = require("path");


const avatarDir = path.join (__dirname, "../../", "public", "avatars")

const uploadAvatar = async (req,res) => {
  try{
      const {_id} = req.user;
      const {path: tempPath, originalname} = req.file;

      const [fileExtention] = originalname.split(".").reverse()
      
      const filename = `${_id}.${fileExtention}`;
      const resultUpload = path.join(avatarDir, filename);

      await fs.rename(tempPath, resultUpload);

      Jimp.read(resultUpload, async (err, avatar) => {
          if (err) throw err;
           await avatar
               .resize(256, 256) // resize
              .write(resultUpload); // save
      });



      const avatarURL = path.join("avatars", filename);
      await UserModel.findByIdAndUpdate(_id, {avatarURL});
      res.json({
          avatarURL,
      })
  } catch (error) {
      await fs.unlink(req.file.path);
      throw error;
  }
}


module.exports= uploadAvatar;