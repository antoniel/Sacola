require('dotenv').config();

import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { appRouter } from '../../index';

const token = jwt.sign(
  { id: process.env.TONINHO_ID, username: process.env.TONINHO_USERNAME },
  process.env.JWT_SECRET || 'secret',
  {
    expiresIn: '7d',
  },
);

const token2 = jwt.sign(
  { id: process.env.ALTERNATIVE_TONINHO_ID, username: process.env.TONINHO_USERNAME },
  process.env.JWT_SECRET || 'secret',
  {
    expiresIn: '7d',
  },
);

const authCaller = appRouter.createCaller({
  req: { headers: { authorization: token } } as any,
  res: {} as any,
});

const authCaller2 = appRouter.createCaller({
  req: { headers: { authorization: token2 } } as any,
  res: {} as any,
});

describe('Articles suite', () => {
  it('create test', async () => {
    const res = await authCaller.articles.create({ url: 'https://getpocket.com/home' });
    const res2 = await authCaller2.articles.create({ url: 'https://getpocket.com/home' });

    expect(res.articleId).toBe(res2.articleId);
  });
});
