const checkExtension = (filename) => {
  const EXTENSIONS = ["js", "html", "css", "txt", "json"];

  const ext = filename.split(".");
  const extensions = ext[ext.length - 1];

  const result = EXTENSIONS.includes(extensions);

  return (obj = {
    result,
    extensions,
  });
};

module.exports = checkExtension;
