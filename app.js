
const barcas = {
  "251": 94,
  "252": 75,
  "253": 53,
  "254": 38
};

let selecionados = [];
let quantidadeRestante = 0;

function atualizarQuantidadeRestante() {
  const barcaCode = document.getElementById('barca').value;
  const total = barcas[barcaCode] || 0;
  const usado = selecionados.reduce((sum, item) => sum + item.qtd, 0);
  quantidadeRestante = total - usado;
  document.getElementById('quantidade-restante').textContent = quantidadeRestante;

  document.getElementById('confirmar').disabled = quantidadeRestante < 0 || total === 0;
}

function adicionarItem() {
  const item = document.getElementById('item').value;
  const qtd = parseInt(document.getElementById('qtd').value);
  const obs = document.getElementById('obs').value;
  if (!item || isNaN(qtd) || qtd <= 0) return;

  selecionados.push({ item, qtd, obs });
  renderizarSelecionados();
  atualizarQuantidadeRestante();
}

function renderizarSelecionados() {
  const lista = document.getElementById('selecionados');
  lista.innerHTML = '';
  let total = 0;

  selecionados.forEach(({ item, qtd, obs }) => {
    const li = document.createElement('li');
    li.textContent = `${item} (${qtd})${obs ? ' - Obs: ' + obs : ''}`;
    lista.appendChild(li);
    total += qtd;
  });

  document.getElementById('total').textContent = total;
}

function confirmarPedido() {
  const mesa = document.getElementById('mesa').value;
  const barca = document.getElementById('barca');
  const barcaText = barca.options[barca.selectedIndex].text;
  const total = selecionados.reduce((sum, item) => sum + item.qtd, 0);

  const msg = `✅ Pedido da mesa ${mesa} confirmado com ${total} peça(s).`;
  document.getElementById('confirmacao').textContent = msg;

  selecionados = [];
  renderizarSelecionados();
  atualizarQuantidadeRestante();
}

document.getElementById('adicionar').onclick = adicionarItem;
document.getElementById('confirmar').onclick = confirmarPedido;
document.getElementById('barca').onchange = atualizarQuantidadeRestante;

