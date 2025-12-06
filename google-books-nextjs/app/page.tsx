'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import {
  searchBooks,
  searchBooksByTitle,
  searchBooksByAuthor,
  searchBooksByCategory,
  BookSearchResponse,
} from '@/lib/api';

export default function Home() {
  const [results, setResults] = useState<BookSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentSearchType, setCurrentSearchType] = useState<'general' | 'title' | 'author' | 'category'>('general');

  const handleSearch = async (
    query: string,
    type: 'general' | 'title' | 'author' | 'category'
  ) => {
    setIsLoading(true);
    setError(null);
    setCurrentQuery(query);
    setCurrentSearchType(type);

    try {
      let response;
      switch (type) {
        case 'title':
          response = await searchBooksByTitle(query, 1);
          break;
        case 'author':
          response = await searchBooksByAuthor(query, 1);
          break;
        case 'category':
          response = await searchBooksByCategory(query, 1);
          break;
        default:
          response = await searchBooks(query, 1);
      }
      setResults(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      let response;
      switch (currentSearchType) {
        case 'title':
          response = await searchBooksByTitle(currentQuery, page);
          break;
        case 'author':
          response = await searchBooksByAuthor(currentQuery, page);
          break;
        case 'category':
          response = await searchBooksByCategory(currentQuery, page);
          break;
        default:
          response = await searchBooks(currentQuery, page);
      }
      setResults(response);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Google Books Inventory
          </h1>
          <p className="text-lg text-gray-600">
            Search millions of books from the Google Books database
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results Count */}
        {results && (
          <div className="mb-4 text-gray-600">
            <p>
              Found <span className="font-bold text-gray-900">{results.pagination.total_items}</span> results
              {results.items.length > 0 && ` - Showing ${results.items.length} on this page`}
            </p>
          </div>
        )}

        {/* Books Grid */}
        {results && results.items.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {results.items.map((book, index) => (
                <BookCard
                  key={`${book.id}-${index}`}
                  title={book.volumeInfo?.title || 'Unknown Title'}
                  authors={book.volumeInfo?.authors}
                  publisher={book.volumeInfo?.publisher}
                  publishedDate={book.volumeInfo?.publishedDate}
                  description={book.volumeInfo?.description}
                  imageUrl={book.volumeInfo?.imageLinks?.thumbnail}
                />
              ))}
            </div>

            {/* Pagination */}
            {results.pagination.total_pages > 1 && (
              <Pagination
                currentPage={results.pagination.current_page}
                totalPages={results.pagination.total_pages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </div>
        ) : results && results.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No books found. Try a different search.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">Enter a search query to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
