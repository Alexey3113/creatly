import { SiteMenuFab } from "@/components/shared/SiteMenu";

// кнопка «Все сайты» на страницах самих сайтов (у галерей — полоса меню, там кнопка скрыта)
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteMenuFab />
    </>
  );
}
