'use client';

import { useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { Chip } from '@heroui/chip';
const SAMPLE_TAGS = ['work', 'personal', 'ideas', 'todo', 'learning'];

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export default function TagSelector({
  selectedTags,
  onTagsChange,
}: TagSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on input. Autocomplete
  const suggestions = SAMPLE_TAGS.filter(
    (tag) =>
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const addTag = (tag: string) => {
    if (tag.trim() && !selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag.trim()]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-sm font-medium text-gray-500 dark:text-gray-400'>
        Tags
      </div>

      {/* Selected Tags */}
      <div className='flex flex-wrap gap-2'>
        {selectedTags.map((tag) => (
          <Chip key={tag} color='primary' radius='sm' onClose={() => removeTag(tag)}>
            #{tag}
          </Chip>
        ))}
      </div>

      {/* Tag Input */}
      <div className='relative'>
        <div className='flex items-center rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700'>
          <span className='text-gray-400'>#</span>
          <input
            className='ml-1 flex-grow border-none bg-transparent outline-none focus:ring-0'
            placeholder='Add tags...'
            type='text'
            value={inputValue}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue) {
                e.preventDefault();
                addTag(inputValue);
              }
            }}
          />
          {inputValue && (
            <button
              className='text-blue-500 hover:text-blue-700'
              onClick={() => addTag(inputValue)}
            >
              <IoAdd size={20} />
            </button>
          )}
        </div>

        {/* Tag Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className='absolute left-0 right-0 z-10 mt-1 flex flex-col overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800'>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                className='cursor-pointer border-none bg-transparent px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700'
                onClick={() => addTag(suggestion)}
              >
                #{suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
