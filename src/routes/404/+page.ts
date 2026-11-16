export const prerender = true;
// The 404 page must prerender to 404.html (not 404/index.html) so static
// hosts serve it for unknown paths — override the layout's trailingSlash.
export const trailingSlash = 'never';
