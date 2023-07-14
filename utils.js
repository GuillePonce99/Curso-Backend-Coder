import fs from "fs"
import { fileURLToPath } from "url";
import { dirname } from "path";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
/*

const fileExist = async (path) => {
  let readfilename = __dirname + "/" + path;
  try {
    if (fs.existsSync(readfilename )) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};
*/
const read = async(file) =>{
    let readfilename = __dirname + "/" + file;
    try{
        let result = await fs.promises.readFile(readfilename,"utf-8")
        let data = await JSON.parse(result)
        return data
    }
    catch(error){
        console.log(error);
    }
}

const write = async(file, data) =>{
    let readfilename = __dirname + "/" + file;
    try{
        await fs.promises.writeFile(readfilename,JSON.stringify(data))
        return true;
    }
    catch(error){
        console.log(error);
    }
}

export default {read,write};