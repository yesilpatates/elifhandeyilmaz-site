const issue58 = {
  id: "yat-haber-58",
  title: "Yat Haber Türkiye - Sayı 58",
  description: "Denizcilik ve Yatçılık Dergisi",
  details: "Yat Haber Türkiye için hazırladığım dergi sayılarında; kapak, içindekiler, haber, röportaj ve sektörel içeriklerin sayfa tasarımlarını oluşturdum. Güçlü görselleri, dengeli tipografi ve düzenli bir grid sistemiyle bir araya getirerek denizcilik sektörüne uygun, modern ve profesyonel bir yayın dili geliştirdim.",
  note: "Dergide yer alan çoğu firma reklamları ilgili markalar veya ajanslar tarafından hazır olarak iletilmiştir. Tarafımdan hazırlanan reklam sayfası tasarımları portfolyonun Tanıtım & İletişim kategorisinde ayrıca yer almaktadır.",
  cover: "https://platform-cs-jpn3.adobe.io/rendition/id/urn:aaid:sc:AP:fde4d66f-df5b-41d9-a8a0-4be4d6d777b6;size=600",
  pdf: "https://platform-cs-jpn3.adobe.io/content/storage/id/urn:aaid:sc:AP:fde4d66f-df5b-41d9-a8a0-4be4d6d777b6",
  pageCount: 76
};

const sourceUrl = new URL("./editorial-flipbook.js", import.meta.url);
sourceUrl.searchParams.set("v", "20260802-issue58");

try {
  const response = await fetch(sourceUrl, { cache: "no-store" });
  if (!response.ok) throw new Error(`Flipbook kaynağı alınamadı: ${response.status}`);

  let source = await response.text();
  const marker = "\n];\n\nconst pdfPromises";

  if (!source.includes(marker)) {
    throw new Error("Editoryal proje listesi bulunamadı.");
  }

  const serializedProject = JSON.stringify(issue58, null, 2)
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");

  source = source.replace(
    marker,
    `,\n${serializedProject}\n];\n\nconst pdfPromises`
  );

  const moduleUrl = URL.createObjectURL(
    new Blob([source], { type: "text/javascript" })
  );

  try {
    await import(moduleUrl);
  } finally {
    URL.revokeObjectURL(moduleUrl);
  }
} catch (error) {
  console.error("Sayı 58 editoryal flipbook yüklenemedi:", error);
  await import(sourceUrl.href);
}
