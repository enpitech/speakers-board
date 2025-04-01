export async function updateSpeakerBio({
  request,
  params,
}: {
  request: Request;
  params: { speakerId: string };
}) {
  const formData = await request.formData();
  const bio = formData.get('bio') as string;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/speakers/${params.speakerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
      throw new Error('Failed to update speaker bio');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ errors: { _form: 'Failed to update bio. Please try again.' } }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
