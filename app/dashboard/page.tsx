import { getLoggedInUser } from '@/lib/actions/userActions';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Dashboard() {
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser?.userId) redirect('/');

  return <div>Dashboard</div>;
}
