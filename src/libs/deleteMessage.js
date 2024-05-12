import uri from "../utils/urls";

async function DeleteMessage(id) {
    try {
        const response = await fetch(uri.server + "delete/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("site")
            },
        });

        const res = await response.json();

        return res

    } catch (err) {
        return Promise.reject({ error: true, message: 'An unexpected error occured, Please click the button below to reload this page' })
    }
}

export default DeleteMessage