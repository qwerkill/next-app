import PostsListComponent from "@/components/post/PostsListComponent";
import { IPost } from "@/types";
import React from "react";

const fetchAllPosts = async () => {
    const response = await fetch('http://localhost:3000/api/posts');
    const resJson = await response.json();
    return resJson.data;
}

export default async function PostsListPage() {
    
        const postsList = await fetchAllPosts();

        
    return (
            <div>
            {postsList.length === 0 && <div>No posts found</div>}
            <div>
                <h1>Post List Hybride</h1>
                <PostsListComponent/>
            </div>
        </div>
    )
}