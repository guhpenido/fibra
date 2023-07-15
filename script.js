// Função para calcular a quantificação de material para estrutura de fibra óptica
function calcularQuantidadeMaterial() {
  localStorage.setItem("qntTerminador", "0");
  localStorage.setItem("fibrasTerminador", "0");
  localStorage.setItem("conectorMM", "0");
  localStorage.setItem("acopladorMM", "0");
  localStorage.setItem("acopladorSM", "0");
  localStorage.setItem("pigtail", "0");
  localStorage.setItem("cordaoSM", "0");
  localStorage.setItem("emendas", "0");
  localStorage.setItem(metragemCabo, 0);
  // Obter valores do formulário
  var numPavimentos = parseInt(document.getElementById("numPavimentos").value);
  var numParesFibras = parseInt(
    document.getElementById("numParesFibras").value
  );
  var medidaBasica = parseFloat(document.getElementById("medidaBasica").value);
  var tipoCabo = document.getElementById("tipoCabo").value;
  var caracteristicaFibra = document.getElementById(
    "caracteristicaFibra"
  ).value;
  var numBackbonesAndar = parseInt(
    document.getElementById("numBackbonesAndar").value
  );
  var possuiBackbonePrimario = document.getElementById(
    "possuiBackbonePrimario"
  ).checked;
  var possuiBackboneSecundario = document.getElementById(
    "possuiBackboneSecundario"
  ).checked;

  // Cálculos para quantificação de material
  var numFibrasAndar = numBackbonesAndar * 2; // Cada backbone por andar requer 2 pares de fibras
  var numFibrasTotal = numFibrasAndar * numPavimentos; // Total de fibras (por andar * número de pavimentos)
  var numPortasDIO = numFibrasTotal + numParesFibras * 2; // A quantidade de fibras total determina a quantidade de portas no DIO
  var numConectores = numPortasDIO * 2; // A quantidade de portas é igual à quantidade de conectores
  var numAcopladores = numPortasDIO; // A quantidade de portas é igual à quantidade de acopladores
  var numBandejasEmenda = Math.ceil(numFibrasTotal / 12); // Arredondar para cima para obter a quantidade de bandejas de emenda
  var numTerminadoresOpticos = numPavimentos; // Cada andar deve ter um terminador óptico
  var numPigtais = numConectores;
  var numCordoes = numParesFibras * 2;
  var numEmendasSM = Math.ceil((numParesFibras * 2) / 12);
  var acopladorSM = numParesFibras * 2;

  var metragemCabo = calcularMetragemCabo(numPavimentos, medidaBasica);

  // Exibir resultados
  var tipoDIO;
  var quantidadeDIOs;

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

  localStorage.setItem("qntTerminador", numTerminadoresOpticos);
  localStorage.setItem("fibrasTerminador", numBackbonesAndar);
  localStorage.setItem("conectorMM", numConectores);
  localStorage.setItem("acopladorMM", numAcopladores);
  localStorage.setItem("acopladorSM", acopladorSM);
  localStorage.setItem("pigtail", numPigtais);
  localStorage.setItem("cordaoSM", numCordoes);
  localStorage.setItem("emendas", numBandejasEmenda);
  localStorage.setItem("cabo", metragemCabo);

  window.location.href = '/resutado.html';
}

// Função auxiliar para calcular a metragem total do cabo de fibra óptica
function calcularMetragemCabo(numPavimentos, medidaBasica) {
  var metragemTotal = 0;
  for (var i = 0; i <= numPavimentos; i++) {
    metragemTotal += medidaBasica * 2 * i; // Cada pavimento corresponde a duas vezes a medida básica
  }
  return metragemTotal;
}
