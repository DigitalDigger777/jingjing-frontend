/**
 * Created by korman on 12.02.18.
 */

export default class Auth
{
    checkAuth() {
        const user = JSON.parse(window.localStorage.getItem('user'));

        if (!user) {
            window.location = '/consumer/login';
        }

        if (user && user.role != 'ROLE_CONSUMER') {
            window.location = '/consumer/login';
        }
    }
}