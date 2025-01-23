import React, { useState } from 'react';
import { Upload, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';

interface FormData {
  channelName: string;
  description: string;
  fee: string;
  publicKey: string;
  coverImage: string;
  telegramLink: string;
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
    telegramLink: '',
  });

  const [apiLink, setApiLink] = useState<string | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const requestData = {
      channelName: formData.channelName,
      description: formData.description,
      fee: parseFloat(formData.fee),
      publicKey: formData.publicKey,
      coverImage: formData.coverImage || 'https://example.com/default-icon.png',
      telegramLink: formData.telegramLink,
    };

    try {
      const response = await fetch('https://blink-back.onrender.com/api/blink/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Action-Version': '1',
          'X-Blockchain-Ids': 'solana'
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setApiLink(data.route);
        setIsPopupVisible(true);
        onClose();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create blink. Please try again.');
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

  const handleCopyLink = async () => {
    if (apiLink) {
      try {
        await navigator.clipboard.writeText(`https://blink-back.onrender.com${apiLink}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleTestApi = async () => {
    if (apiLink) {
      try {
        const response = await fetch(`https://blink-back.onrender.com${apiLink}`, {
          headers: {
            'X-Action-Version': '1',
            'X-Blockchain-Ids': 'solana'
          }
        });
        if (!response.ok) {
          throw new Error('API test failed');
        }
      } catch (err) {
        setError('Failed to test API endpoint');
      }
    }
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">Telegram Link</label>
            <input
              type="text"
              name="telegramLink"
              value={formData.telegramLink}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-violet-500/30 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all duration-200"
              placeholder="Enter Telegram link"
              required
            />
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
          <div className="bg-black/90 p-8 rounded-2xl space-y-6 max-w-lg w-full mx-auto border border-violet-500/30">
            <div className="text-center">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Your Blink is Ready!
              </h3>
              <p className="mt-2 text-sm text-gray-400">Use this API endpoint to integrate with Solana Actions</p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">API Endpoint</label>
              <div className="relative flex items-center">
                <code className="block w-full text-sm text-white bg-white/5 p-4 rounded-xl border border-violet-500/30">
                  https://blink-back.onrender.com{apiLink}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="absolute right-3 p-2 text-gray-400 hover:text-white transition-colors"
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 p-4 rounded-xl">
                <AlertCircle size={18} className="text-violet-400" />
                <p>
                  Make sure to include these headers in your requests:
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <code className="text-violet-400">X-Action-Version</code>
                  <code className="text-gray-400">1</code>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                  <code className="text-violet-400">X-Blockchain-Ids</code>
                  <code className="text-gray-400">solana</code>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsPopupVisible(false)}
                className="flex-1 px-6 py-3 rounded-xl text-white border border-violet-500/50 hover:bg-violet-500/20 transition-all duration-200"
              >
                Close
              </button>
              <button
                onClick={handleTestApi}
                className="flex-1 px-6 py-3 rounded-xl text-white bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Test API <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
