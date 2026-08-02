const issue58 = {
  id: "yat-haber-58",
  title: "Yat Haber Türkiye - Sayı 58",
  description: "Denizcilik ve Yatçılık Dergisi",
  details: "Yat Haber Türkiye için hazırladığım dergi sayılarında; kapak, içindekiler, haber, röportaj ve sektörel içeriklerin sayfa tasarımlarını oluşturdum. Güçlü görselleri, dengeli tipografi ve düzenli bir grid sistemiyle bir araya getirerek denizcilik sektörüne uygun, modern ve profesyonel bir yayın dili geliştirdim.",
  note: "Dergide yer alan çoğu firma reklamları ilgili markalar veya ajanslar tarafından hazır olarak iletilmiştir. Tarafımdan hazırlanan reklam sayfası tasarımları portfolyonun Tanıtım & İletişim kategorisinde ayrıca yer almaktadır.",
  cover: "https://platform-cs-jpn3.adobe.io/rendition/id/urn:aaid:sc:AP:fde4d66f-df5b-41d9-a8a0-4be4d6d777b6;size=600",
  externalUrl: "https://www.adobe.com/files/id/urn:aaid:sc:AP:fde4d66f-df5b-41d9-a8a0-4be4d6d777b6",
  pageCount: 76
};

const netaSea81 = {
  id: "neta-sea-81",
  title: "Neta Sea - Sayı 81",
  description: "Denizcilik ve Savunma Sanayii Dergisi",
  details: "Neta Sea Sayı 81 için kapak, haber, özel dosya, röportaj ve sektörel içeriklerin sayfa tasarımlarını oluşturdum. Denizcilik ve savunma sanayii temalarını güçlü görseller, teknik bilgi hiyerarşisi, dengeli tipografi ve düzenli bir grid sistemiyle bir araya getirerek modern ve profesyonel bir yayın dili geliştirdim.",
  note: "Dergide yer alan çoğu firma reklamları ilgili markalar veya ajanslar tarafından hazır olarak iletilmiştir. Tarafımdan hazırlanan reklam sayfası tasarımları portfolyonun Tanıtım & İletişim kategorisinde ayrıca yer almaktadır.",
  cover: "assets/neta-sea-81-cover.svg",
  externalUrl: "https://www.adobe.com/files/id/urn:aaid:sc:AP:0a4955dc-a965-4b1d-80df-11053c1558ca",
  pageCount: 53
};

const extraProjects = [issue58, netaSea81];
const sourceUrl = new URL("./editorial-flipbook.js", import.meta.url);
sourceUrl.searchParams.set("v", "20260802-editorial-links-fix");

try {
  const response = await fetch(sourceUrl, { cache: "no-store" });
  if (!response.ok) throw new Error(`Flipbook kaynağı alınamadı: ${response.status}`);

  let source = await response.text();
  const marker = "\n];\n\nconst pdfPromises";

  if (!source.includes(marker)) {
    throw new Error("Editoryal proje listesi bulunamadı.");
  }

  const serializedProjects = extraProjects
    .map((project) => JSON.stringify(project, null, 2)
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n"))
    .join(",\n");

  source = source.replace(
    marker,
    `,\n${serializedProjects}\n];\n\nconst pdfPromises`
  );

  const issue59PdfLine = '    pdf: "https://at.adobe.com/KGRtwYdVTEkdCIyp",';
  const issue59ExternalLine = `${issue59PdfLine}\n    externalUrl: "https://www.adobe.com/files/id/urn:aaid:sc:AP:2a14247e-5214-4efc-9414-8cb63a5ff4f2",`;

  if (!source.includes(issue59PdfLine)) {
    throw new Error("Sayı 59 proje kaydı bulunamadı.");
  }

  source = source.replace(issue59PdfLine, issue59ExternalLine);

  source = source.replace(
    "<em>Çevirmeli dergiyi aç →</em>",
    '<em>${project.externalUrl ? "Dergiyi aç ↗" : "Çevirmeli dergiyi aç →"}</em>'
  );

  const defaultOpenBlock = `      returnToLibrary = true;
      closeLibrary(false);
      openFlipbook(project);`;

  const externalOpenBlock = `      if (project.externalUrl) {
        window.open(project.externalUrl, "_blank", "noopener,noreferrer");
        return;
      }
      returnToLibrary = true;
      closeLibrary(false);
      openFlipbook(project);`;

  if (!source.includes(defaultOpenBlock)) {
    throw new Error("Proje açılış işleyicisi bulunamadı.");
  }

  source = source.replace(defaultOpenBlock, externalOpenBlock);

  const moduleUrl = URL.createObjectURL(
    new Blob([source], { type: "text/javascript" })
  );

  try {
    await import(moduleUrl);
  } finally {
    URL.revokeObjectURL(moduleUrl);
  }
} catch (error) {
  console.error("Editoryal flipbook ek projeleri yüklenemedi:", error);
  await import(sourceUrl.href);
}
