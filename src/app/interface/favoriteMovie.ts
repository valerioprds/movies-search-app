export interface FavoriteMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster?: string; // Opcional, si quieres incluir la URL del póster
  // Cualquier otro campo que creas necesario
  comment?: string
}
