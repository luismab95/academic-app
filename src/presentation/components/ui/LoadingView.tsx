import React from 'react';
import { Layout } from '@ui-kitten/components';
import { LoadingIndicator } from './LoadingIndicator';

export const LoadingView = () => {
  return (
    <Layout
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LoadingIndicator />
    </Layout>
  );
};
