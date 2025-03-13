/**
 * Function to strip HTML tags and get a plain text preview
 * @param html a string of HTML content
 * @param maxLength the maximum length of the text preview
 * @returns a string of plain text preview
 */
export const getTextPreview = (
  html: string,
  maxLength: number = 100,
): string => {
  // Create a temporary element to parse HTML
  const tempDiv = document.createElement('div');

  tempDiv.innerHTML = html;

  // Get text content and truncate
  let text = tempDiv.textContent || tempDiv.innerText || '';

  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }

  return text;
};
