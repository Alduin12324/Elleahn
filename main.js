
let itens = [];
function addItem() {
  const nome = document.getElementById('item').value;
  const qtd = parseInt(document.getElementById('qtd').value);
  const obs = document.getElementById('obs').value;
  if (!nome || qtd < 1) return alert('Preencha nome e quantidade.');
  itens.push({ nome, qtd, obs });
  render();
}
function render() {
  const ul = document.getElementById('lista');
  ul.innerHTML = '';
  let total = 0;
  itens.forEach((i, idx) => {
    total += i.qtd;
    const li = document.createElement('li');
    li.innerText = `${i.nome} (${i.qtd}) ${i.obs ? 'Obs: ' + i.obs : ''}`;
    ul.appendChild(li);
  });
  document.getElementById('total').innerText = 'Total de peças: ' + total;
}
function confirmarPedido() {
  const limite = parseInt(document.getElementById('barca').value || '0');
  const mesa = document.getElementById('mesa').value || '—';
  const total = itens.reduce((sum, i) => sum + i.qtd, 0);
  if (!limite) return alert('Selecione uma barca');
  if (total > limite) return alert(`Total excedido: ${total}/${limite}`);
  const mensagem = document.getElementById('mensagem');
  mensagem.innerText = `✅ Pedido da mesa ${mesa} confirmado com ${total} peça(s).`;
  mensagem.style.display = 'block';
  itens = [];
  render();
}
