import uri from "../utils/urls";

async function sendMessage(text) {
    try {
        const response = await fetch(uri.server + "message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("site")
            },
            body: JSON.stringify({
                text
            })
        });

        const res = await response.text();

        return res

    } catch (err) {
        return Promise.reject({ error: true, message: 'An unexpected error occured, Please click the button below to reload this page' })
    }
}

export default sendMessage