import Link from 'next/link';
import Image from 'next/image';
import { IPost } from '@/models/Posts';

import classes from './PostItem.module.css';

interface IPostItemProps {
	post: IPost;
}

const PostItem: React.FC<IPostItemProps> = ({ post }) => {
	const { title, image, excerpt, date, slug } = post;

	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	const imagePath = `/images/posts/${slug}/${image}`;
	const linkPath = `/posts/${slug}`;

	return (
		<li className={classes.post}>
			<Link href={linkPath}>
				<div className={classes.image}>
					<Image src={imagePath} alt={title} width={300} height={200} />
				</div>
				<div className={classes.content}>
					<h3>{title}</h3>
					<time>{formattedDate}</time>
					<p>{excerpt}</p>
				</div>
			</Link>
		</li>
	);
};

export default PostItem;
