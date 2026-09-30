const formTransacao = document.getElementById('form-transacao');
const listaCorpo = document.getElementById('lista-corpo');
const saldoTotal = document.getElementById('saldo-total');

let transacoes = JSON.parse(localStorage.getItem('minhasTransacoes')) || [];

function atualizarTela() {
  listaCorpo.innerHTML = '';
  let total = 0;

  transacoes.forEach((transacao, index) => {
    const valorFormatado = transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    total += transacao.valor;

    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${transacao.descricao}</td>
      <td style="color: ${transacao.valor > 0 ? '#2ecc71' : '#e74c3c'}">${valorFormatado}</td>
      <td>
        <button class="btn-remover" onclick="removerTransacao(${index})">X</button>
      </td>
    `;
    listaCorpo.appendChild(linha);
  });

  const totalFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  saldoTotal.textContent = totalFormatado;
  
  if (total < 0) {
    saldoTotal.style.color = '#e74c3c'; 
  } else {
    saldoTotal.style.color = '#2ecc71'; 
  }
}

formTransacao.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const descricaoInput = document.getElementById('descricao').value;
  let valorInput = parseFloat(document.getElementById('valor').value);
  const tipoInput = document.getElementById('tipo').value;

  if (tipoInput === 'despesa') {
    valorInput = -valorInput; 
  }

  const novaTransacao = {
    descricao: descricaoInput,
    valor: valorInput,
    criadaEm: new Date().toISOString()
  };

  transacoes.push(novaTransacao);
  localStorage.setItem('minhasTransacoes', JSON.stringify(transacoes));

  formTransacao.reset();
  atualizarTela();
});

function removerTransacao(index) {
  transacoes.splice(index, 1);
  localStorage.setItem('minhasTransacoes', JSON.stringify(transacoes));
  atualizarTela();
}

atualizarTela();