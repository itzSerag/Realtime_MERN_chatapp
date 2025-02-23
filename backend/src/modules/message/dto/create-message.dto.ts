import { IsBase64, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    text: string

    imageBase64?: string
}
