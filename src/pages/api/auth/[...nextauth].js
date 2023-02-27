import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

// const refreshAccessToken  = async (token)  => {
//     try{

//     }catch(e){
//         console.error(e)

//         return {
//             ...token,
//             error: 'RefreshAccessTokenError',
//         }
//     }
// }

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private'
    }),
    GoogleProvider({
      id: "youtube",
      name: "Youtube",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: 'https://accounts.google.com/o/oauth2/auth'
    }),
    // ...add more providers here
  ],
  secret: "hello world",
  pages: {
    signIn: '/index'
  },
  callbacks: {
    async jwt({token , account , user}) {
        if(account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000
            }
        }

        if(Date.now() < token.accessTokenExpires) {
            return token
        }


        return await refreshAccessToken(token)
    },

    async session({session , token}) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username

        return session
    }
  }
}


export default NextAuth(authOptions)