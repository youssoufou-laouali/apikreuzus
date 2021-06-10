import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

enum Rappel {
    aucun= 'aucun',
    mail= 'mail',
    sms= 'sms'
}
export class CreateEventDto {
    @ApiProperty({
        description:'Le titre de l\'événement',
        default: 'Audience avec le DG du KREEZUS'
    })
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({
        description:'Date et heure du debut de l\'évenement',
        default: Date.now()
    })
    @IsNotEmpty()
    readonly begin: string;

    @ApiProperty({
        description: 'Date et heure du fin de l\'évenemnt',
        default: Date.now()
    })
    @IsNotEmpty()
    readonly end: string;

    @ApiProperty({
        description:'La description de l\'évenement',
        default: 'Exposition du projet Walt'
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({
        enum: ['aucun','mail', 'sms', ]
    })
    readonly rappel!: Rappel;

    @ApiProperty({
        description:'Information personnel',
        default:{
            name: 'Ali',
            lastName: 'Habibou',
            email: 'test@test.com'
        }
        
    })
    @IsNotEmpty()
    readonly person: {
        name: string,
        lastName: string,
        email: string
    }
}


