import dotenv from 'dotenv';
import AppError from '@shared/infra/http/errors/AppError';
import { BlobServiceClient } from '@azure/storage-blob';

dotenv.config();

export async function deleteImage(
  blobContainer: string,
  imageURL: string,
): Promise<boolean> {
  const azureKey = process.env.AZURE_STORAGE_KEY || '';
  const image = imageURL.split('images/');

  const blobServiceClient = BlobServiceClient.fromConnectionString(azureKey);
  const containerClient = blobServiceClient.getContainerClient(blobContainer);
  const blockBlobClient = containerClient.getBlockBlobClient(image[1]);

  try {
    await blockBlobClient.download(0);
    blockBlobClient.delete();
  } catch (err) {
    throw new AppError('An error occurred while deleting the image, try again');
  }

  return true;
}
