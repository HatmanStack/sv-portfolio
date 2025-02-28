export async function load({ params }) {
    try {
      const post = await import(`../${params.slug}.md`);
      
      return {
        ...post.metadata,
        content: post.default
      };
    } catch (error) {
      console.error('Error loading post:', error);
      throw error;
    }
  }