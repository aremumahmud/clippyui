import uri from "../utils/urls";

async function changePassword(email, otp, password) {
    try {
        const response = await fetch(uri.server + "otp-change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
                password
            })
        });

        const res = await response.json();

        return res

    } catch (err) {
        return Promise.reject({ error: true, message: 'An unexpected error occured, Please click the button below to reload this page' })
    }
}

export default changePassword