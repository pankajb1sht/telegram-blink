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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data to be sent to the backend
    const requestData = {
      channelName: formData.channelName,
      description: formData.description,
      fee: parseFloat(formData.fee),
      publicKey: formData.publicKey,
      coverImage: formData.coverImage,
    };

    try {
      // Send form data to the backend API
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
        onClose();  // Close the form after submission
      } else {
        console.error('Failed to create blink');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, coverImage: imageUrl }));
    }
  };

  const handleShare = () => {
    if (apiLink) {
      const tweetUrl = `https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20Blink%20channel%20at%20${encodeURIComponent(apiLink)}`;
      window.open(tweetUrl, '_blank');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-black/90 rounded-2xl border border-violet-500/30 backdrop-blur-sm">
        {/* Form fields */}
        <div className="text-center animate-fade-in" style={{ '--delay': '0s' } as any}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            Generate Blink
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create your Telegram group Blink
          </p>
        </div>

        {/* Other form inputs (channel name, description, fee, etc.) */}
        {/* ... */}

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

      {/* Popup for sharing */}
      {isPopupVisible && apiLink && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60">
          <div className="bg-black/90 p-8 rounded-xl space-y-4 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold text-white">Your Blink was created!</h3>
            <p className="text-sm text-gray-300">Here is the link to your Blink:</p>
            <p className="text-lg text-violet-400 font-medium break-words">{apiLink}</p>
            <button
              onClick={handleShare}
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
