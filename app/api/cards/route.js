import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  const { formData, chocolateInfo } = await req.json();
  const { sizes, ...chocolateInfoWithoutSizes } = chocolateInfo;

  const { data, error } = await supabase
    .from('cards')
    .insert([{ ...formData, ...chocolateInfoWithoutSizes }])
    .select();

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Card saved successfully', data }), { status: 200 });
}
