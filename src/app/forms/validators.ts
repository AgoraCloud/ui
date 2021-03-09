import {IsEmail, IsNotEmpty, IsString, MinLength, registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, 
    ValidatorConstraintInterface, IsInt, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import "reflect-metadata";

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

export class CreateWorkspaceResourcesDto {
    @Min(1, {message: "CPU count must not be less than 1"})
    @IsInt()
    @IsOptional()
    readonly cpuCount?: number;

    @Min(2, {message: "Memory count must not be less than 2"})
    @IsInt()
    @IsOptional()
    readonly memoryCount?: number;

    @Min(8,  {message: "Storage count must not be less than 8"})
    @IsInt()
    @IsOptional()
    readonly storageCount?: number;
}

export class CreateWorkspacePropertiesDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => CreateWorkspaceResourcesDto)
    readonly resources?: CreateWorkspaceResourcesDto;
}

export class CreateWorkspaceDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: "name too short"})
    readonly name: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateWorkspacePropertiesDto)
    readonly properties?: CreateWorkspacePropertiesDto;
}



// import { deploymentImages } from './../deployment-images';
// import { DeploymentImage } from './../schemas/deployment.schema';
export const deploymentImages: DeploymentImage[] = [
    { name: 'linuxserver/code-server', tag: 'version-v3.8.1' },
    { name: 'linuxserver/code-server', tag: 'version-v3.8.0' },
    { name: 'linuxserver/code-server', tag: 'version-v3.7.4' },
    { name: 'linuxserver/code-server', tag: 'version-v3.7.3' },
    { name: 'linuxserver/code-server', tag: 'version-v3.7.2' },
    { name: 'linuxserver/code-server', tag: 'version-v3.7.1' },
  ];
export class DeploymentImage {
    // @Prop({ required: true })
    name: string;
  
    // @Prop({ required: true })
    tag: string;
  
    constructor(partial: Partial<DeploymentImage>) {
      Object.assign(this, partial);
    }
  }

import {
  IsDefined,
  Validate,
} from 'class-validator';

/**
 * Validates the given deployment image
 */
@ValidatorConstraint({ name: 'isValidDeploymentImage', async: false })
class IsValidDeploymentImage implements ValidatorConstraintInterface {
  validate(image: DeploymentImage) {
    return (
      image &&
      image.name &&
      image.tag &&
      deploymentImages.findIndex(
        (i) => i.name === image.name && i.tag === image.tag,
      ) !== -1
    );
  }

  defaultMessage() {
    return 'image is not one of the allowed deployment images';
  }
}

export class CreateDeploymentImageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tag: string;
}

export class CreateDeploymentResourcesDto {
  @Min(1)
  @IsInt()
  cpuCount: number;

  @Min(2)
  @IsInt()
  memoryCount: number;

  @Min(8)
  @IsInt()
  @IsOptional()
  storageCount: number;
}

export class CreateDeploymentPropertiesDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateDeploymentImageDto)
  @Validate(IsValidDeploymentImage)
  image: CreateDeploymentImageDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateDeploymentResourcesDto)
  resources: CreateDeploymentResourcesDto;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  sudoPassword: string;
}

export class CreateDeploymentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => CreateDeploymentPropertiesDto)
  properties: CreateDeploymentPropertiesDto;
}


export class UpdateDeploymentResourcesDto {
  @Min(1)
  @IsInt()
  @IsOptional()
  cpuCount: number;

  @Min(2)
  @IsInt()
  @IsOptional()
  memoryCount: number;
}

export class UpdateDeploymentPropertiesDto {
  @ValidateNested()
  @Type(() => UpdateDeploymentResourcesDto)
  @IsOptional()
  resources: UpdateDeploymentResourcesDto;
}

export class UpdateDeploymentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @IsOptional()
  name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateDeploymentPropertiesDto)
  properties?: UpdateDeploymentPropertiesDto;
}
