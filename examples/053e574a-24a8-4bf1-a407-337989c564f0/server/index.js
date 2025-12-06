import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const ZHIPUAI_API_KEY = process.env.VITE_ZHIPUAI_API_KEY;

app.post('/api/recipe', async (req, res) => {
  const { difficulty, ingredients } = req.body;

  const prompt = `
请根据以下条件生成一个中文食谱：

难度：${difficulty === 'easy' ? '简单' : difficulty === 'medium' ? '中等' : '困难'}
可用食材：${ingredients.join('、')}

请按照以下JSON格式返回食谱：
{
  "title": "菜品名称",
  "ingredients": ["配料1", "配料2", ...],
  "instructions": ["步骤1", "步骤2", ...]
}

要求：
1. 食谱必须使用给定的食材中的至少一种
2. 配料用量要准确
3. 烹饪步骤要详细且清晰
4. 难度要符合要求
`;

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZHIPUAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'glm-4-plus',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const recipe = JSON.parse(data.choices[0].message.content);
    
    res.json({
      ...recipe,
      id: Math.random().toString(36).substr(2, 9),
      difficulty,
      imageUrl: `https://source.unsplash.com/featured/?${encodeURIComponent(recipe.title)},food,cooking`
    });
  } catch (error) {
    console.error('Failed to generate recipe:', error);
    res.status(500).json({ error: '生成食谱失败，请稍后重试' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});