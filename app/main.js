function addEmailField() {
    const emailDiv = document.getElementById('emails');
    const newEmailDiv = document.createElement('div');
    newEmailDiv.className = 'chaves__acesso';

    const emailLabel = document.createElement('label');
    emailLabel.innerText = 'Chave de Acesso:';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email[]';
    emailInput.required = true;
    emailInput.maxLength = '44'
    emailInput.classList.add('chave_acesso')


    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.innerText = 'Remover';
    removeButton.classList.add('btn-add-nova-linha')
    removeButton.onclick = function () {
        emailDiv.removeChild(newEmailDiv);
    };

    newEmailDiv.appendChild(emailLabel);
    newEmailDiv.appendChild(emailInput);
    newEmailDiv.appendChild(removeButton);
    emailDiv.appendChild(newEmailDiv);
}
function mostrarFormulario() {
    const formulario = document.querySelector('.form')
    const tabelaChaves = document.querySelector('.tabela__chaves')
    formulario.classList.remove('desativa')
    tabelaChaves.classList.add('desativa')
}
function ocultarFormulario() {
    const formulario = document.querySelector('.form')
    formulario.classList.add('desativa')
    const tabelaChaves = document.querySelector('.tabela__chaves')
    tabelaChaves.classList.remove('desativa')
}

document.getElementById('searchInput').addEventListener('keyup', function () {
    let filter = this.value.toLowerCase();
    let rows = document.querySelectorAll('#itemList tr');

    rows.forEach(function (row) {
        let chave = row.querySelector('.chave').textContent.toLowerCase();
        let status = row.querySelector('.status').textContent.toLowerCase();
        let loja = row.querySelector('.loja').textContent.toLowerCase();

        if (chave.includes(filter) || status.includes(filter) || loja.includes(filter)) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
});