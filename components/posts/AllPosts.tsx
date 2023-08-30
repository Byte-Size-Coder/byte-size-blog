import { IPost } from '@/models/Posts';
import PostsGrid from './PostsGrid';

import classes from './AllPosts.module.css';

interface IAllPostsProps {
	posts: IPost[];
}

const AllPosts: React.FC<IAllPostsProps> = ({ posts }) => {
	return (
		<section className={classes.posts}>
			<h1>All Posts</h1>
			<PostsGrid posts={posts} />
		</section>
	);
};

export default AllPosts;
