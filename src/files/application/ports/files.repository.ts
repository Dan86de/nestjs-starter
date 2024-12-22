import { File } from '../../domain/file';

export abstract class FilesRepository {
  abstract create(data: Omit<File, 'id'>): Promise<File>;

  abstract findById(id: File['id']): Promise<File | null>;

  abstract findByIds(ids: File['id'][]): Promise<File[]>;
}
