import { Input } from '@heroui/input';
import clsx from 'clsx';
import { IoSearchOutline } from 'react-icons/io5';

type SearchBarProps = {
  className?: string;
  onValueChange?: (value: string) => void;
  value?: string;
};
/**
 * SearchBar component renders an input field for searching notes by title, content, or tags.
 *
 * @param {string} className - Additional CSS classes to apply to the input field.
 * @param {(value: string) => void} onValueChange - Callback function to handle changes in the input value.
 * @param {string} value - The current value of the input field.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
export default function SearchBar({
  className,
  onValueChange,
  value,
}: SearchBarProps): JSX.Element {
  return (
    <Input
      className={clsx('w-72', className)}
      placeholder='Search by title, content, or tags'
      radius='sm'
      startContent={<IoSearchOutline size={20} />}
      value={value}
      variant='bordered'
      onValueChange={onValueChange}
    />
  );
}
