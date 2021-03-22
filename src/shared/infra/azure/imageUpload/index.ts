import * as azure from 'azure-storage';
import * as crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export function azureCreate(blobContainerName: string, image: string): string {
  const azureKey = process.env.AZURE_STORAGE_KEY || '';
  const blobService = azure.createBlobService(azureKey);

  let filename = `${crypto.randomBytes(16).toString('hex')}.jpg`;

  const rawDataImage = image;
  const matches =
    rawDataImage.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/) || '';
  const type = matches[1];
  const buffer = matches ? Buffer.from(matches[2], 'base64') : '';

  const publisher_logo = `https://peruibetec.blob.core.windows.net/${blobContainerName}/${filename}`;

  blobService.createBlockBlobFromText(
    blobContainerName,
    filename,
    buffer,
    {
      contentSettings: { contentType: type },
    },
    err => {
      if (err) {
        filename = 'default-publisher.png';
      }
    },
  );

  return publisher_logo;
}
