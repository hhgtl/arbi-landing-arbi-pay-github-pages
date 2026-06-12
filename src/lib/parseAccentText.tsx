import { type ReactNode } from "react";

const ACCENT_PATTERN = /\/accent\/([^/]*?)\/accent\//g;

export const parseAccentText = (
  text: string,
  gradientClassName: string,
): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(ACCENT_PATTERN)) {
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    nodes.push(
      <span key={matchIndex} className={gradientClassName}>
        {match[1]}
      </span>,
    );

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
};

export const applyAccentSpansToHtml = (
  html: string,
  accentClassName: string,
): string =>
  html.replace(
    /\/accent\/([^/]*?)\/accent\//g,
    `<span class="${accentClassName}">$1</span>`,
  );

const escapeHtmlAttribute = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const applyLinkSpansToHtml = (
  html: string,
  linkClassName: string,
  resolveHref: (linkText: string) => string,
): string =>
  html.replace(/\/link\/([^/]*?)\/link\//g, (_match, linkText: string) => {
    const href = escapeHtmlAttribute(resolveHref(linkText));
    return `<a href="${href}" class="${linkClassName}">${linkText}</a>`;
  });
