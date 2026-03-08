"use client";

import { type ComponentProps, type MouseEvent, useCallback } from "react";
import { Link as IntlLink } from "@/i18n/navigation";
import { useTransitionRouter } from "next-view-transitions";

type Props = ComponentProps<typeof IntlLink>;

export function TransitionLink({ onClick, ...props }: Props) {
  const router = useTransitionRouter();

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick?.(e as never);
      const href = e.currentTarget.getAttribute("href") || "/";
      router.push(href);
    },
    [router, onClick]
  );

  return <IntlLink {...props} onClick={handleClick} />;
}
