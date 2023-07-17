// Função para calcular a quantificação de material para estrutura de fibra óptica
// Function to check if all required fields are filled
function isFormValid() {
  var numPavimentos = document.getElementById("numPavimentos").value;
  var numParesFibras = document.getElementById("numParesFibras").value;
  var medidaBasica = document.getElementById("medidaBasica").value;
  var numBackbonesAndar = document.getElementById("numBackbonesAndar").value;

  return numPavimentos !== "" &&
    numParesFibras !== "" &&
    medidaBasica !== "" &&
    numBackbonesAndar !== "";
}

// Function to enable/disable the button based on the form validation
function updateButtonState() {
  var button = document.getElementById("botao");
  button.disabled = !isFormValid();
}

// Event listeners for input fields to update button state
document.getElementById("numPavimentos").addEventListener("input", updateButtonState);
document.getElementById("numParesFibras").addEventListener("input", updateButtonState);
document.getElementById("medidaBasica").addEventListener("input", updateButtonState);
document.getElementById("numBackbonesAndar").addEventListener("input", updateButtonState);

// Call the function initially to disable the button if the form is not valid
updateButtonState();

// Rest of your existing code...



function calcularQuantidadeMaterial() {
  localStorage.setItem("qntTerminador", "0");
  localStorage.setItem("fibrasTerminador", "0");
  localStorage.setItem("conectorMM", "0");
  localStorage.setItem("acopladorMM", "0");
  localStorage.setItem("acopladorSM", "0");
  localStorage.setItem("pigtail", "0");
  localStorage.setItem("cordaoSM", "0");
  localStorage.setItem("emendas", "0");
  localStorage.setItem("metragemCabo", "0");
  localStorage.setItem("numPavimentos", "0");
  localStorage.setItem("numParesFibras", "0");
  localStorage.setItem("medidaBasica", "0");
  localStorage.setItem("tipoCabo", "0");
  localStorage.setItem("caracteristicaFibra", "0");
  localStorage.setItem("backboneTipo", "0");

  
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
  var tipooo = document.getElementById("tipoBackbone").value;


  localStorage.setItem("numPavimentos", numPavimentos);
  localStorage.setItem("numParesFibras", numParesFibras);
  localStorage.setItem("medidaBasica", medidaBasica);
  localStorage.setItem("tipoCabo", tipoCabo);
  localStorage.setItem("caracteristicaFibra", caracteristicaFibra);
  localStorage.setItem("backboneTipo", tipooo);

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

  window.location.href = 'fibrateste.html';
}

// Função auxiliar para calcular a metragem total do cabo de fibra óptica
function calcularMetragemCabo(numPavimentos, medidaBasica) {
  var metragemTotal = 0;
  for (var i = 0; i <= numPavimentos; i++) {
    metragemTotal += medidaBasica * 2 * i; // Cada pavimento corresponde a duas vezes a medida básica
  }
  return metragemTotal;
}

function gerarPDF() {
  var doc = new jsPDF();

  var url = 'fibrateste.html';

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var conteudo = xhr.responseText;

      doc.fromHTML(conteudo, 15, 15, { 'width': 180 });


      doc.save('GMS - SOLUÇÕES DE REDE.pdf');
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}