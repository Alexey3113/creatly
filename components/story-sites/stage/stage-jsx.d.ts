/* StageDeck: сцена объявляет свой переход пропом transition на корневом <div> сцены
   (zoom | wipe-x | wipe-y | iris | smash | drop | cut); дек снимает его через cloneElement до рендера в DOM. */
import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    transition?: string;
  }
}
