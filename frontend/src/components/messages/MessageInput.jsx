import { BsSend } from "react-icons/bs";

const MessageInput = () => {
	return (
		<form className='px-4 my-3'>
			<div className='relative w-full'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white focus:outline-none'
					placeholder='Send a message'
				/>
				<button
					type='submit'
					className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-300 hover:text-blue-500'
				>
					<BsSend size={18} />
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
