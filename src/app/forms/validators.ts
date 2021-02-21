import {IsEmail, IsNotEmpty, IsString, MinLength, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
export class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}


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

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8, {message: "password too short"})
    readonly password: string;

    @Match('password')
    readonly confirmPassword: string;
}
