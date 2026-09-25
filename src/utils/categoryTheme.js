// Shared category colours, used by both EventCard (the poster art) and
// Filters (the chip dots and active state), so the two never drift apart.
// c50 = lightest tint, c100 = card/light-chip background, c800 = body text,
// c900 = title, buttons and the filled chip background.
export const categoryThemes = {
  Web: { c50: '#E6F1FB', c100: '#B5D4F4', c800: '#0C447C', c900: '#042C53' },
  Mobile: { c50: '#EAF3DE', c100: '#C0DD97', c800: '#27500A', c900: '#173404' },
  Cloud: { c50: '#FAEEDA', c100: '#FAC775', c800: '#633806', c900: '#412402' },
  'AI/ML': { c50: '#FAECE7', c100: '#F5C4B3', c800: '#712B13', c900: '#4A1B0C' },
  Design: { c50: '#EEEDFE', c100: '#CECBF6', c800: '#3C3489', c900: '#26215C' },
  Career: { c50: '#E1F5EE', c100: '#9FE1CB', c800: '#085041', c900: '#04342C' },
}

export const fallbackCategoryTheme = { c50: '#F4F4F5', c100: '#E4E4E7', c800: '#3F3F46', c900: '#18181B' }