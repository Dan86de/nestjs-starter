import {
  HttpStatus,
  Module,
  UnprocessableEntityException,
} from '@nestjs/common';
import { S3FilesService } from './s3-files.service';
import { S3FilesController } from './s3-files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { OrmFilePersistenceModule } from '../../persistence/orm/orm-files-persistence.module';

@Module({
  imports: [
    OrmFilePersistenceModule,
    MulterModule.registerAsync({
      imports: [OrmFilePersistenceModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const accessKeyId = configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = configService.get('AWS_SECRET_ACCESS_KEY');
        const bucket = configService.get('AWS_S3_BUCKET_NAME');
        const region = configService.get('AWS_S3_REGION');
        const fileSize = configService.get('AWS_S3_MAX_FILE_SIZE');

        console.log({
          accessKeyId,
          secretAccessKey,
          bucket,
          region,
          fileSize,
        });

        const s3 = new S3Client({
          endpoint: 'https://fra1.digitaloceanspaces.com',
          region,
          credentials: {
            accessKeyId,
            secretAccessKey,
          },
          forcePathStyle: true,
        });

        return {
          fileFilter: (request, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
              return callback(
                new UnprocessableEntityException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  errors: {
                    file: `cantUploadFileType`,
                  },
                }),
                false,
              );
            }

            callback(null, true);
          },
          storage: multerS3({
            s3: s3,
            bucket,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (request, file, callback) => {
              callback(
                null,
                `${randomStringGenerator()}.${file.originalname
                  .split('.')
                  .pop()
                  ?.toLowerCase()}`,
              );
            },
          }),
          limits: {
            fileSize,
          },
        };
      },
    }),
  ],
  controllers: [S3FilesController],
  providers: [S3FilesService],
  exports: [S3FilesService],
})
export class S3FilesModule {}
