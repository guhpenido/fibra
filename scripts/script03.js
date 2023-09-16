function gerarTabelaResultados() {
  var resultados = JSON.parse(localStorage.getItem("resultados"));
  console.log(resultados);
  var tamanhoDoObjeto = 0;
  for (var numFibrasAndar in resultados) {
    if (resultados.hasOwnProperty(numFibrasAndar)) {
      tamanhoDoObjeto++;
    }
  }
  console.log(tamanhoDoObjeto);
  var tableContainer = document.getElementById("table-container");
  // Loop para criar uma tabela para cada resultado
  for (var i = 0; i < tamanhoDoObjeto - 1; i++) {
    var resultado = resultados[i];

    // Cria uma div para a tabela
    var divTable = document.createElement("div");

    // Cria a tabela
    var table = document.createElement("table");
    table.id = "result-table-" + i; // Adicione um ID único para cada tabela

    // Cria o cabeçalho da tabela
    var thead = document.createElement("thead");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.textContent = "Resultado backbone secundário";
    tr.appendChild(th);
    thead.appendChild(tr);
    table.appendChild(thead);

    // Cria o corpo da tabela
    var tbody = document.createElement("tbody");

    // Adicione as linhas com os resultados aqui
    var linhas = [
      {
        qnt: resultado.numTerminadoresOpticos,
        texto: "Terminador Óptico para 8 fibras",
      },
      {
        qnt: resultado.numConectores,
        texto: "Conector óptico 50 x 125µm - MM - LC",
      },
      {
        qnt: resultado.numAcopladores,
        texto: "Acoplador óptico 50 x 125µm - MM - LC",
      },
      {
        qnt: resultado.numAcopladores,
        texto: "Acoplador óptico 50 x 125µm - SM - LC",
      },
      {
        qnt: resultado.numPigtais,
        texto: "Pig tail 50 x 125µm - MM - 1,5m - simples - conector LC",
      },
      {
        qnt: resultado.numCordoes,
        texto: "Cordão Óptico 50 x 125µm - MM - 3m - conector LC",
      },
      {
        qnt: resultado.numBandejaEmenda,
        texto:
          "Bandeja para emenda de fibra no DIO - (comporta até 12 emendas)",
      },
      {
        qnt: resultado.numMetragemCabo + "m",
        texto:
          "Cabo de Fibra Óptica Tight Buffer (FOMMIG) 50 x 125µm - com 5 fibras",
      },
    ];

    for (var j = 0; j < linhas.length; j++) {
      var linha = linhas[j];
      var tr = document.createElement("tr");
      var tdQnt = document.createElement("td");
      var tdTexto = document.createElement("td");
      tdQnt.textContent = linha.qnt;
      tdTexto.textContent = linha.texto;
      tr.appendChild(tdQnt);
      tr.appendChild(tdTexto);
      tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    divTable.appendChild(table);
    tableContainer.appendChild(divTable);
  }
  geraTabelaPrimaria();
  localStorage.setItem("resultados", "");
}

function geraTabelaPrimaria() {
  var resultados = JSON.parse(localStorage.getItem("resultadosP"));
  console.log(resultados);
  var tamanhoDoObjeto = 0;
  for (var numPortasDIO in resultados) {
    if (resultados.hasOwnProperty(numPortasDIO)) {
      tamanhoDoObjeto++;
    }
  }
  for (var i = 0; i < tamanhoDoObjeto; i++) {
    var resultado = resultados[i];
    var specs = "";
    if (resultado.tipoCabo == "monomodo") {
      specs = "SM " + resultado.especsFibraSM +" ";
    } else {
      specs = "MM " + resultado.especsFibraMM + " ";
    }

    document.getElementById("qntDio").innerHTML = resultado.quantidadeDIOs;
    document.getElementById("textoDio").innerHTML = resultado.tipoDIO;

    document.getElementById("qntConector").innerHTML = resultado.numConectores;
    document.getElementById("textoConector").innerHTML = "Conectores " + specs;

    document.getElementById("qntAcoplador").innerHTML =
      resultado.numAcopladores;
    document.getElementById("textoAcoplador").innerHTML = "Acopladores " + specs;
  }
}

// Supondo que você já tenha os resultados em uma variável chamada "resultados"

document.addEventListener("DOMContentLoaded", gerarTabelaResultados);
