export async function getCategoriesList(){
    try {
        const response = await fetch('http://localhost:8081/categorias?page=0&pageSize=300&isActive=true', {
            method: "GET"
        });

        if (response.status === 200) {
            console.log("Erro de status: " + response.status)
            const data = await response.json();
            const categoriesList = []
            data.content.forEach(category=>{
                categoriesList.push({"id": category.id,"nome": category.name})
                console.log(categoriesList)
            })
            return categoriesList;
        }else{
            console.log("Erro de status: " + response.status)
        }
    } catch (error) {
        console.log(error);
    }
}
