export const load = async () => {
  const posts = import.meta.glob('./post/*.md', { eager: true });
  
  try {
    const loadedPosts = Object.entries(posts).map(([path, post]) => {
      // Extract slug from file path
      const slug = path.split('/').pop().replace('.md', '');
      
      // Ensure post has required structure
      if (!post || !post.metadata) {
        console.error('Invalid post structure:', path, post);
        return null;
      }

      return {
        slug,
        ...post.metadata
      };
    })
    .filter(post => post !== null); // Remove any invalid posts

    
    
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