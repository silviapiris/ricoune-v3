import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: false,
  prefix: 'rl:contact',
})

const devisLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: false,
  prefix: 'rl:devis',
})

export async function rateLimitContact(ip: string): Promise<boolean> {
  try {
    const { success } = await contactLimiter.limit(ip)
    return success
  } catch (error) {
    console.error('[rate-limit] contact limiter unavailable:', error)
    return true
  }
}

export async function rateLimitDevis(ip: string): Promise<boolean> {
  try {
    const { success } = await devisLimiter.limit(ip)
    return success
  } catch (error) {
    console.error('[rate-limit] devis limiter unavailable:', error)
    return true
  }
}
