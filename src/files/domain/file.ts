import { ApiProperty } from '@nestjs/swagger';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Transform } from 'class-transformer';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export class File {
  @ApiProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  id: string;
  @ApiProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  @Transform(
    ({ value }) => {
      const s3 = new S3Client({
        region: process.env.AWS_REGION ?? 'US',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        },
      });

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME ?? '',
        Key: value,
      });

      return getSignedUrl(s3, command, { expiresIn: 3600 });
    },
    {
      toPlainOnly: true,
    },
  )
  path: string;
  constructor(
    public fileId: string,
    public filePath: string,
  ) {
    this.id = fileId;
    this.path = filePath;
  }
}
