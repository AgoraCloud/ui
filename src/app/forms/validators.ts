import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';



export class CreateUserDto {
// constructor(data: any){Object.assign(this, data)}

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    readonly fullName: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}



export class LoginUserDto {
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: "password too short"})
    readonly password: string;
}

export class ForgotPasswordDto {
    @IsEmail()
    readonly email: string
}
