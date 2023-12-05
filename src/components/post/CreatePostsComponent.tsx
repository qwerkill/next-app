'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ICategories, IPost } from '@/types';

const CreatePostsComponent = () => {
    const [creadential, setCreadentials] = useState({}as IPost);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({} as ICategories);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const fetchAllCategories = async () => {
        const response = await fetch('http://localhost:3000/api/categories');
        const data = await response.json();
        setCategories(data.data);
    }

    const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...creadential,
                categoryId: creadential.categoryId,
                category: {
                    ...newCategory,
                    name: newCategory.name,
                }
            }),
        });
        const data = await response.json();
        console.log(data);
        window.location.href = 'http://localhost:3000/';
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCreadentials({
            ...creadential,
            [e.target.name]: e.target.value
        });
    }

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        setCreadentials({
            ...creadential,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Container>
            <Typography variant="h2">Create post</Typography>
            <form onSubmit={handelSubmit}>
                <div>
                    <TextField
                        label="Title"
                        type="text"
                        name="title"
                        onChange={handelChange}
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label="Content"
                        type="text"
                        name="content"
                        onChange={handelChange}
                        fullWidth
                        margin="normal"
                    />
                </div>
                
                    <div>
                        <TextField
                            label="Category"
                            type="text"
                            name={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                    </div>
              
                    <div>
                        <FormControl fullWidth margin="normal">
                            <InputLabel htmlFor="categoryId">Category</InputLabel>
                            <Select
                                label="Category"
                                value={creadential.categoryId || ''}
                                onChange={handleSelectChange}
                            >
                                {categories.map((category: any) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                
                <Button type="submit" variant="contained" color="primary">
                    Create
                </Button>
                <Link href="http://localhost:3000/" passHref>
                    <Button variant="contained" color="secondary">
                        Annuler
                    </Button>
                </Link>
            </form>
        </Container>
    );
}

export default CreatePostsComponent;
