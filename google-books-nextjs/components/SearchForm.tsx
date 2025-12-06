'use client';

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string, type: 'general' | 'title' | 'author' | 'category') => void;
  isLoading?: boolean;
}

export default function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'general' | 'title' | 'author' | 'category'>('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), searchType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="searchType"
              value="general"
              checked={searchType === 'general'}
              onChange={(e) => setSearchType(e.target.value as any)}
              disabled={isLoading}
            />
            <span className="text-sm">General</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="searchType"
              value="title"
              checked={searchType === 'title'}
              onChange={(e) => setSearchType(e.target.value as any)}
              disabled={isLoading}
            />
            <span className="text-sm">Title</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="searchType"
              value="author"
              checked={searchType === 'author'}
              onChange={(e) => setSearchType(e.target.value as any)}
              disabled={isLoading}
            />
            <span className="text-sm">Author</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="searchType"
              value="category"
              checked={searchType === 'category'}
              onChange={(e) => setSearchType(e.target.value as any)}
              disabled={isLoading}
            />
            <span className="text-sm">Category</span>
          </label>
        </div>
      </div>
    </form>
  );
}
