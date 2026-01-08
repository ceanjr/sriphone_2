"use client";

/**
 * Image Uploader com Drag & Drop
 * - Upload para Cloudinary com progress bar
 * - Preview com thumbnails
 * - Reordenação com drag & drop
 * - Primeira imagem é a principal
 * - Máximo de 5 imagens
 */

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload, Trash2, Loader2, X } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface UploadedImage {
  url: string;
  publicId: string;
  id: string;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

function SortableImageItem({
  image,
  index,
  onRemove,
  isRemoving,
}: {
  image: UploadedImage;
  index: number;
  onRemove: (id: string) => void;
  isRemoving: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative aspect-square w-32 overflow-hidden rounded-lg border-2 bg-brand-gray-dark ${
        isDragging
          ? "z-50 border-brand-light shadow-lg"
          : "border-border-subtle-dark"
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-grab select-none touch-none active:cursor-grabbing"
        style={{
          WebkitUserSelect: 'none',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        <Image
          src={image.url}
          alt={`Upload ${index + 1}`}
          fill
          className="pointer-events-none object-cover"
          sizes="128px"
          draggable={false}
        />
      </div>

      {/* Badge for main image */}
      {index === 0 && (
        <div className="pointer-events-none absolute left-2 top-2 rounded bg-brand-light px-2 py-1 text-xs font-semibold text-text-primary-light">
          Principal
        </div>
      )}

      {/* Remove button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(image.id);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!isRemoving) {
            onRemove(image.id);
          }
        }}
        disabled={isRemoving}
        className="absolute right-2 top-2 z-10 rounded-md bg-red-500/90 p-2 text-white opacity-100 md:opacity-0 transition-opacity hover:bg-red-600 md:group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-50"
        title="Remover imagem"
        style={{ touchAction: 'manipulation', pointerEvents: 'auto' }}
      >
        {isRemoving ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Trash2 className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const uploadToCloudinary = async (file: File): Promise<UploadedImage> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return {
      url: data.url,
      publicId: data.publicId,
      id: `${Date.now()}-${Math.random()}`,
    };
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      // Check max images limit
      const availableSlots = maxImages - images.length;
      if (availableSlots <= 0) {
        setError(`Máximo de ${maxImages} imagens permitido`);
        return;
      }

      const filesToUpload = acceptedFiles.slice(0, availableSlots);

      if (filesToUpload.length < acceptedFiles.length) {
        setError(
          `Apenas ${availableSlots} ${
            availableSlots === 1 ? "imagem foi adicionada" : "imagens foram adicionadas"
          }. Máximo: ${maxImages}`
        );
      }

      setUploading(true);
      setUploadProgress(0);

      try {
        const uploadPromises = filesToUpload.map(async (file, index) => {
          const uploaded = await uploadToCloudinary(file);
          setUploadProgress(
            Math.round(((index + 1) / filesToUpload.length) * 100)
          );
          return uploaded;
        });

        const uploadedImages = await Promise.all(uploadPromises);
        onChange([...images, ...uploadedImages]);
      } catch (err) {
        console.error("Upload error:", err);
        setError("Erro ao fazer upload das imagens");
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    },
    [images, onChange, maxImages]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading || images.length >= maxImages,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);

      const newImages = arrayMove(images, oldIndex, newIndex);
      onChange(newImages);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    setError(null);

    try {
      const imageToRemove = images.find((img) => img.id === id);
      if (!imageToRemove) return;

      // Delete from Cloudinary
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: imageToRemove.publicId }),
      });

      // Remove from state
      onChange(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Remove error:", err);
      setError("Erro ao remover imagem");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? "border-brand-light bg-brand-light/10"
            : uploading || images.length >= maxImages
            ? "cursor-not-allowed border-border-dark bg-brand-gray-dark/50 opacity-50"
            : "border-border-subtle-dark bg-brand-gray-dark hover:border-brand-light hover:bg-brand-light/5"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-brand-light/10 p-4">
            <Upload className="h-8 w-8 text-brand-light" />
          </div>

          {uploading ? (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-primary-dark">
                  Fazendo upload...
                </p>
                <div className="h-2 w-64 overflow-hidden rounded-full bg-border-dark">
                  <div
                    className="h-full bg-brand-light transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-text-muted-dark">
                  {uploadProgress}%
                </p>
              </div>
            </>
          ) : images.length >= maxImages ? (
            <p className="text-sm text-text-muted-dark">
              Limite de {maxImages} imagens atingido
            </p>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-text-primary-dark">
                  {isDragActive
                    ? "Solte as imagens aqui"
                    : "Arraste imagens ou clique para selecionar"}
                </p>
                <p className="mt-1 text-xs text-text-muted-dark">
                  PNG, JPG, WEBP até 5MB • Máximo {maxImages} imagens •{" "}
                  {images.length}/{maxImages} enviadas
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
          <X className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Image Previews with Drag & Drop */}
      {images.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-medium text-text-primary-dark">
            Imagens ({images.length}/{maxImages})
            {images.length > 0 && (
              <span className="ml-2 text-xs text-text-muted-dark">
                • Arraste para reordenar • Primeira imagem é a principal
              </span>
            )}
          </p>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((img) => img.id)}
              strategy={horizontalListSortingStrategy}
            >
              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                  <SortableImageItem
                    key={image.id}
                    image={image}
                    index={index}
                    onRemove={handleRemove}
                    isRemoving={removingId === image.id}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
