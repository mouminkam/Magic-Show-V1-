export async function getBlogPostWithAxios(serverAxios, postId) {
  try {
    const { data } = await serverAxios.get(`/blog/posts/${postId}`);
    if (data?.success && data?.data) {
      const d = data.data;
      return {
        id: d.id,
        title: d.title,
        content: d.content ?? "",
        image: d.image ?? "/images/img24.jpg",
        date: d.date ?? "",
      };
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 404) return null;
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogCommentsWithAxios(serverAxios, postId) {
  try {
    const { data } = await serverAxios.get(`/blog/posts/${postId}/comments`);
    if (data?.success && Array.isArray(data.data)) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    return [];
  }
}
