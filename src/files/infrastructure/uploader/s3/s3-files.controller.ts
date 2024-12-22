import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileResponseDto } from './dto/file-response.dto';
import { S3FilesService } from './s3-files.service';

@ApiTags('Files')
@Controller({
  path: 'files',
  version: '1',
})
export class S3FilesController {
  constructor(private readonly filesService: S3FilesService) {}

  @ApiCreatedResponse({
    type: FileResponseDto,
  })
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.MulterS3.File,
  ): Promise<FileResponseDto> {
    const newFile = await this.filesService.create(file);
    return { file: newFile };
  }
}
