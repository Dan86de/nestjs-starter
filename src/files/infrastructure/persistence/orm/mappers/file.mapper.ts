import { FileEntity } from '../entities/file.entity';
import { File } from '../../../../domain/file';

export class FileMapper {
  static toDomain(raw: FileEntity): File {
    return {
      id: raw.id,
      path: raw.path,
    };
  }

  static toPersistence(domainEntity: File): FileEntity {
    const persistenceEntity = new FileEntity();
    persistenceEntity.id = domainEntity.id;
    persistenceEntity.path = domainEntity.path;
    return persistenceEntity;
  }
}
