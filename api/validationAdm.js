export async function validationAdm(token) {
    try {
        const response = await fetch('http://18.227.48.211:8081/autorizacao/token/administrador', {
            method: "GET",
            headers: { 
                "Authorization": "Bearer " + token
            }
        });

        if (response.status === 200) {
            const data = await response.json();
            return data.id;
        } else {
           
            window.location.href = "/index.html";
        }
    } catch (error) {
        window.location.href = "/index.html";
    }
}
