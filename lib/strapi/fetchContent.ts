// export const STRAPI_HOST = process.env.STRAPI_HOST || "http://localhost:1337";
export const STRAPI_HOST = process.env.STRAPI_HOST;
// @TODO replace with remote URL

export default async function fetchContent(path: string, sort: string = null) {
  console.log("fetching", STRAPI_HOST, path);
  try {
    const fullPath = `/api/${path}`;
    const url = new URL(fullPath, STRAPI_HOST);

    // populate content with all data (images, media, nested relational data, etc.)
    url.searchParams.set("populate", "*");

    url.searchParams.set("pagination[pageSize]", "50");

    if (sort) {
      url.searchParams.set("sort", sort);
    }

    const result = await fetch(url, {
      headers: {
        Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    return result.json();
  } catch (error) {
    console.log("Failed to fetchContent for path: ", path);
    throw error;
  }
}
