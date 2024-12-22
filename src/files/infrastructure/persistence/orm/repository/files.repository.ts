import { FilesRepository } from '../../../../application/ports/files.repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../database/prisma/prisma.service';
import { File } from '../../../../domain/file';
import { FileMapper } from '../mappers/file.mapper';

@Injectable()
export class OrmFilesRepository implements FilesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: Omit<File, 'id'>): Promise<File> {
    const rawFile = await this.prismaService.file.create({ data });
    return FileMapper.toDomain(rawFile);
  }

  async findById(id: File['id']): Promise<File | null> {
    const rawFile = await this.prismaService.file.findUnique({ where: { id } });
    if (!rawFile) return null;
    return FileMapper.toDomain(rawFile);
  }

  async findByIds(ids: File['id'][]): Promise<File[]> {
    const rawFile = await this.prismaService.file.findMany({
      where: { id: { in: ids } },
    });
    return rawFile.map(FileMapper.toDomain);
  }
}
