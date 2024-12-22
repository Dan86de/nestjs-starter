import { Injectable } from '@nestjs/common';
import { File } from './domain/file';
import { FilesRepository } from './application/ports/files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FilesRepository) {}

  findById(id: File['id']): Promise<File | null> {
    return this.fileRepository.findById(id);
  }

  findByIds(ids: File['id'][]): Promise<File[]> {
    return this.fileRepository.findByIds(ids);
  }
}
