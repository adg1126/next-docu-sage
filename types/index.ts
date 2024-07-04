declare interface signInProps {
  email: string;
  password: string;
}

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

declare interface getUserInfoProps {
  userId: string;
}
