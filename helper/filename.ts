export const getFileIcon = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "pdf":
      return "picture_as_pdf";

    case "doc":
    case "docx":
      return "description";

    case "ppt":
    case "pptx":
      return "slideshow";

    case "txt":
      return "article";

    case "md":
      return "code";

    case "csv":
      return "table_chart";

    case "html":
      return "html";

    case "epub":
      return "menu_book";

    case "jpg":
    case "jpeg":
    case "png":
      return "image";

    default:
      return "draft";
  }
};