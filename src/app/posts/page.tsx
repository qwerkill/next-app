'use client';

import PostsListComponent from "@/components/post/PostsListComponent";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const fetchAllPosts = async () => {
    const response = await fetch('http://localhost:3000/api/posts');
    const resJson = await response.json();
    return resJson.data;
}

const PostsListPage = () => {
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const posts = await fetchAllPosts();
            setPostsList(posts);
        };
        fetchData();
    }, []);

    return (
        <Container>
            {postsList.length === 0 && <Typography>No posts found</Typography>}
            
            <Link href="http://localhost:3000/posts/create" passHref>
                <Button variant="contained" color="primary">
                    Creer un Post
                </Button>
            </Link>

            {postsList.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="h1">Post List Hybride</Typography>
                    <PostsListComponent />
                </Box>
            )}
        </Container>
    );
};

export default PostsListPage;
