import React from 'react';
import Image from 'next/image';

import classes from './Banner.module.css';

const Banner: React.FC = () => {
	return (
		<section className={classes.banner}>
			<div className={classes.image}>
				<Image src="/images/site/matt.png" alt="Matthew Douglas" width={300} height={300} />
			</div>
			<h1>Hello, I am Matthew Douglas</h1>
			<p>
				This is where I will share my knowledge and experience from the web and game
				development world!
			</p>
		</section>
	);
};

export default Banner;
