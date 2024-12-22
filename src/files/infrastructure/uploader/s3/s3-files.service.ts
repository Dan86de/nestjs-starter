import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { File } from '../../../domain/file';
import { FilesRepository } from '../../../application/ports/files.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3FilesService {
  constructor(
    private readonly fileRepository: FilesRepository,
    private readonly configService: ConfigService,
  ) {}

  async create(file: Express.MulterS3.File): Promise<File> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    const filePublicUrl = this.configService.get('AWS_S3_PUBLIC_URL');
    const bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
    const path = `${filePublicUrl}/${bucketName}/${file.key}`;

    return await this.fileRepository.create({ path });
  }
}
