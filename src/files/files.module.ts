import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { S3FilesModule } from './infrastructure/uploader/s3/s3-files.module';
import { OrmFilePersistenceModule } from './infrastructure/persistence/orm/orm-files-persistence.module';

@Module({
  imports: [OrmFilePersistenceModule, S3FilesModule],
  providers: [FilesService],
  exports: [FilesService, OrmFilePersistenceModule],
})
export class FilesModule {}
