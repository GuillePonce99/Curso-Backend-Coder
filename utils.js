import fs from "fs"

const read = async (file) => {

  try {
    let result = await fs.promises.readFile(file, "utf-8")
    let data = await JSON.parse(result)
    return data
  }
  catch (error) {
    console.log(error);
  }
}

const write = async (file, data) => {

  try {
    await fs.promises.writeFile(file, JSON.stringify(data))
    return true;
  }
  catch (error) {
    console.log(error);
  }
}

export default { read, write };