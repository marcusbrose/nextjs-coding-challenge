import { tokenize } from './preprocess'

interface AnalyticsData {
  searchCount: number
  totalResponseTime: number
  averageResponseTime: number
  keywords: Map<string, number>
  recentSearches: Array<{
    query: string
    timestamp: number
    responseTime: number
  }>
}

export const analytics: AnalyticsData = {
  searchCount: 0,
  totalResponseTime: 0, // in milliseconds
  averageResponseTime: 0, // in milliseconds
  keywords: new Map(),
  recentSearches: []
}

export function trackSearch(query: string, responseTime: number) {
  analytics.searchCount++
  analytics.totalResponseTime += responseTime
  analytics.averageResponseTime = analytics.totalResponseTime / analytics.searchCount
  
  // Track keywords (split query and count each word)
  const words = tokenize(query)
  words.forEach(word => {
    analytics.keywords.set(word, (analytics.keywords.get(word) || 0) + 1)
  })
  
  // Keep recent searches (limit to 100)
  analytics.recentSearches.unshift({
    query,
    timestamp: Date.now(),
    responseTime
  })
  if (analytics.recentSearches.length > 100) {
    analytics.recentSearches.pop()
  }

  return analytics
}