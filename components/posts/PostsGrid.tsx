import PostItem from './PostItem';
import { IPost } from '@/models/Posts';

import classes from './PostsGrid.module.css';

interface IPostsGridProps {
	posts: IPost[];
}

const PostGrid: React.FC<IPostsGridProps> = ({ posts }) => {
	return (
		<ul className={classes.grid}>
			{posts.map((post) => (
				<PostItem key={post.slug} post={post} />
			))}
		</ul>
	);
};

export default PostGrid;
