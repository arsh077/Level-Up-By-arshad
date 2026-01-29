import React, { useState, useRef } from 'react';
import { Camera, Loader2, X, AlertCircle, Utensils } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';
import { GoogleGenAI, Type } from "@google/genai";

export const CameraModule: React.FC = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    foodName: string;
    calories: number;
    macros: { protein: number; carbs: number; fats: number };
    measures: string;
  } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openCamera = () => {
    fileInputRef.current?.click();
  };

  const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const url = URL.createObjectURL(file);
    setPreview(url);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Initialize Gemini
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Convert file to Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Call Gemini 3 Flash (Supports Multimodal)
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { inlineData: { mimeType: file.type, data: base64Data } },
            { text: "Analyze this image. If it contains food, return a JSON object with: 'foodName' (specific dish name, e.g. 'Butter Chicken'), 'calories' (estimated integer), 'macros' (object with protein, carbs, fats as integers), and 'description' (short 1 sentence summary). If it is NOT food, return 'foodName': 'Not Food'." }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              foodName: { type: Type.STRING },
              calories: { type: Type.NUMBER },
              macros: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fats: { type: Type.NUMBER }
                }
              },
              description: { type: Type.STRING }
            }
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      
      if (data.foodName === 'Not Food' || !data.foodName) {
         throw new Error("No food detected in this image.");
      }

      setResult({
        foodName: data.foodName,
        calories: data.calories || 0,
        macros: data.macros || { protein: 0, carbs: 0, fats: 0 },
        measures: data.description || "AI Estimate"
      });

    } catch (err) {
      console.error(err);
      setError('Could not identify food. Please try a clearer photo of a meal.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-brand-navy border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-brand-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-cyan/10 transition-colors"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        
        {/* Left Side: Call to Action */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-dark border border-gray-700 rounded-full">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span className="text-xs font-mono text-gray-300 uppercase tracking-wide">Gemini Vision AI Active</span>
          </div>
          
          <h3 className="text-3xl font-heading font-bold text-white">
            What's on your plate?
          </h3>
          <p className="text-gray-400 max-w-md">
            Stop guessing calories. Just snap a photo, and our AI will identify the food, portion size, and macros instantly.
          </p>

          {!preview ? (
            <div className="pt-2">
               <GradientButton 
                onClick={openCamera}
                variant="variant"
                className="flex items-center gap-2"
              >
                <Camera className="w-5 h-5" /> Scan My Meal
              </GradientButton>
            </div>
          ) : (
            <button 
                onClick={handleReset}
                className="text-gray-400 hover:text-white text-sm underline flex items-center gap-2 mx-auto md:mx-0"
            >
                <X className="w-4 h-4" /> Scan new meal
            </button>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={onSelectImage}
          />
        </div>

        {/* Right Side: Preview & Result Card */}
        <div className="flex-1 w-full max-w-sm">
            {preview ? (
                <div className="bg-brand-dark rounded-2xl border border-gray-700 overflow-hidden relative min-h-[300px] flex flex-col">
                    <div className="relative h-48 w-full bg-black">
                        <img src={preview} alt="Meal preview" className="w-full h-full object-cover opacity-80" />
                        {loading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
                                <Loader2 className="w-10 h-10 text-brand-cyan animate-spin mb-2" />
                                <span className="text-brand-cyan font-mono text-sm animate-pulse">ANALYZING...</span>
                            </div>
                        )}
                        {error && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 text-center z-10">
                                <AlertCircle className="w-8 h-8 text-brand-red mb-2" />
                                <span className="text-brand-red text-sm">{error}</span>
                            </div>
                        )}
                    </div>
                    
                    {result && !loading && (
                        <div className="p-5 animate-fade-in flex-1 flex flex-col justify-center">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-white text-lg leading-tight">{result.foodName}</h4>
                                    <span className="text-xs text-gray-500 font-mono line-clamp-2">{result.measures}</span>
                                </div>
                                <div className="bg-brand-green/20 text-brand-green px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                                    {result.calories} kcal
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-2 mt-auto">
                                <div className="bg-brand-navy p-2 rounded border border-gray-800 text-center">
                                    <div className="text-[10px] text-gray-400 uppercase">Prot</div>
                                    <div className="font-bold text-brand-cyan">{result.macros.protein}g</div>
                                </div>
                                <div className="bg-brand-navy p-2 rounded border border-gray-800 text-center">
                                    <div className="text-[10px] text-gray-400 uppercase">Carb</div>
                                    <div className="font-bold text-brand-orange">{result.macros.carbs}g</div>
                                </div>
                                <div className="bg-brand-navy p-2 rounded border border-gray-800 text-center">
                                    <div className="text-[10px] text-gray-400 uppercase">Fat</div>
                                    <div className="font-bold text-brand-green">{result.macros.fats}g</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div 
                    onClick={openCamera}
                    className="h-64 border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-brand-cyan hover:text-brand-cyan transition-colors cursor-pointer bg-brand-dark/50"
                >
                    <div className="w-16 h-16 rounded-full bg-brand-navy flex items-center justify-center mb-4">
                        <Utensils className="w-8 h-8 opacity-50" />
                    </div>
                    <span className="font-medium">Tap to scan</span>
                    <span className="text-xs opacity-60 mt-1">Supports JPG, PNG</span>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};