import AllPosts from '@/components/posts/AllPosts';
import { getAllPosts } from '@/lib/posts-util';
import { IPost } from '@/models/Posts';
import Head from 'next/head';

interface IAllPostPageProps {
	posts: IPost[];
}

const AllPostsPage: React.FC<IAllPostPageProps> = ({ posts }) => {
	return (
		<>
			<Head>
				<title>All Posts</title>
			</Head>
			<AllPosts posts={posts} />
		</>
	);
};

export function getStaticProps() {
	const allPosts = getAllPosts();

	return {
		props: {
			posts: allPosts,
		},
	};
}

export default AllPostsPage;
