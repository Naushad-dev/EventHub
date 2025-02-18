import multer from "multer";
import crypto from "crypto"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
      const suffix= Date.now()
      // console.log("reqwala obj",req);
      crypto.randomBytes(8,(err,bytes)=>{
      const fileName= bytes.toString("hex") + path.extname(file.originalname)
      // console.log("file uploaded ", fileName)
  
      if(err) return console.log(err)
          
      cb(null, fileName);
  
      })
      
  
    },
  });
  
  export const upload = multer({ storage });