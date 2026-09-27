/* Веб-шрифты через runtime <link rel="stylesheet"> в React-дереве: React 19 / Next 16 поднимает их в <head>
   и дедуплицирует, а бандлер их не трогает. CSS-@import шрифтов НЕ использовать: Turbopack выбрасывает
   @import, оказавшийся не в начале склеенного чанка, и страницы молча падают на Times/system-ui. */
export function FontLinks({ hrefs }: { hrefs: string[] }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {hrefs.map((h) => (
        <link key={h} rel="stylesheet" href={h} />
      ))}
    </>
  );
}
