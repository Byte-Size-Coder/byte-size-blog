import ContactForm from '@/components/contact/ContactForm';
import Head from 'next/head';
import React from 'react';

const ContactPage: React.FC = () => {
	return (
		<>
			<Head>
				<title>Contact Me</title>
			</Head>
			<ContactForm />
		</>
	);
};

export default ContactPage;
