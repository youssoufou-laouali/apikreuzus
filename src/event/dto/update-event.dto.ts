import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

enum Rappel {
    aucun= 'aucun',
    mail= 'mail',
    sms= 'sms'
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @ApiProperty({
        description:'Le titre de l\'événement',
        default: 'Audiance avec le DG du KREEZUS'
    })
    title!: string;

    @ApiProperty({
        description:'Date et heure du debut de l\'évenement',
        default: new Date()
    })
    begin!: Date;

    @ApiProperty({
        description: 'Date et heure du fin de l\'évenemnt',
        default: new Date()
    })
    end!: Date;


    @ApiProperty({
        enum: ['aucun','mail', 'sms', ]
    })
    rappel!: Rappel;

}
