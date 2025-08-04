// Blog posts metadata - add your posts here
const blogPosts = [
    {
        filename: "post2.md",
        title: "On batching in ML",
        subtitle: "How do computers process batched data in ML?",
        date: "2025-07-30"
    },
    {
        filename: "post1.md",
        title: "Placeholder",
        subtitle: "Slop written by Claude, don't read :)",
        date: "2025-01-25"
    }
];

// Sort posts by date (newest first)
blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Display blog posts on homepage
function displayBlogPosts() {
    const container = document.getElementById('blog-posts');
    if (!container) return;
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('a');
        postElement.href = `blog-template.html?post=${post.filename}`;
        postElement.className = 'blog-post-preview';
        
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="date">${formatDate(post.date)}</div>
            <div class="subtitle">${post.subtitle}</div>
        `;
        
        container.appendChild(postElement);
    });
}

// Format date nicely
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Run when page loads
document.addEventListener('DOMContentLoaded', displayBlogPosts);
