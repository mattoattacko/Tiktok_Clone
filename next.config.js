// In NextJs, we have to configure our images hostname. If we see the error that reads something like 'Invalid src prop xxx on 'next/images', hostname 'yt3.ggpht.com' is not configured under images in our next.config.js', that means that we need to come in here and add the domain. 

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yt3.ggpht.com', 'pfpmaker.com', 'lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
