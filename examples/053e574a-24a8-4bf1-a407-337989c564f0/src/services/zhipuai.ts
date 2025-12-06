export interface GenerateRecipeParams {
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: string[];
}

export async function generateRecipe({ difficulty, ingredients }: GenerateRecipeParams) {
  try {
    const response = await fetch('http://localhost:3000/api/recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ difficulty, ingredients }),
    });

    if (!response.ok) {
      throw new Error('生成食谱失败，请稍后重试');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to generate recipe:', error);
    throw new Error('生成食谱失败，请稍后重试');
  }
}