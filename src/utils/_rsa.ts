import * as nodersa from "node-rsa";

const get = () => {
  const RSA_KEYS = {
    public_key: process.env.PUBLIC_KEY,
    private_key: process.env.PRIVATE_KEY,
  };
  return RSA_KEYS as { public_key: string; private_key: string };
};

const encrypter = ({
  key,
  data,
}: {
  key?: string;
  data: string | number[];
}) => {
  if (!key) key = get().public_key;

  const max_length = 86;

  if (typeof data === "string" && data.length > max_length) {
    const datas: string[] = [];

    for (let i = 0; i < data.length; i += max_length) {
      const dt = data.slice(i, i + max_length);
      const enc = encrypter({ key, data: dt });
      datas.push(enc as string);
    }

    return datas;
  }

  const _key = new nodersa({ b: 512 });
  _key.importKey(key, "pkcs8-public-pem");

  const enc = _key.encrypt(Buffer.from(data), "base64");
  return enc;
};

const decrypter = ({
  key,
  data,
}: {
  key?: string;
  data: string | string[];
}) => {
  if (!key) key = get().private_key;

  if (Array.isArray(data)) {
    let datas = "";

    for (const dt of data) datas += decrypter({ key, data: dt });

    return datas;
  }

  const _key = new nodersa({ b: 512 });
  _key.importKey(key, "pkcs8-private-pem");

  const dec = _key.decrypt(data, "utf8");
  return dec;
};

export default { encrypter, decrypter, get };
