// See  https://github.com/nextauthjs/next-auth/issues/596#issuecomment-943453568
// Next auth will refetch the session on this event, so we manually trigger it.

export default function refreshSession() {
    console.log('Displathci');
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
}
