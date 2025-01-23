import React, { useState } from 'react';
import { Upload, AlertCircle, X, Loader2 } from 'lucide-react';

interface FormData {
  channelName: string;
  description: string;
  fee: string;
  publicKey: string;
  coverImage: string;
  link: string;
}

interface FormError {
  field: keyof FormData | 'submit';
  message: string;
}

interface BlinkPreviewProps {
  blink: {
    channelName: string;
    description: string;
    fee: number;
    publicKey: string;
    coverImage?: string;
    route: string;
  };
  onClose: () => void;
}

export function BlinkPreview({ blink, onClose }: BlinkPreviewProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-black/90 rounded-2xl border border-violet-500/30 shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-violet-400 transition-colors">
          <X className="h-6 w-6" />
        </button>
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
              <a href={blink.route} className="text-fuchsia-400 hover:underline" target="_blank" rel="noopener noreferrer">
                {"https://blink-back.onrender.com${data.route}"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BlinkForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({
    channelName: '',
    description: '',
    fee: '',
    publicKey: '',
    coverImage: '',
    link: '',
  });

  const [errors, setErrors] = useState<FormError[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [blinkData, setBlinkData] = useState<any | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const validateForm = (): FormError[] => {
    const newErrors: FormError[] = [];
    if (!formData.channelName.trim()) newErrors.push({ field: 'channelName', message: 'Channel name is required' });
    if (!formData.description.trim()) newErrors.push({ field: 'description', message: 'Description is required' });
    const feeValue = parseFloat(formData.fee);
    if (isNaN(feeValue) || feeValue <= 0) newErrors.push({ field: 'fee', message: 'Please enter a valid fee greater than 0' });
    if (!formData.publicKey.trim()) newErrors.push({ field: 'publicKey', message: 'Public key is required' });
    if (!formData.link.trim()) newErrors.push({ field: 'link', message: 'Link is required' });
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setErrors([]);
    try {
      const response = await fetch('https://blink-back.onrender.com/api/blink/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create blink');
      // Ensure the route uses the correct backend URL
    const correctedBlinkData = {
      ...data,
      route: `https://blink-back.onrender.com${data.route}`,  // Add the backend base URL
    };

    setBlinkData(correctedBlinkData);
    setShowPreview(true);
     
    } catch (error) {
      setErrors([{ field: 'submit', message: error instanceof Error ? error.message : 'An unexpected error occurred' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldError = (field: keyof FormData | 'submit') => {
    return errors.find(error => error.field === field)?.message;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-black/90 rounded-2xl border border-violet-500/30 backdrop-blur-sm">
        {['channelName', 'description', 'fee', 'publicKey', 'link'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-200">
              {field.charAt(0).toUpperCase() + field.slice(1)} *
            </label>
            <input
              type={field === 'fee' ? 'number' : 'text'}
              id={field}
              value={formData[field as keyof FormData]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              className={`mt-1 block w-full rounded-lg bg-black/50 border ${
                getFieldError(field as keyof FormData) ? 'border-red-500' : 'border-violet-500/30'
              } px-3 py-2 text-white shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`}
            />
            {getFieldError(field as keyof FormData) && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {getFieldError(field as keyof FormData)}
              </p>
            )}
          </div>
        ))}

        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-200">
            Cover Image URL
          </label>
          <input
            type="url"
            id="coverImage"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className={`mt-1 block w-full rounded-lg bg-black/50 border ${
              getFieldError('coverImage') ? 'border-red-500' : 'border-violet-500/30'
            } px-3 py-2 text-white shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20`}
          />
        </div>

        {getFieldError('submit') && (
          <div className="rounded-lg bg-red-500/10 border border-red-500 p-3 text-sm text-red-500 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {getFieldError('submit')}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-violet-500/30 text-gray-300 hover:bg-violet-500/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:from-violet-600 hover:to-fuchsia-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Blink'
            )}
          </button>
        </div>
      </form>

      {showPreview && blinkData && (
        <BlinkPreview blink={blinkData} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
}
