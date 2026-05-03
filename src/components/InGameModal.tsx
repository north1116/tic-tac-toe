'use client';

type Prop = {
	modalHeader: string
	modalDetail: string
	onCloseCallback: () => void
	callBackFunction: () => void
}

export default function InGameModal({modalHeader, modalDetail, onCloseCallback, callBackFunction}: Prop) {
  return (
	<div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-[1000]">
		<div className="bg-white p-5 rounded-lg min-w-[300px]">
			<div className="text-3xl font-bold pb-10">
				{modalHeader}
			</div>
			<div className="text-xl font-bold pb-10">
				{modalDetail}
			</div>
			<div className="flex justify-between">
				<button
					className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
					onClick={onCloseCallback}
				>
					Cancel
				</button>

					<button
						className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
						onClick={callBackFunction}
					>
						Confirm
					</button>
			</div>
		</div>
	</div>
  );
}
