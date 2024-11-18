fetch('http://3.138.179.81:8081/categorias?page=0&pageSize=10&isActive=true', {
    method: "GET"
  }).then(
    response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(data => {
      if (data.content.length == 0) {
        const sectionMain = document.getElementById("sectionMain")
        sectionMain.style.visibility = "hidden"
        const message = document.getElementById("messageError")
        message.innerText = "Adicione uma categoria antes de adicionar um produto"
        message.style.margin = "auto"
        message.style.fontSize = "30px"
        message.style.color = "red"
      }
    }).catch(error => {
      const sectionMain = document.getElementById("sectionMain")
      sectionMain.style.visibility = "hidden"
      const message = document.getElementById("messageError")
      message.innerText = "Houve uma problema ao obter as categorias"
      message.style.margin = "auto"
      message.style.fontSize = "30px"
      message.style.color = "red"
    })