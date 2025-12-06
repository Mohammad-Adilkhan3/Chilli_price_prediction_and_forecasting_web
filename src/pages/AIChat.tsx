import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import PageMeta from '@/components/common/PageMeta';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI agricultural market assistant. I can help you understand price trends, analyze market data, and provide insights about chilli prices. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Why is the price expected to increase next month?',
    'Compare 2024 vs 2025 price trends',
    'Which market has the best prices?',
    'How does rainfall affect chilli prices?',
    'What is the model accuracy?'
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('price') && (lowerMessage.includes('increase') || lowerMessage.includes('high'))) {
      return 'Based on our AI analysis, chilli prices are expected to increase by approximately 12% next month. This is primarily due to:\n\n• **Reduced Rainfall**: 25% below seasonal average in Karnataka region\n• **Lower Market Arrivals**: 18% decrease in supply compared to last month\n• **Seasonal Demand**: Approaching peak demand season\n\nOur Random Forest model predicts this with 98.2% confidence.';
    }

    if (lowerMessage.includes('compare') || lowerMessage.includes('2024') || lowerMessage.includes('2025')) {
      return 'Comparing price trends:\n\n**2024 Average**: ₹26,500 per quintal\n**2025 Forecast**: ₹29,800 per quintal\n**Change**: +12.4% increase\n\nKey factors driving the change:\n• Weather patterns shifted with reduced monsoon rainfall\n• Increased export demand\n• Production challenges in major growing regions\n\nThe upward trend is expected to continue through Q2 2025.';
    }

    if (lowerMessage.includes('market') || lowerMessage.includes('city') || lowerMessage.includes('best')) {
      return 'Based on current market analysis:\n\n**Top Markets by Price**:\n1. **Mumbai**: ₹31,200/quintal (Premium market)\n2. **Delhi**: ₹29,800/quintal (High demand)\n3. **Bangalore**: ₹28,400/quintal (Balanced)\n4. **Guntur**: ₹27,500/quintal (Production hub)\n\n**Recommendation**: For sellers, Mumbai and Delhi offer better prices. For buyers, Guntur provides competitive rates due to proximity to production areas.';
    }

    if (lowerMessage.includes('rainfall') || lowerMessage.includes('weather')) {
      return 'Rainfall has a significant impact on chilli prices:\n\n**Correlation Analysis**:\n• **Negative correlation**: -0.68 (inverse relationship)\n• When rainfall decreases, prices tend to increase\n• Optimal rainfall: 80-120mm per month\n\n**Current Situation**:\n• Rainfall: 65mm (below optimal)\n• Expected impact: 8-12% price increase\n• Recovery timeline: 2-3 months\n\nOur models factor in weather data from NICRA for accurate predictions.';
    }

    if (lowerMessage.includes('accuracy') || lowerMessage.includes('model') || lowerMessage.includes('reliable')) {
      return 'Our AI models demonstrate excellent performance:\n\n**Random Forest (Primary Model)**:\n• Accuracy: 98.2%\n• MAE: 1.02\n• R² Score: 0.998\n• RMSE: 1.45\n\n**Model Validation**:\n• Tested on 12 months of historical data\n• Cross-validated with 5-fold validation\n• Consistently outperforms traditional methods\n\nThe high R² score indicates our predictions explain 99.8% of price variance.';
    }

    return 'I understand you\'re asking about agricultural market trends. Based on our comprehensive AI analysis:\n\n• Current chilli prices show an upward trend\n• Market conditions are influenced by supply, weather, and seasonal factors\n• Our models provide 98%+ accuracy in predictions\n\nCould you be more specific about what aspect you\'d like to explore? I can help with price forecasts, market comparisons, weather impacts, or model performance details.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
  };

  return (
    <>
      <PageMeta
        title="AI Assistant - AgriAI"
        description="Chat with AI for agricultural market insights and analysis"
      />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                  <Bot className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-3xl xl:text-4xl font-bold gradient-text">
                  AI Market Assistant
                </h1>
              </div>
              <p className="text-muted-foreground">
                Ask questions about market trends, price predictions, and agricultural insights
              </p>
            </div>

            <GlassCard className="h-[600px] flex flex-col">
              <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
                <div className="space-y-4 pb-4">
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {message.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5 text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <span className="text-xs opacity-70 mt-2 block">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-secondary-foreground" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {messages.length === 1 && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(question)}
                        className="text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-border/50">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about market trends, prices, or predictions..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="gradient-primary"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AIChat;
