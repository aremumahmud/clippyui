import uri from "../utils/urls";

async function verifyOTP(email, otp) {
    try {
        const response = await fetch(uri.server + "otp-verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp
            })
        });

        const res = await response.json();

        return res

    } catch (err) {
        return Promise.reject({ error: true, message: 'An unexpected error occured, Please click the button below to reload this page' })
    }
}

export default verifyOTP