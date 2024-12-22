import { ApiProperty } from '@nestjs/swagger';
import { File } from '../../../../domain/file';

export class FileResponseDto {
  @ApiProperty({
    type: () => File,
  })
  file: File;
}
