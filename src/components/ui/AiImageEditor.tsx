import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Check, X, Rocket, Image, Download } from 'lucide-react';
import Button from './Button';

interface AiImageEditorProps {
  onImageGenerated: (imageUrl: string) => void;
  productImage: string;
}

const mockGenerateImage = async (prompt: string): Promise<string> => {
  // This is a mock function that would be replaced with actual API call
  console.log(`Generating image for prompt: ${prompt}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Return a mock image URL for demo purposes
  return "https://images.pexels.com/photos/1336873/pexels-photo-1336873.jpeg";
};

const AiImageEditor: React.FC<AiImageEditorProps> = ({ onImageGenerated, productImage }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const imageUrl = await mockGenerateImage(prompt);
      setGeneratedImage(imageUrl);
      onImageGenerated(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleAccept = () => {
    if (generatedImage) {
      onImageGenerated(generatedImage);
    }
  };
  
  const handleReject = () => {
    setGeneratedImage(null);
  };
  
  return (
    <motion.div 
      className="glass rounded-xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-display font-medium mb-4 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-primary" />
        AI Design Studio
      </h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="relative bg-background-dark rounded-lg border border-white/10 overflow-hidden aspect-square">
            {generatedImage ? (
              <img 
                src={generatedImage} 
                alt="Generated design" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Image className="w-12 h-12 text-neutral-400 mb-4" />
                <p className="text-neutral-400">
                  {isGenerating 
                    ? "Creating your design..."
                    : "Your AI-generated design will appear here"}
                </p>
              </div>
            )}
            
            {isGenerating && (
              <div className="absolute inset-0 bg-background-dark/80 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-12 h-12 text-primary" />
                </motion.div>
              </div>
            )}
          </div>
          
          {generatedImage && (
            <div className="flex gap-2 mt-4">
              <Button 
                variant="primary" 
                fullWidth
                icon={<Check className="w-4 h-4" />}
                onClick={handleAccept}
              >
                Accept Design
              </Button>
              <Button 
                variant="outline" 
                fullWidth
                icon={<X className="w-4 h-4" />}
                onClick={handleReject}
              >
                Try Again
              </Button>
            </div>
          )}
          
          {generatedImage && (
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={() => {}}
                className="w-full"
              >
                Download Design
              </Button>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="glass rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-2">Design Prompt</h4>
            <textarea
              className="input resize-none h-32"
              placeholder="Describe your design idea... (e.g., Neon samurai cat, cyberpunk skull)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button 
              variant="primary"
              icon={<Rocket className="w-4 h-4" />}
              className="mt-3 w-full"
              onClick={handleGenerateImage}
              isLoading={isGenerating}
              disabled={!prompt.trim() || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Design'}
            </Button>
          </div>
          
          <div className="glass rounded-lg p-4">
            <h4 className="font-medium mb-3">Prompt Ideas</h4>
            <div className="flex flex-wrap gap-2">
              {['Cyberpunk cat', 'Space astronaut', 'Neon samurai', 'Abstract waves', 'Retro gaming'].map(idea => (
                <button 
                  key={idea} 
                  className="px-3 py-1.5 text-xs rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={() => setPrompt(idea)}
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiImageEditor;