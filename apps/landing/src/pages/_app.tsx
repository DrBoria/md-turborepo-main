import React from 'react';
import { ThemeProvider } from '@md/styles'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql'
import type { AppProps } from 'next/app'
import { Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { HamburgerMenu } from '@md/sections';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient as ApolloClient<NormalizedCacheObject>}>
      <ThemeProvider>
        <HamburgerMenu />
        <PaperContainer>
          {/* PAPER */}
          <PaperTexture />
          <Paper />
          <Component {...pageProps} />
        </PaperContainer>
      </ThemeProvider>
    </ApolloProvider>
  )
}
