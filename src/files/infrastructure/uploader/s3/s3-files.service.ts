import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { File } from '../../../domain/file';
import { FilesRepository } from 'src/files/application/ports/files.repository';

@Injectable()
export class S3FilesService {
  constructor(private readonly fileRepository: FilesRepository) {}

  async create(file: Express.MulterS3.File): Promise<{ file: File }> {
    if (!file) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          file: 'selectFile',
        },
      });
    }

    const fileEntity = new File(file.key, file.location);

    return {
      file: await this.fileRepository.create(fileEntity),
    };
  }
}
