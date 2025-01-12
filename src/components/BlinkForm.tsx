import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export const BlinkForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    channelName: "",
    description: "",
    fee: "",
    publicKey: "",
    coverImage: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Blink Generated!",
      description: "Your Telegram group Blink has been created successfully.",
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-black/90 rounded-lg border border-solana-purple/30 backdrop-blur-sm animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="channelName" className="text-white">Channel Name</Label>
        <Input
          id="channelName"
          value={formData.channelName}
          onChange={(e) => setFormData({ ...formData, channelName: e.target.value })}
          className="bg-white/10 border-solana-purple/50 text-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-white/10 border-solana-purple/50 text-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fee" className="text-white">Fee (SOL)</Label>
        <Input
          id="fee"
          type="number"
          step="0.01"
          value={formData.fee}
          onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
          className="bg-white/10 border-solana-purple/50 text-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="publicKey" className="text-white">Public Key</Label>
        <Input
          id="publicKey"
          value={formData.publicKey}
          onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
          className="bg-white/10 border-solana-purple/50 text-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="coverImage" className="text-white">Cover Image URL</Label>
        <Input
          id="coverImage"
          type="url"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="bg-white/10 border-solana-purple/50 text-white"
          required
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-solana-purple text-white hover:bg-solana-purple/20"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-solana-purple hover:bg-solana-purple/80 text-white"
        >
          Generate Blink
        </Button>
      </div>
    </form>
  );
};