import { useState } from 'react';
import classes from './ContactForm.module.css';
import { send } from '@emailjs/browser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IContactFormErrors {
	email: string;
	name: string;
	message: string;
}

const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const ContactForm: React.FC = () => {
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [errors, setErrors] = useState<IContactFormErrors>({
		email: '',
		name: '',
		message: '',
	});

	const [loading, setLoading] = useState<boolean>(false);

	const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		const emailValue = event.target.value;

		const newErrors = { ...errors };

		if (emailValue.trim() === '') {
			newErrors.email = 'email is required';
		} else if (!email.match(mailformat)) {
			newErrors.email = 'must be valid email';
		} else {
			newErrors.email = '';
		}

		setErrors(newErrors);

		setEmail(emailValue);
	};

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nameValue = event.target.value;

		const newErrors = { ...errors };

		if (nameValue.trim() === '') {
			newErrors.name = 'name is require';
		} else {
			newErrors.name = '';
		}

		setErrors(newErrors);
		setName(nameValue);
	};

	const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const messageValue = event.target.value;

		const newErrors = { ...errors };

		if (messageValue.trim() === '') {
			newErrors.message = 'name is require';
		} else {
			newErrors.message = '';
		}

		setErrors(newErrors);
		setMessage(messageValue);
	};

	const sendMessageHandler = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();

		let newErrors = { ...errors };
		newErrors.email = '';
		newErrors.name = '';
		newErrors.message = '';
		let hasErrors = false;

		if (email.trim() === '') {
			newErrors.email = 'email is required';
			hasErrors = true;
		} else if (!email.match(mailformat)) {
			newErrors.email = 'must be valid email';
			hasErrors = true;
		}

		if (name.trim() === '') {
			newErrors.name = 'name is required';
			hasErrors = true;
		}

		if (message.trim() === '') {
			newErrors.message = 'message is required';
			hasErrors = true;
		}

		setErrors({ ...newErrors });
		if (hasErrors) {
			return;
		}

		const newMessage = {
			email,
			name,
			message,
		};

		try {
			setLoading(true);
			await send(
				process.env.emailServiceId!,
				process.env.emailTemplateId!,
				newMessage,
				process.env.emailPublicKey!
			);

			setLoading(false);

			toast.success('Message sent!', {
				position: 'bottom-center',
				autoClose: 3000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				theme: 'colored',
			});
		} catch (error: any) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<section className={classes.contact}>
			<h1>How can I help you?</h1>
			<p>Feel free to reach out to connect!</p>
			<form className={classes.form}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="email">Your Email</label>
						<input
							type="email"
							id="email"
							required
							value={email}
							onChange={handleChangeEmail}
							className={errors.email !== '' ? classes.controlError : ''}
						/>
						{errors.email !== '' && (
							<span className={classes.error}>{errors.email}</span>
						)}
					</div>
					<div className={classes.control}>
						<label htmlFor="name">Your Name</label>
						<input
							type="text"
							id="name"
							required
							value={name}
							onChange={handleChangeName}
							className={errors.name !== '' ? classes.controlError : ''}
						/>
						{errors.name !== '' && <span className={classes.error}>{errors.name}</span>}
					</div>
				</div>
				<div className={classes.control}>
					<label htmlFor="message">Your Message</label>
					<textarea
						rows={5}
						id="message"
						required
						value={message}
						onChange={handleChangeMessage}
						className={errors.message !== '' ? classes.controlError : ''}
					></textarea>
					{errors.message !== '' && (
						<span className={classes.error}>{errors.message}</span>
					)}
				</div>
				<div className={classes.actions}>
					{loading ? (
						<span className={classes.loader}></span>
					) : (
						<button onClick={sendMessageHandler}>Send Message</button>
					)}
				</div>
			</form>
			<ToastContainer
				position="bottom-center"
				autoClose={3000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="light"
			/>
		</section>
	);
};

export default ContactForm;
