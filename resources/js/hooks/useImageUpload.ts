// hooks/useImageUpload.ts
import { useState, useCallback, useEffect } from 'react';

export interface FileError {
    message: string;
    code: 'file-type' | 'file-size' | 'file-invalid';
}

interface UseImageUploadOptions {
    maxSizeInMB?: number;
    allowedTypes?: string[];
    onError?: (error: FileError) => void;
}

interface UseImageUploadReturn {
    selectedImage: File | null;
    previewUrl: string | null;
    isUploading: boolean;
    error: FileError | null;
    handleImageSelect: (file: File) => void;
    handleUpload: () => Promise<void>;
    reset: () => void;
}

const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const DEFAULT_MAX_SIZE = 10; // 10MB

export const useImageUpload = ({
    maxSizeInMB = DEFAULT_MAX_SIZE,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    onError,
}: UseImageUploadOptions = {}): UseImageUploadReturn => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<FileError | null>(null);

    const validateFile = (file: File): FileError | null => {
        if (!allowedTypes.includes(file.type)) {
            return {
                code: 'file-type',
                message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
            };
        }

        if (file.size > maxSizeInMB * 1024 * 1024) {
            return {
                code: 'file-size',
                message: `File size must be less than ${maxSizeInMB}MB`,
            };
        }

        return null;
    };

    const handleImageSelect = useCallback(
        (file: File): void => {
            const fileError = validateFile(file);

            if (fileError) {
                setError(fileError);
                onError?.(fileError);
                return;
            }

            setError(null);
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        },
        [maxSizeInMB, allowedTypes, onError]
    );

    const handleUpload = async (): Promise<void> => {
        if (!selectedImage) return;
        setIsUploading(true);
        // Upload logic will be implemented by the component
    };

    const reset = useCallback((): void => {
        setSelectedImage(null);
        setPreviewUrl(null);
        setError(null);
        setIsUploading(false);
    }, []);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return {
        selectedImage,
        previewUrl,
        isUploading,
        error,
        handleImageSelect,
        handleUpload,
        reset,
    };
};
