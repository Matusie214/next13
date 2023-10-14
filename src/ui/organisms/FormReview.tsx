"use client";
import {
	type FC,
	useState,
	experimental_useOptimistic as useOptimistic,
} from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { submitReviewAction } from "@/app/cart/actions";

type FormReviewProps = {
	productId: string;
};

export const FormReview: FC<FormReviewProps> = ({ productId }) => {
	const formStatus = useFormStatus();
	const submitReviewActionWithID = submitReviewAction.bind(
		null,
		productId,
	);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [rating, setRating] = useState(5);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");

	const [_optimisticFormData, setOptimisticFormData] = useOptimistic({
		title: title,
		content: content,
		rating: rating,
		username: username,
		email: email,
	});

	return (
		<section className="flex flex-col items-center gap-4">
			<h3 className="mb-4 mt-4 text-lg font-bold text-slate-800">
				Add a review
			</h3>
			<form
				data-testid="add-review-form"
				className="flex w-full flex-col items-center gap-2 md:w-1/2"
				action={async (productId) => {
					setOptimisticFormData({
						title: title,
						content: content,
						rating: rating,
						username: username,
						email: email,
					});
					await submitReviewActionWithID(productId);
				}}
			>
				<input
					onChange={(e) => setTitle(e.currentTarget.value)}
					className="h-12 w-full rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="text"
					placeholder="Title"
					name="headline"
				/>
				<input
					onChange={(e) => setContent(e.currentTarget.value)}
					className="h-12 w-full rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="text"
					placeholder="Content"
					name="content"
				/>
				<select
					onChange={(e) => setRating(Number(e.currentTarget.value))}
					value={rating}
					name="rating"
					id="rating"
					className="h-12 w-full rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
				>
					<option value="5">5</option>
					<option value="4">4</option>
					<option value="3">3</option>
					<option value="2">2</option>
					<option value="1">1</option>
				</select>
				<input
					onChange={(e) => setUsername(e.currentTarget.value)}
					className="h-12 w-full rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="text"
					placeholder="User name"
					name="name"
				/>
				<input
					onChange={(e) => setEmail(e.currentTarget.value)}
					className="h-12 w-full rounded-sm border-2 border-solid border-slate-100 bg-slate-50 pl-4"
					type="email"
					placeholder="Email"
					name="email"
				/>
				<button
					type="submit"
					disabled={formStatus.pending}
					className="h-10 w-full cursor-pointer rounded-sm bg-blue-500 text-slate-50 hover:opacity-90 md:w-36"
				>
					Submit
				</button>
			</form>
		</section>
	);
};
