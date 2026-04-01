export const flattenContent = (obj: unknown): string => {
  const result = '';

  if (!obj) return result;

  // strings
  if (typeof obj === 'string') {
    return obj;
  }

  // arrays (blocks, lexical nodes, etc.)
  if (Array.isArray(obj)) {
    return obj.map(flattenContent).join(' ');
  }

  // objects (rich text, tables, nested fields)
  if (typeof obj === 'object') {
    return Object.values(obj)
      .map(flattenContent)
      .join(' ');
  }

  return result;
}; 