/** @type {import('./$types').PageServerLoad} */
export function load({ params, locals }) {
  return {
    widget: params,
  }
}