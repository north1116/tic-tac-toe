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
		<div className="bg-background shadow-md rounded-xl p-6 space-y-4 p-5 rounded-lg min-w-[300px]">
			<div className="text-3xl text-[#00eaff] font-bold pb-10">
				{modalHeader}
			</div>
			<div className="text-xl text-[#00eaff] font-bold pb-10">
				{modalDetail}
			</div>
			<div className="flex justify-between">
				<button
					className="
					block 
					border border-[#ff00e6] 
					px-6 py-3 
					rounded-xl 
					text-center 
					bg-[#ff00e6] text-black shadow-[0_0_10px_#ff00e6]
					hover:shadow-[0_0_20px_#ff00e6] hover:bg-[#ff54ff]
					font-semibold 
					hover:text-white
					transition-all duration-300"
					onClick={onCloseCallback}
				>
					Cancel
				</button>

					<button
						className="block 
						border border-[#ff00e6] 
						px-6 py-3 
						rounded-xl 
						text-center 
						text-[#00eaff]
						font-semibold 
						shadow-[0_0_10px_#ff00e6,0_0_20px_#ff00e6]
						hover:shadow-[0_0_20px_#ff00e6,0_0_40px_#ff00e6]
						hover:text-white
						transition-all duration-300"
						onClick={callBackFunction}
					>
						Confirm
					</button>
			</div>
		</div>
	</div>
  );
}
