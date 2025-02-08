import {MD3DarkTheme, configureFonts} from 'react-native-paper';

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#3B82F6', // Modern mavi
    secondary: '#60A5FA', // Açık mavi
    accent: '#2563EB', // Koyu mavi
    background: '#0F172A', // Lacivert arka plan
    surface: '#1E293B', // Koyu mavi-gri kart arka planı
    text: '#F1F5F9', // Açık gri metin
    secondaryText: '#94A3B8', // Gri metin
    border: '#334155', // Koyu mavi kenarlık
    error: '#EF4444', // Kırmızı
    success: '#10B981', // Yeşil
    card: '#1E293B', // Koyu mavi-gri kart arka planı
    notification: '#3B82F6',
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
};

export type AppTheme = typeof theme;

export const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
    borderRadius: theme.roundness,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  poster: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  info: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginBottom: theme.spacing.xs,
  },
  rating: {
    fontSize: 14,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
    fontWeight: '600',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.s,
  },
  genre: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: 20,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  searchBar: {
    margin: theme.spacing.m,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
    elevation: 2,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: theme.spacing.s,
  },
  description: {
    color: theme.colors.secondaryText,
    fontSize: 14,
    lineHeight: 20,
    marginTop: theme.spacing.s,
  },
}; 