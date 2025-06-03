const selecionados = [];
function addItem() {
  const code = document.getElementById('peca').value;
  const name = document.getElementById('peca').selectedOptions[0].text;
  const qtd = parseInt(document.getElementById('qtd').value);
  const obs = document.getElementById('obs').value;

  if (!qtd || qtd <= 0) return alert("Quantidade inválida.");

  selecionados.push({ code, name, qtd, obs });
  render();
}

function render() {
  const ul = document.getElementById('selecionados');
  const total = document.getElementById('total');
  ul.innerHTML = '';
  let count = 0;
  selecionados.forEach(i => {
    const li = document.createElement('li');
    li.textContent = `${i.name} - ${i.qtd}` + (i.obs ? ` (Obs: ${i.obs})` : '');
    ul.appendChild(li);
    count += i.qtd;
  });
  total.textContent = count;
}

function confirmar() {
  const mesa = document.getElementById('mesa').value;
  const barca = document.getElementById('barca');
  const limite = parseInt(barca.value);
  const nomeBarca = barca.selectedOptions[0].text;
  const total = selecionados.reduce((sum, i) => sum + i.qtd, 0);
  if (!mesa) return alert("Informe a mesa.");
  if (total > limite) return alert("Excedeu o limite da barca!");

  document.getElementById('mensagem').innerHTML =
    `<div class='success'>✅ Pedido da mesa ${mesa} confirmado com ${total} peça(s).</div>`;
  selecionados.length = 0;
  render();
}