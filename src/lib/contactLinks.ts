export const githubUrl: string = "https://github.com/echoshihtw";
export const linkedInUrl: string = "https://www.linkedin.com/in/echoshihtw/";
export const instagramUrl =
  "https://www.instagram.com/echothecho?igsh=MW5sbXVycnFvMnpreQ==";
export const email: string = "mailto:echoshihtw@gmail.com";
export const codePen: string = "https://codepen.io/echochunyushih";
export const calendlyUrl: string =
  "https://calendly.com/echoshihtw/new-meeting";

/**
 * A mailto carrying its subject, so a message says which call to action it
 * came through before it is opened. The address is passed in rather than
 * read from here: the content config owns which address a given surface
 * uses, this module owns the URL shape. Two callers, the hero and each of
 * the close's two doors, and they were building it separately.
 */
export function mailtoWithSubject(address: string, subject: string): string {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`;
}
