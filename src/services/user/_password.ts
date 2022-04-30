import _data from "../../data";

export default async ({
  id,
  password,
  password_confirmation,
}: {
  id: string;
  password: string;
  password_confirmation: string;
}) => {
  const user = await _data.functions.user.password({
    id,
    password,
    password_confirmation,
  });

  return user;
};
