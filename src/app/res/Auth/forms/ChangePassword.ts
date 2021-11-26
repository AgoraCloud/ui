// import { ChangePasswordDto } from '@agoracloud/common';
import { APIRepo, FormModel } from '@mars-man/models';
import { types } from 'app/constants';

interface changePassword_i {
  token: string;
  password: string;
  confirmPassword: string;
}
export class ChangePasswordFormModel extends FormModel<changePassword_i> {
  constructor() {
    super({
      data: {
        token: '',
        password: '',
        confirmPassword: '',
      },
      validator: ChangePasswordDto,
      submit: new APIRepo({
        path: '/api/auth/change-password',
        events: types.CHANGE_PASSWORD,
        method: 'POST',
      }),
    });
  }

  get payload() {
    return {
      password: this.data.password,
      confirmPassword: this.data.confirmPassword,
      token: this.data.token,
    };
  }
}

import {
  IsNotEmpty,
  IsString,
  MinLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

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

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }
  defaultMessage(args: ValidationArguments) {
    return "Password's do not match";
  }
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password too short' })
  readonly password: string;

  @Match('password')
  readonly confirmPassword: string;
}
