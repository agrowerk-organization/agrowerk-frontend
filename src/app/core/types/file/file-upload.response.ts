export interface FileUploadResponse {
    id: string;
    originalUrl: string;
    optimizedUrl: string;
    thumbnailUrl: string;
    mediumUrl: string;
    originalFileName: string;
    contentType: string;
    fileSize: number;
    width: number;
    height: number;
    category: string;
    created: string;
}