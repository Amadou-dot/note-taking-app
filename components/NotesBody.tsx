import clsx from 'clsx';

type NotesBodyProps = {
  className?: string;
};
export default function NotesBody({ className }: NotesBodyProps) {
  return <div className={clsx(className)}>NotesBody</div>;
}
