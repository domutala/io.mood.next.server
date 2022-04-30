import data from "../../data";
import * as fileUpload from "express-fileupload";

import { ISession } from "../../../types/express-extend";

export default async ({
  session,
  files,
}: {
  session: ISession;
  files: fileUpload.UploadedFile | fileUpload.UploadedFile[];
}) => {
  const fs: string[] = [];
  files = Array.isArray(files) ? files : [files];

  for (const file of files) {
    const f = await data.functions.file.add({
      file,
      user: session.user as any,
    });
    fs.push(f.id.toString());
  }

  return fs;
};
