'use client'

import { IPost } from "@/types";
import { useEffect, useState } from "react";

const PostsListComponent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchAllPosts();
    }, [])

    const fetchAllPosts = async () => {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data.data);
    }

    return ( 
        <div>
            <h2>List post</h2>

            {posts.map((post: IPost) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
     );
}
 
export default PostsListComponent;