'use client';

import { IPost } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const PostsListComponent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const fetchAllPosts = async () => {
        const response = await fetch('http://localhost:3000/api/posts');
        const data = await response.json();
        setPosts(data.data);
    }

    const handelDelete = async (id: number) => {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        fetchAllPosts();
    }

    return (
        <Container>
            <Typography variant="h2">List post</Typography>

            {posts.map((post: IPost) => (
                <Box key={post.id} sx={{ marginBottom: 2 }}>
                    <Typography variant="h4">{post.title}</Typography>
                    <Button variant="contained" color="secondary" onClick={() => handelDelete(post.id)}>
                        Supprimez le post
                    </Button>
                    <Link href={`http://localhost:3000/posts/${post.id}`} passHref>
                        <Button variant="contained" color="primary" component="a" sx={{ marginLeft: 2 }}>
                            Voir le post
                        </Button>
                    </Link>
                </Box>
            ))}

            <Link href="http://localhost:3000/posts/create" passHref>
                <Button variant="contained" color="primary">
                    Creer un Post
                </Button>
            </Link>
        </Container>
    );
}

export default PostsListComponent;
