export type registerType = {
  username: string;
  password: string;
  email: string;
};

export type varifyAccountType = {
  code: string;
  token: string;
};

export type loginType = {
  user: string;
  password: string;
};

export type restorePasswordSetNewType = {
  code: string;
  token: string;
  password: string;
};
