// // src/services/storage.service.ts
// import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// import { createHash } from 'crypto';

// class StorageService {
//   private s3Client: S3Client;
//   private bucket: string;

//   constructor() {
//     this.s3Client = new S3Client({
//       region: process.env.AWS_REGION || 'eu-west-3',
//       credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
//       }
//     });
//     this.bucket = process.env.AWS_S3_BUCKET || 'gndc-assets';
//   }

//   async uploadFile(file: Express.Multer.File, prefix: string): Promise<string> {
//     const hash = createHash('md5').update(Date.now().toString()).digest('hex');
//     const key = `${prefix}/${hash}-${file.originalname}`;

//     await this.s3Client.send(new PutObjectCommand({
//       Bucket: this.bucket,
//       Key: key,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//       ACL: 'public-read'
//     }));

//     return `https://${this.bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
//   }

//   async deleteFile(url: string): Promise<void> {
//     const key = url.split('.amazonaws.com/')[1];
    
//     await this.s3Client.send(new DeleteObjectCommand({
//       Bucket: this.bucket,
//       Key: key
//     }));
//   }
// }

// export default new StorageService();