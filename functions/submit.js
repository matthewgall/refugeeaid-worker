import isUUID from 'validator/lib/isUUID';

export async function handle({ request, env }) {
    let resp = {
        'success': false
    }

    // This endpoint supports POST only
    if (!request.method == 'POST') {
        resp.message = `${request.method} is not allowed on this endpoint`
        return new Response(JSON.stringify(resp), {status: 400, headers: {'Content-Type': 'application/json'}})
    }

    // Now they're out the way, we check for formdata
    let formData = await request.formData();
    if (!formData) {
        resp.message = `No formdata was provided`
        return new Response(JSON.stringify(resp), {status: 400, headers: {'Content-Type': 'application/json'}})
    }
    console.log(formData);

    // And we did it, so return a success response
    resp.success = true;
    return new Response(JSON.stringify(resp), {headers: {'Content-Type': 'application/json'}});
}

export async function onRequest({ request, env }) {
	return await handle({ request, env });
}