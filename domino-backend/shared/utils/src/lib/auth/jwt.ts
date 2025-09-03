export interface JwtPayload {
  username: string
  sub: string
}

export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}
