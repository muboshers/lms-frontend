import React from 'react';
import { Helmet } from 'react-helmet-async';

import Chats from 'src/sections/director/chats/view';

export default function GroupCreate() {
  return (
    <>
      <Helmet>
        <title>Guruh q&apos;shish | EduHub uz</title>
      </Helmet>

      <Chats />
    </>
  );
}
