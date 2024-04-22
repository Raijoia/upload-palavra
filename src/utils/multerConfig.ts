const multer = require('multer');
const path = require('path');

export const storage = multer.diskStorage({
  destination: (req: any, file: any, callback: any) => {
    callback(null, path.resolve('palavras'));
  },
  filename: (req: any, file: any, callback: any) => {
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});
