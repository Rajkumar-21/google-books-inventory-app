'use client';

interface BookCardProps {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  imageUrl?: string;
}

export default function BookCard({
  title,
  authors,
  publisher,
  publishedDate,
  description,
  imageUrl,
}: BookCardProps) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover rounded"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
            }}
          />
        </div>
      )}
      <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
      {authors && authors.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          by {authors.slice(0, 2).join(', ')}
        </p>
      )}
      {publisher && (
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-semibold">Publisher:</span> {publisher}
        </p>
      )}
      {publishedDate && (
        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Published:</span> {publishedDate}
        </p>
      )}
      {description && (
        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>
      )}
    </div>
  );
}
