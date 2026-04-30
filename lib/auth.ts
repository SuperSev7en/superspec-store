import { jwtVerify, SignJWT } from 'jose';

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_dev_only_123');

export async function signToken(payload: any, expiresIn: string | number = '7d') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn as any)
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch (error) {
    return null;
  }
}
