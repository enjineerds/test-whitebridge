import { UploadImageModel } from './upload-image.model';

export interface FaceDetectionModel {
  image: UploadImageModel;
  rectangle: FaceBox | null;
  confidence: number;
  age: number;
  gender: 'male' | 'female';
}

interface FaceBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}
