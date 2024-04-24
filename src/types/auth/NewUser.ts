export default interface NewUser {
  email: string;
  password: string;
  gender: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  creationDate: number;
}
