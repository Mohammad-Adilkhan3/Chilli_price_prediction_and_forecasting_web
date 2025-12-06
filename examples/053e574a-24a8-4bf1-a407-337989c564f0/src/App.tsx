import React, { useState } from 'react';
import { ChefHat, Utensils, BookOpen, Trophy } from 'lucide-react';
import { generateRecipe } from './services/zhipuai.ts';

type Difficulty = 'easy' | 'medium' | 'hard';
type Ingredient = string;

interface Recipe {
  id: string;
  title: string;
  difficulty: Difficulty;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
}

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [dailyRecipe, setDailyRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const difficultyLabels: Record<Difficulty, string> = {
    easy: '简单',
    medium: '中等',
    hard: '困难'
  };

  const commonIngredients = [
    '鸡肉', '牛肉', '鱼', '米饭', '面条', '番茄', 
    '洋葱', '蒜', '青椒', '蘑菇'
  ];

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      setError('请至少选择一种食材');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const recipe = await generateRecipe({
        difficulty: selectedDifficulty,
        ingredients: selectedIngredients
      });
      setDailyRecipe(recipe);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成食谱失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">烹饪挑战</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-orange-100">
                <BookOpen className="h-6 w-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-orange-100">
                <Trophy className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">选择难度</h2>
              <div className="flex space-x-4">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      selectedDifficulty === difficulty
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {difficultyLabels[difficulty]}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">选择食材</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {commonIngredients.map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => toggleIngredient(ingredient)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedIngredients.includes(ingredient)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              onClick={handleGenerateRecipe}
              disabled={loading}
              className={`w-full bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Utensils className="h-5 w-5" />
              <span>{loading ? '生成中...' : '生成食谱'}</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            {dailyRecipe ? (
              <div className="space-y-6">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={dailyRecipe.imageUrl}
                    alt={dailyRecipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{dailyRecipe.title}</h2>
                  <span className="inline-block mt-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {difficultyLabels[dailyRecipe.difficulty]}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">食材：</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {dailyRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600">{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-2">步骤：</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {dailyRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-gray-600">{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <p>点击生成食谱按钮开始烹饪挑战！</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;