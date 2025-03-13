import clsx from 'clsx';

type BoundedProps = {
  children: React.ReactNode;
  className?: string;
};
/**
 * A functional component that wraps its children in a div with specific classes for styling.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the div.
 * @param {string} [props.className] - Additional class names to apply to the div.
 *
 * @returns {JSX.Element} A div element containing the children with the specified classes.
 */
export default function Bounded({ children, className }: BoundedProps): JSX.Element {
  return <div className={clsx('relative h-full max-h-screen overflow-hidden', className)}>{children}</div>;
}
