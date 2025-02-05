import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

class SignUp {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(50, { message: 'Username must be at most 50 characters long' })
  username: string;
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @MaxLength(255, { message: 'Email must be at most 255 characters long' })
  @MinLength(5, { message: 'Email must be at least 5 characters long' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
  @IsNotEmpty({ message: 'please confirm your Password' })
  confirmPassword: string;
  @IsNotEmpty({ message: 'Role is required' })
  role: 'user';
}
export default SignUp;
