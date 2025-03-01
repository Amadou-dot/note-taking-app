import { Input } from '@heroui/input';
import clsx from 'clsx';
import { IoSearchOutline } from 'react-icons/io5';

type SearchBarProps = {
  className?: string;
  onValueChange?: (value: string) => void;
  value?: string;
};
export default function SearchBar({
  className,
  onValueChange,
  value,
}: SearchBarProps) {
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
