import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesRepository } from '../../../application/ports/files.repository';
import { OrmFilesRepository } from './repository/files.repository';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: FilesRepository,
      useClass: OrmFilesRepository,
    },
  ],
  exports: [FilesRepository],
})
export class OrmFilePersistenceModule {}
