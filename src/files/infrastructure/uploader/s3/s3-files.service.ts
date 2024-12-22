import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { File } from '../../../domain/file';
import { FilesRepository } from '../../../application/ports/files.repository';

@Injectable()
export class S3FilesService {
  constructor(private readonly fileRepository: FilesRepository) {}

  async create(file: Express.MulterS3.File): Promise<File> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    return await this.fileRepository.create({ path: file.path });
  }
}
