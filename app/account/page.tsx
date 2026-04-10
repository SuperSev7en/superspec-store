import { redirect } from 'next/navigation';

/** Account area is reserved for future Supabase session; until then send users to login. */
export default function AccountPage() {
  redirect('/login?next=/account');
}
