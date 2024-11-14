export async function validationClient(token) {
    try {
        const response = await fetch('http://localhost:8084/autorizacao/token/cliente', {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            return data.id;
        } else {
            window.location.href = "/html/login.html";
        }
    } catch (error) {
        window.location.href = "/html/login.html";
    }
}
