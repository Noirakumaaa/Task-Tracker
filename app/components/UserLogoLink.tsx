'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const UserLogoLink = () => {
  const [userLink, setUserLink] = useState('');

  useEffect(() => {
    const user_id = Cookies.get('user_id');
    if (user_id) {
      setUserLink(`/v1/${user_id}`);
    }
  }, []);

  return (
    <>
     <Link href={userLink}>Logo</Link>
    </>
  );
};

export default UserLogoLink;
