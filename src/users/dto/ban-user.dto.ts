import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({example: '1', description: 'User ID'})
  readonly userId: number;

  @ApiProperty({example: 'Toxic', description: 'Reason for ban'})
  readonly banReason: string;
}