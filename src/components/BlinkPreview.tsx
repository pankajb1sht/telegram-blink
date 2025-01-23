interface BlinkPreviewProps {
  blink: any;
  onClose: () => void;
}

export function BlinkPreview({ blink, onClose }: BlinkPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="max-w-md w-full bg-black/90 rounded-2xl border border-violet-500/30 shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              {blink.channelName}
            </h2>
            <p className="text-sm text-gray-400 mt-2">{blink.description}</p>
          </div>

          {blink.coverImage && (
            <div className="mb-4 rounded-xl overflow-hidden">
              <img
                src={blink.coverImage}
                alt="Cover preview"
                className="w-full h-48 object-cover transition-transform hover:scale-105 duration-300"
              />
            </div>
          )}

          <div className="space-y-2 mb-4 bg-white/5 rounded-xl p-4">
            <div className="flex justify-between">
              <span className="text-gray-300">Fee:</span>
              <span className="font-semibold text-violet-400">{blink.fee} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Public Key:</span>
              <span className="text-sm truncate max-w-[200px]">{blink.publicKey}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Route:</span>
              <a 
                href={blink.route} 
                className="text-fuchsia-400 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {"https://blink-back.onrender.com${data.route}"}
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-8 py-2 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
