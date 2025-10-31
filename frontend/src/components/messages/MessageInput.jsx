import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage.js";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		await sendMessage(message);
		if (!message) return;
		setMessage("");
	}

	return (
		<form
			className='px-4 my-3'
			onSubmit={handleSubmit}
		>
			<div className='relative w-full'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white focus:outline-none'
					placeholder='Send a message'
					value={message}
					onChange={(e)=>setMessage(e.target.value)}
				/>
				<button
					type='submit'
					className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-blue-500'
				>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
