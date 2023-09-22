import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { config } from './config';

export const s3Client = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

/**
 * @see https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
 */
export async function getPresignedUrl(
  bucket = config.EVENT.BUCKET_NAME,
  key: string,
  expires: number,
) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn: expires });
}
