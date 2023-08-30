import React from 'react';
import PostsGrid from '../posts/PostsGrid';
import { IPost } from '@/models/Posts';

import classes from './FeaturedPosts.module.css';

interface IFeaturedPostsProps {
	posts: IPost[];
}

const FeaturedPosts: React.FC<IFeaturedPostsProps> = ({ posts }) => {
	return (
		<section className={classes.latest}>
			<h2>Featured Posts</h2>
			<PostsGrid posts={posts} />
		</section>
	);
};

export default FeaturedPosts;
