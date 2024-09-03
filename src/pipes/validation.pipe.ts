import { ArgumentMetadata, Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exeptions/validation.exeptions';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any>{
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length){
            let message = errors.map(err => {
                return `${err.property} - ${Object.values(err.constraints).join(', ')}`
            })
            throw new ValidationException(message)
        }
        return value
    }

}