import { useLocation } from 'react-router-dom';

interface IProps {
	error?: IError;
}

interface IError {
	message: string;
	details: string;
}

export default function ErrorPage(props: IProps) {
	const { state } = useLocation();
	const error: IError = props.error || state;

	return (
		<div>
			<div>{error.message}</div>
			<div>{error.details}</div>
		</div>
	);
}
