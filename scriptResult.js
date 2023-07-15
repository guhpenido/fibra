// Função para executar ações ao carregar a página
function carregarPagina() {
  var aqntTerminador = document.getElementById("qntTerminador");
  var atextoTerminador = document.getElementById("textoTerminador");
  var aqntConectorMM = document.getElementById("qntConectorMM");
  var atextoConectorMM = document.getElementById("textoConectorMM");
  var aqntAcopladorMM = document.getElementById("qntAcopladorMM");
  var atextoAcopladorMM = document.getElementById("textoAcopladorMM");
  var aqntAcopladorSM = document.getElementById("qntAcopladorSM");
  var atextoAcopladorSM = document.getElementById("textoAcopladorSM");
  var aqntPigtail = document.getElementById("qntPigtail");
  var atextoPigtail = document.getElementById("textoPigtail");
  var aqntCordao = document.getElementById("qntCordao");
  var atextoCordao = document.getElementById("textoCordao");
  var aqntdBandeja = document.getElementById("qntdBandeja");
  var atextoBandeja = document.getElementById("textoBandeja");
  var aqntCabo = document.getElementById("qntCabo");
  var atextoCabo = document.getElementById("textoCabo");

  var qntTerminador = localStorage.getItem("qntTerminador");
  var fibrasTerminador = localStorage.getItem("fibrasTerminador");
  var conectorMM = localStorage.getItem("conectorMM");
  var acopladorMM = localStorage.getItem("acopladorMM");
  var acopladorSM = localStorage.getItem("acopladorSM");
  var pigtail = localStorage.getItem("pigtail");
  var cordaoSM = localStorage.getItem("cordaoSM");
  var emendas = localStorage.getItem("emendas");
  var cabo = localStorage.getItem("cabo");

  aqntTerminador.innerHTML = qntTerminador;
  atextoTerminador.innerHTML = "Terminador Óptico para " + fibrasTerminador + " fibras";
  aqntConectorMM.innerHTML = conectorMM;
  aqntAcopladorMM.innerHTML = acopladorMM;
  aqntAcopladorSM.innerHTML = acopladorSM;
  aqntPigtail.innerHTML = pigtail;
  aqntCordao.innerHTML = cordaoSM;
  aqntdBandeja.innerHTML = emendas;
  aqntCabo.innerHTML = cabo + "m";
  atextoCabo.innerHTML = "Cabo de Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com " + fibrasTerminador + " fibras";
}

document.addEventListener("DOMContentLoaded", carregarPagina);
