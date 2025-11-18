export const load = async () => {
  const posts = import.meta.glob('./post/*.md', { eager: true });

  try {
    const loadedPosts = Object.entries(posts)
      .map(([path, post]) => {
        // Extract slug from file path
        const slug = path.split('/').pop()?.replace('.md', '') || '';

        // Ensure post has required structure
        if (!post || typeof post !== 'object' || !('metadata' in post) || !post.metadata) {
          console.error('Invalid post structure:', path, post);
          return null;
        }

        // Explicitly cast metadata to include all properties
        const metadata = /** @type {any} */ (post.metadata);

        // Spread metadata first, then slug to ensure extracted slug always wins
        return {
          ...metadata,
          slug
        };
      })
      .filter(/** @param {any} post */ (post) => post !== null) // Remove any invalid posts
      .sort(/** @param {any} a */ /** @param {any} b */ (a, b) => {
        // Parse dates and validate to prevent NaN in comparison
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
        const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();
        return timeB - timeA;
      });


    return {
      posts: loadedPosts
    };
  } catch (error) {
    console.error('Error loading posts:', error);
    return {
      posts: []
    };
  }
};