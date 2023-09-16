let numBackBones = localStorage.getItem("numBackbones");

let container = document.getElementById("container");

for (var i = 1; i < numBackBones; i++) {
  var div = document.createElement("div");
  div.className = "box";

  // Adiciona o conteúdo HTML à div
  div.innerHTML = `
  <h3>Backbone secundário</h3>
    <form id="fibraForm${i}" class="formulario">
      <label>Número de pavimentos:</label>
      <input type="number" id="numPavimentos${i}" name="numPavimentos${i}" min="0" required /><br />

      <label>Medida básica para cálculo dos lances de cabo do backbone (em metros):</label>
      <input type="number" id="medidaBasica${i}" name="medidaBasica${i}" min="0" required /><br />

      <label>Especificação do cabo de fibra óptica:</label>
      <select id="tipoCabo${i}" name="tipoCabo${i}" required>
        <option value="monomodo">Cabo de Fibra Óptica Monomodo</option>
        <option value="multimodo">Cabo de Fibra Óptica Multimodo</option>
      </select><br />

      <div class="spec1">
        <label>Especificação do núcleo de fibra óptica MM:</label>
        <select id="especsFibraMM${i}" name="especsFibraMM${i}" required>
          <option value="50/125 micrômetros (OM2) | 3/1 dB/km | 500/500 MHz-km">
            50/125 micrômetros (OM2) | 3/1 dB/km | 500/500 MHz-km
          </option>
          <!-- Adicione mais opções aqui -->
        </select>
      </div>

      <div class="spec2">
        <label>Especificação do núcleo de fibra óptica SM:</label>
        <select id="especsFibraSM${i}" name="especsFibraSM${i}" required>
          <option value="9/125 micrômetros (OS1, B1.1 ou G.652) | 0,4/0,25 dB/km | ~100 Terahertz">
            9/125 micrômetros (OS1, B1.1 ou G.652) | 0,4/0,25 dB/km | ~100 Terahertz
          </option>
          <!-- Adicione mais opções aqui -->
        </select>
      </div>

      <label>Característica do cabo de fibra óptica:</label>
      <select id="caracsFibra${i}" name="caracsFibra${i}" required>
        <option value="Tight Buffer">Tight Buffer</option>
        <option value="Loose">Loose Tube</option>
      </select><br />

      <label>Quantidade de fibras por andar:</label>
      <input type="number" id="numBackbonesAndar${i}" name="numBackbonesAndar${i}" min="0" required /><br />

      <label>Tipo de backbone:</label>
      <select id="tipoBackbone${i}" name="tipoBackbone${i}" required disabled>
      <option value="Secundário">Secundário</option selected>
        <option value="Primário">Primário</option>
      </select><br />
    </form>
  `;

  // Adiciona a div gerada ao container
  container.appendChild(div);
}

function processarDadosFormularios(numBackBones) {
  // Crie um array para armazenar os dados
  var dados = [];

  // Loop para percorrer os formulários
  for (var i = 1; i <= numBackBones; i++) {
    // Crie um objeto para armazenar os dados de cada formulário
    var formulario = {};

    // Capture os valores dos campos do formulário com base no índice
    var numPavimentosElement = document.getElementById("numPavimentos" + i);
    if (numPavimentosElement) {
      formulario.numPavimentos = numPavimentosElement.value;
    }

    var medidaBasicaElement = document.getElementById("medidaBasica" + i);
    if (medidaBasicaElement) {
      formulario.medidaBasica = medidaBasicaElement.value;
    }

    var tipoCaboElement = document.getElementById("tipoCabo" + i);
    if (tipoCaboElement) {
      formulario.tipoCabo = tipoCaboElement.value;
    }

    var numBackbonesAndar = document.getElementById("numBackbonesAndar" + i);
    if (medidaBasicaElement) {
      formulario.numBackbonesAndar = numBackbonesAndar.value;
    }

    console.log(formulario);
    // Adicione o objeto de formulário ao array de dados
    dados.push(formulario);
  }

  // Agora você pode fazer o que quiser com os dados
  // Por exemplo, você pode enviá-los para o servidor via AJAX
  // ou exibi-los no console para depuração
  console.log(dados);

  // Retorne os dados, se necessário
  return dados;
}

function processarDadosFormularioPrimario() {
  // Crie um array para armazenar os dados
  var dados = [];

  // Loop para percorrer os formulários
  // Crie um objeto para armazenar os dados de cada formulário
  var formulario = {};

  // Capture os valores dos campos do formulário com base no índice
  var tipoCabo = document.getElementById("PtipoCabo");
  if (tipoCabo) {
    formulario.tipoCabo = tipoCabo.value;
  }

  var especsFibraMMElement = document.getElementById("PespecsFibraMM");
  if (especsFibraMMElement) {
    formulario.especsFibraMM = especsFibraMMElement.value;
  }

  var especsFibraSMElement = document.getElementById("PespecsFibraSM");
  if (especsFibraSMElement) {
    formulario.especsFibraSM = especsFibraSMElement.value;
  }

  var caracsFibraElement = document.getElementById("PcaracsFibra");
  if (caracsFibraElement) {
    formulario.caracsFibra = caracsFibraElement.value;
  }

  var tipoBackboneElement = document.getElementById("PtipoBackbone");
  if (tipoBackboneElement) {
    formulario.tipoBackbone = tipoBackboneElement.value;
  }

  var quantidadeFibras = document.getElementById("PnumfibraRecebidas");
  if (quantidadeFibras) {
    formulario.quantidadeFibras = quantidadeFibras.value;
  }

  // Adicione o objeto de formulário ao array de dados
  dados.push(formulario);
  // Agora você pode fazer o que quiser com os dados
  // Por exemplo, você pode enviá-los para o servidor via AJAX
  // ou exibi-los no console para depuração

  // Retorne os dados, se necessário
  return dados;
}

// Chame a função com o número de formulários desejado

function calcularMetragemCabo(numPavimentos, medidaBasica) {
  var metragemTotal = 0;
  for (var i = 1; i <= numPavimentos; i++) {
    metragemTotal += medidaBasica * 2 * i; // Cada pavimento corresponde a duas vezes a medida básica
  }
  return metragemTotal;
}

function processarResultados(dados) {
  console.log(dados);
  var resultados = [];

  for (var i = 0; i < dados.length; i++) {
    var formulario = dados[i];

    var numFibrasAndar = formulario.numBackbonesAndar;
    var numPavimentos = formulario.numPavimentos;

    var numPortasDIO = numFibrasAndar * numPavimentos;
    var numConectores = numPortasDIO * 2;
    var numAcopladores = numPortasDIO;
    var numBandejaEmenda = Math.ceil((numFibrasAndar * numPavimentos) / 12);
    var numFibrasTotal = numFibrasAndar * numPavimentos;
    var numTerminadoresOpticos = numPavimentos;
    var numPigtais = numConectores;
    var numCordoes = numFibrasAndar;
    var numMetragemCabo = calcularMetragemCabo(
      numPavimentos,
      formulario.medidaBasica
    );

    var tipoDIO, quantidadeDIOs;

    if (numPortasDIO <= 12) {
      tipoDIO = "DIO de 12 portas";
      quantidadeDIOs = 1;
    } else if (numPortasDIO <= 24) {
      tipoDIO = "DIO de 24 portas";
      quantidadeDIOs = 1;
    } else {
      tipoDIO = "DIO de 48 portas";
      quantidadeDIOs = Math.ceil(numPortasDIO / 48);
    }

    var resultado = {
      numFibrasAndar: numFibrasAndar,
      numPavimentos: numPavimentos,
      numPortasDIO: numPortasDIO,
      numConectores: numConectores,
      numAcopladores: numAcopladores,
      numBandejaEmenda: numBandejaEmenda,
      numFibrasTotal: numFibrasTotal,
      numTerminadoresOpticos: numTerminadoresOpticos,
      numPigtais: numPigtais,
      numCordoes: numCordoes,
      numMetragemCabo: numMetragemCabo,
      tipoDIO: tipoDIO,
      quantidadeDIOs: quantidadeDIOs,
    };
    console.log(resultado);

    resultados.push(resultado);
  }

  return resultados;
}

function processarResultadosPrimario(dados) {
  console.log(dados);
  var resultados = [];

  for (var i = 0; i < dados.length; i++) {
    var formulario = dados[i];

    var numPortasDIO = formulario.quantidadeFibras;
    var numConectores = formulario.quantidadeFibras * 2;
    var numAcopladores = numPortasDIO;
    var especsFibraMM = formulario.especsFibraMM;
    var especsFibraSM = formulario.especsFibraSM;
    var tipoCabo = formulario.tipoCabo;
    var tipoDIO, quantidadeDIOs;

    if (numPortasDIO <= 12) {
      tipoDIO = "DIO de 12 portas";
      quantidadeDIOs = 1;
    } else if (numPortasDIO <= 24) {
      tipoDIO = "DIO de 24 portas";
      quantidadeDIOs = 1;
    } else {
      tipoDIO = "DIO de 48 portas";
      quantidadeDIOs = Math.ceil(numPortasDIO / 48);
    }

    var resultado = {
      quantidadeDIOs: quantidadeDIOs,
      tipoDIO: tipoDIO,
      numConectores: numConectores,
      numAcopladores: numAcopladores,
      especsFibraMM: especsFibraMM,
      especsFibraSM: especsFibraSM,
      tipoCabo: tipoCabo,especsFibraSM
    };
    console.log(resultado);

    resultados.push(resultado);
  }
  console.log(resultados);
  return resultados;
}

// Supondo que você já tenha os dados em uma variável chamada "dados"

function processaDados() {
  let numBackBones = localStorage.getItem("numBackbones");
  var dados = processarDadosFormularios(numBackBones);
  var dadosP = processarDadosFormularioPrimario();
  console.log(dados);

  // Verifica se todos os campos estão preenchidos antes de prosseguir
  if (dados.every(temCamposPreenchidos)) {
    var resultados = processarResultados(dados);
    var resultadosP = processarResultadosPrimario(dadosP);
    console.log(resultados);
    localStorage.setItem("resultados", JSON.stringify(resultados));
    localStorage.setItem("resultadosP", JSON.stringify(resultadosP));
    resultadosRecuperados = JSON.parse(localStorage.getItem("resultados"));
    console.log(resultadosRecuperados);
    var tamanhoDoObjeto = 0;
    for (var numFibrasAndar in resultadosRecuperados) {
      if (resultadosRecuperados.hasOwnProperty(numFibrasAndar)) {
        tamanhoDoObjeto++;
      }
    }
    console.log(tamanhoDoObjeto);
    window.location.href = "resultado.html";
  } else {
    alert("Por favor, preencha todos os campos antes de enviar o formulário.");
  }
}

function temCamposPreenchidos(formulario) {
  for (var campo in formulario) {
    if (!formulario[campo]) {
      return false;
    }
  }
  return true;
}

let bntEnviar = document.getElementById("btnEnviar");

bntEnviar.addEventListener("click", function (event) {
  event.preventDefault(); // Previne o comportamento padrão do botão
  processaDados();
});
