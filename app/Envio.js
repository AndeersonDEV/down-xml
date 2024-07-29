async function Envio() {

    showLoading()

    const container_chaves = document.querySelectorAll('.chaves__acesso input')
    const valorLoja = document.querySelector('#loja').value

    let valoresChaves = Array.from(container_chaves).map(input => input.value).filter(value => value !== "")

    let formData = new FormData()
    formData.append('loja', JSON.stringify(valorLoja))
    formData.append('chaves', JSON.stringify(valoresChaves))

    const response = await fetch('http://10.210.2.95:3000/ReceberChave', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const jsonResponse = await response.json()
        alert('Dados enviados com sucesso!')
        hideLoading()
    } else {
        alert('Erro ao enviar dados, Verifique se todos os dados estão corretos!')
        hideLoading()
    }

}


function showLoading() {
    document.getElementById('loading-spinner').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}