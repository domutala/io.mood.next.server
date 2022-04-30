import * as fileUpload from "express-fileupload";
import { File } from "../../entities/File";

/**
 * @author domutala
 */
export default async ({
  user,
  file,
}: {
  user: string;
  file: fileUpload.UploadedFile;
}) => {
  // vérifier si unit existe

  const _file = new File();
  _file.type = file.mimetype;
  _file.name = file.name;
  _file.value = file.data.toString("base64");
  _file.user = user;

  await _file.save();

  return _file;
};
