import NextAuth from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  debug: true,
}

export default (req: NextApiRequest, res: NextApiResponse<any>) =>
  NextAuth(req, res, options)
