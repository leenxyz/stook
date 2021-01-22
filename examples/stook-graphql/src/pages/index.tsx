import React from 'react';
import { getState, mutate } from 'stook';
import gql from 'gql-tag';

import {
  config,
  query,
  useQuery,
  useMutation,
  fetcher,
  useSubscribe,
  fromSubscription,
  applyMiddleware,
  Client,
  Result,
} from 'stook-graphql';

applyMiddleware(async (ctx, next) => {
  await next();
  if (typeof ctx.body !== 'object') return;
  if (Object.keys(ctx.body).length === 1) {
    ctx.body = ctx.body[Object.keys(ctx.body)[0]];
  }
});

const endpoint = 'https://graphql.anilist.co';

config({ endpoint });

const User = gql`
  {
    User(id: 1) {
      id
      name
    }
  }
`;

const MediaTagCollection = gql`
  {
    MediaTagCollection {
      id
      description
    }
  }
`;

export default () => {
  const { loading, data } = useQuery(User);
  const { data: list } = useQuery(MediaTagCollection);

  function updateUser() {
    mutate(User, (state: Result) => {
      state.data = {
        id: 10,
        name: 'foo',
      };
    });
  }

  function updateList() {
    mutate(MediaTagCollection, (state: Result) => {
      state.data[0].description = 'fofoo';
    });
  }

  console.log('loading:', loading, data);
  if (loading) return null;

  return (
    <div>
      <h2>Result</h2>
      <button onClick={updateUser}>update user</button>
      <button onClick={updateList}>update List</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};
