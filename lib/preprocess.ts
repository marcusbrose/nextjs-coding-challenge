const STOP_WORDS = new Set(['und', 'oder', 'the', 'a', 'in', 'of', 'to', 'is', 'it', 'that', 'on', 'for', 'with', 'as', 'by', 'at', 'an'])

// Normalize text by lowercasing, removing special characters, and trimming whitespace
// It helps to standardize text for consistent indexing and searching
// It happens at both indexing and query time
// Before new items is added to the index, their text fields are normalized using this function
export function normalizeText(text: string): string {
  return text
    .toLowerCase() // case insensitivity
    .replace(/[^a-z0-9\s]/gi, ' ') // remove special characters
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim() // trim leading/trailing spaces
}

// Extract restrictions from text using the pattern PUBLICATIONxINx...xONLY
// It helps to standardize restriction representation for filtering
// Before new items is added to the index, their text fields are processed using this function
export function extractRestrictions(text: string): string[] {
  const matches = text.match(/PUBLICATIONxINx(.+?)xONLY/)
  if (!matches || matches.length < 2) {
    return []
  }
  return matches.at(1)!.split("x")
}

// Tokenize text into meaningful tokens, filtering out stop words and short tokens
// It helps to improve search relevance and performance
// It happens at both indexing and query time
// Before new items is added to the index, their text fields are tokenized using this function
export function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(' ')
    .filter(t => t.length > 1 && !STOP_WORDS.has(t))
}

// Parse date from DD.MM.YYYY format to YYYY-MM-DD format
// It helps to standardize date representation for filtering and sorting
// Before new items is added to the index, their date fields are parsed using this function
export function parseDate(date: string): string | null {
  const [d, m, y] = date.split('.')
  if (!d || !m || !y) return null
  return `${y}-${m}-${d}`
}
