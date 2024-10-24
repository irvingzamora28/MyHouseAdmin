import React, { useCallback, useRef, useState } from 'react';
import { BiCloudUpload, BiImage } from 'react-icons/bi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdError } from 'react-icons/md';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useImageUpload, FileError } from '../hooks/useImageUpload';

interface DragEventHTMLDiv extends React.DragEvent<HTMLDivElement> {
    dataTransfer: DataTransfer;
}

interface DragEventHTMLForm extends React.DragEvent<HTMLFormElement> {
    dataTransfer: DataTransfer;
}

interface ImageProcessResponse {
    result: {
        analysis: any; // Adjust this type based on your actual response structure
    };
}

type ImageUploadProps = PageProps & {
    // Add any additional props here
};

export default function ImageUpload({}: ImageUploadProps): JSX.Element {
    const {
        selectedImage,
        previewUrl,
        isUploading,
        error: frontEndError,
        handleImageSelect,
        reset,
    } = useImageUpload({
        maxSizeInMB: 10,
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        onError: (error: FileError) => {
            console.error(error.message);
        },
    });

    const [dragActive, setDragActive] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);

    const handleDrag = useCallback((e: DragEventHTMLDiv | DragEventHTMLForm): void => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e: DragEventHTMLDiv | DragEventHTMLForm): void => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files?.[0];
            if (file) {
                handleImageSelect(file);
            }
        },
        [handleImageSelect]
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!selectedImage || isUploading) return;

        const formData = new FormData();
        formData.append('image', selectedImage);

        router.post('/process-image', formData, {
            onSuccess: (response) => {
                // First cast to unknown, then to ImageProcessResponse
                const result = response as unknown as ImageProcessResponse;
                reset();
                console.log('Success:', result);

                console.log('Analysis:', result.result.analysis);
            },
            onError: (errors) => {
                // Assuming `errors` is an object with validation error messages
                console.error('Validation Errors:', errors);
                // Set the error state with the validation errors
                setValidationErrors(Array.isArray(errors.image) ? errors.image : [errors.image || 'An unexpected error occurred.']);
            },
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
        }
    };

    // Combine front-end and back-end validation errors
    const combinedErrors = frontEndError ? [frontEndError.message] : validationErrors;

    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Image Upload</h2>}
        >
            <Head title="Image Upload" />
            <div className="py-12" role="main" aria-label="Image upload section">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {combinedErrors.length > 0 && (
                                <div className="mb-4 p-2 border border-red-500 bg-red-100 text-red-700">
                                    <ul>
                                        {combinedErrors.map((error, index) => (
                                            <li key={index}>{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Image upload form">
                                <div
                                    ref={dropZoneRef}
                                    className={`relative border-2 border-dashed rounded-lg transition-colors duration-200
                    ${dragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'}
                    ${combinedErrors.length > 0 ? 'border-red-500' : ''}`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                    onKeyDown={handleKeyDown}
                                    tabIndex={0}
                                    role="button"
                                    aria-label="Image upload dropzone"
                                    aria-describedby="dropzone-description"
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp"
                                        onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        aria-label="File input"
                                    />

                                    <div className="p-8 text-center">
                                        {previewUrl ? (
                                            <div className="space-y-4">
                                                <img
                                                    src={previewUrl}
                                                    alt="Selected image preview"
                                                    className="mx-auto max-h-64 rounded-lg object-contain"
                                                />
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Press Enter or Space to select a different image
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {combinedErrors.length > 0 ? (
                                                    <MdError className="mx-auto h-12 w-12 text-red-500" />
                                                ) : (
                                                    <BiCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                                                )}
                                                <div className="space-y-2">
                                                    <p
                                                        id="dropzone-description"
                                                        className={`text-base ${combinedErrors.length > 0 ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
                                                    >
                                                        {combinedErrors.length > 0
                                                            ? 'Please fix the errors above.'
                                                            : 'Drop your image here, or click to browse'}
                                                    </p>
                                                    {combinedErrors.length === 0 && (
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            Supports: JPG, PNG, GIF, WebP (max 10MB)
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedImage || isUploading || combinedErrors.length > 0}
                                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent
                    rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                    disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors duration-200"
                                    aria-label={isUploading ? 'Processing image' : 'Upload image'}
                                >
                                    {isUploading ? (
                                        <span className="flex items-center space-x-2" role="status">
                                            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" aria-hidden="true" />
                                            <span>Processing...</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center space-x-2">
                                            {selectedImage && <BiImage className="h-5 w-5" aria-hidden="true" />}
                                            <span>{selectedImage ? 'Process Image' : 'Select an Image First'}</span>
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
