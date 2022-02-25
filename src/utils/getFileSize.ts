const SUFFIX = ["B", "KB", "MB", "GB", "TB"];

export const getFileSize = (size: number) => {
  const index = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, index)).toFixed(2) + "" + SUFFIX[index];
};
