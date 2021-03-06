export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  small_biography?: string;
  photo?: string;
  background_photo?: string;
  is_tourist: boolean;
}
