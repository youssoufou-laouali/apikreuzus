import { ApiProperty } from "@nestjs/swagger";

enum Rappel {
    aucun= 'aucun',
    mail= 'mail',
    sms= 'sms'
}
export class Event {
    @ApiProperty({
        description:'Le titre de l\'événement',
        default: 'Audience avec le DG du KREEZUS'
    })
    title: string;

    @ApiProperty({
        description:'Date et heure du debut de l\'évenement',
        default: Date.now()
    })
    begin: string;

    @ApiProperty({
        description: 'Date et heure du fin de l\'évenemnt',
        default: Date.now()
    })
    end: string;

    @ApiProperty({
        description:'La description de l\'évenement',
        default: 'Exposition du projet Walt'
    })
    description: string;

    @ApiProperty({
        description:'Identifiant de l\'évenement',
        minimum:1,
        default:1
    })
    id: number;

    @ApiProperty({
        enum: ['aucun','mail', 'sms', ]
    })
    rappel!: Rappel;

    @ApiProperty({
        description:'Information personnel',
        default:{
            name: 'Ali',
            lastName: 'Habibou',
            email: 'test@test.com'
        }
        
    })
    person: {
        name: string,
        lastName: string,
        email: string
    }
}
