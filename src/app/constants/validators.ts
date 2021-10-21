import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmDeleteValidator {
    @IsString()
    @IsNotEmpty()
    name: string;
}