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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, coverImage: imageUrl }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-black/90 rounded-2xl border border-violet-500/30 backdrop-blur-sm">
      <div className="text-center animate-fade-in" style={{ '--delay': '0s' } as any}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Generate Blink
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Create your Telegram group Blink
        </p>
      </div>
      
      <div className="space-y-5">
        <div className="group animate-fade-in" style={{ '--delay': '0.1s' } as any}>
          <label htmlFor="channelName" className="block text-sm font-medium text-gray-300">
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            value={formData.channelName}
            onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
            className="mt-1.5 block w-full rounded-xl bg-white/10 border border-violet-500/30 px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="Enter channel name"
            required
          />
        </div>

        <div className="group animate-fade-in" style={{ '--delay': '0.2s' } as any}>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="mt-1.5 block w-full rounded-xl bg-white/10 border border-violet-500/30 px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 resize-none"
            placeholder="Describe your channel"
            required
          />
        </div>

        <div className="group animate-fade-in" style={{ '--delay': '0.3s' } as any}>
          <label htmlFor="fee" className="block text-sm font-medium text-gray-300">
            Fee (SOL)
          </label>
          <div className="mt-1.5 relative">
            <input
              type="number"
              id="fee"
              value={formData.fee}
              onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
              step="0.000000001"
              min="0"
              className="block w-full rounded-xl bg-white/10 border border-violet-500/30 px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200 pr-12"
              placeholder="0.00"
              required
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-gray-400 text-sm">SOL</span>
            </div>
          </div>
        </div>

        <div className="group animate-fade-in" style={{ '--delay': '0.4s' } as any}>
          <label htmlFor="publicKey" className="block text-sm font-medium text-gray-300">
            Public Key
          </label>
          <input
            type="text"
            id="publicKey"
            value={formData.publicKey}
            onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
            className="mt-1.5 block w-full rounded-xl bg-white/10 border border-violet-500/30 px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
            placeholder="Enter your public key"
            required
          />
          <p className="mt-1.5 text-xs flex items-center text-gray-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            Make sure to enter a valid public key
          </p>
        </div>

        <div className="group animate-fade-in" style={{ '--delay': '0.5s' } as any}>
          <label className="block text-sm font-medium text-gray-300">Cover Image</label>
          <div className="mt-1.5 space-y-3">
            <input
              type="text"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="block w-full rounded-xl bg-white/10 border border-violet-500/30 px-4 py-3 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all duration-200"
              placeholder="Enter image URL"
            />
            
            <div className="flex items-center">
              <span className="text-sm text-gray-400">or</span>
              <label className="ml-3 cursor-pointer">
                <div className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </label>
            </div>
            
            {formData.coverImage && (
              <div className="mt-3 relative rounded-xl overflow-hidden bg-gray-900 aspect-video group">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 animate-fade-in" style={{ '--delay': '0.6s' } as any}>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl text-white border border-violet-500/50 hover:bg-violet-500/20 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl text-white bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-pink-600 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02]"
        >
          Generate Blink
        </button>
      </div>
    </form>
  );
}
