import { writeFileSync } from "fs";
import imporAll from "./../../api/utils/import-all";

export const createControllerImporter = () => {
  const allCntrollers = imporAll(`${__dirname}/../../api/controllers`);
  let content = `/* this is a autogenerated file */\n`;
  const controllerPath = "./controllers";
  allCntrollers.map((file: any) => {
    content += `import "${controllerPath}/${file}";\n`;
  });
  writeFileSync(`${__dirname}/../../api/controllerImport.ts`, content);
};
