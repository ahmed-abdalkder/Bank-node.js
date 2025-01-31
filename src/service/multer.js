import multer from "multer"
import { nanoid } from "nanoid";

export const validextintion={
    image:['image/jpg','image/jpeg','image/jpng','image/webp'],
    pdf:['application/pdf'],
    video:['video/mp4'],
}
export const localmulter=(customvalidation)=>{

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null,'uploads')
    },

    filename: function (req, file, cb) {
       
      cb(null, nanoid(5) + file.originalname )
    }

  });

  const fileFilter = function(req, file, cb) {
 
if(customvalidation.includes(file.mimetype)){
   
 return cb(null, true)

}
  cb(new Error('I do not have a clue!'))

}
  const upload = multer({ storage ,fileFilter })
  return upload
}


export const hostmulter=(customvalidation)=>{

  const storage = multer.diskStorage({})
      
    const fileFilter = function(req, file, cb) {
   
  if(customvalidation.includes(file.mimetype)){
     
   return cb(null, true)
  
  }
    cb(new Error('I do not have a clue!'))
  
  }
    const upload = multer({ storage ,fileFilter })
    return upload
  }