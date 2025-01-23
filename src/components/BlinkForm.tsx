import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

interface FormData {
  channelName: string;
  description: string;
  fee: string;
  publicKey: string;
  coverImage: string;
}

interface BlinkFormProps {
  onClose: () => void;
}

export function BlinkForm({ onClose }: BlinkFormProps) {
  const [formData, setFormData] = useState<FormData>({
    channelName: '',
    description: '',
    fee: '',
    publicKey: '',
    coverImage: '',
  });

  const [apiLink, setApiLink] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const requestData = {
      channelName: formData.channelName,
      description: formData.description,
      fee: parseFloat(formData.fee),
      publicKey: formData.publicKey,
      coverImage: formData.coverImage,
    };

    try {
      const response = await fetch('https://blink-back.onrender.com/api/blink/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        const generatedLink = `${window.location.origin}/api/${data.channelName}`;
        setApiLink(generatedLink);
        setIsPopupVisible(true);
        onClose();
      } else {
        setError('Failed to create blink. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 bg-black/90 rounded-2xl border border-violet-500/30 backdrop-blur-sm max-w-xl w-full mx-auto"
      >
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Generate Blink
          </h2>
          <p className="mt-2 text-sm text-gray-400">Create your Telegram group Blink</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
            <AlertCircle size={18} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Channel Name</label>
            <input
              type="text"
              name="channelName"
              value={formData.channelName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              placeholder="Enter channel name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200 min-h-[100px]"
              placeholder="Enter channel description"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Fee (in tokens)</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              placeholder="Enter fee amount"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Public Key</label>
            <input
              type="text"
              name="publicKey"
              value={formData.publicKey}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              placeholder="Enter public key"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              placeholder="Enter cover image URL"
            />
            {formData.coverImage && (
              <div className="mt-2 relative w-full h-40 rounded-xl overflow-hidden">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-white border border-violet-500/50 hover:bg-violet-500/20 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? 'Generating...' : 'Generate Blink'}
          </button>
        </div>
      </form>

      {isPopupVisible && apiLink && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50">
          <div className="bg-black/90 p-8 rounded-xl space-y-4 max-w-lg mx-auto border border-violet-500/30">
            <h3 className="text-xl font-semibold text-white">Your Blink was created!</h3>
            <p className="text-sm text-gray-300">Here is the link to your Blink:</p>
            <p className="text-lg text-violet-400 font-medium break-words p-4 bg-violet-500/10 rounded-lg">{apiLink}</p>
            <button
              onClick={() => {
                if (apiLink) {
                  const tweetUrl = `https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20Blink%20channel%20at%20${encodeURIComponent(apiLink)}`;
                  window.open(tweetUrl, '_blank');
                }
              }}
              className="mt-4 px-6 py-2.5 w-full rounded-xl text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 transition-all duration-200"
            >
              Share on X (Twitter)
            </button>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="mt-4 px-6 py-2.5 w-full rounded-xl text-white border border-violet-500/50 hover:bg-violet-500/20 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
