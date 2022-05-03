export const getElementTag = (item) => {
  const TagName = 'srcset' in item ? 'source' : 'img';
  return <TagName {...item} />;
};
