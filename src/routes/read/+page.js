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

        return {
          slug,
          ...metadata
        };
      })
      .filter(/** @param {any} post */ (post) => post !== null) // Remove any invalid posts
      .sort(/** @param {any} a */ /** @param {any} b */ (a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
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