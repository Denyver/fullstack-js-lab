const data = new Date();
const dataFormatada = formatData(data);

function formatData(data) {
  let diaSemana = data.getDay();
  let dia = data.getDate();
  dia = dia < 10 ? "0" + dia : dia;
  let mes = data.getMonth() + 1;
  mes = mes < 10 ? "0" + mes : mes;
  let ano = data.getFullYear();
  let horas = data.getHours();
  let min = data.getMinutes();
  let sec = data.getSeconds();

  return { diaSemana, dia, mes, ano, horas, min, sec };
}

function get_dia_da_semana(diaSemana) {
  var diaSemanaTexto;

  switch (diaSemana) {
    case 0:
      diaSemanaTexto = "Domingo";
      return diaSemanaTexto;
    case 1:
      diaSemanaTexto = "Segunda";
      return diaSemanaTexto;
    case 2:
      diaSemanaTexto = "Terça";
      return diaSemanaTexto;
    case 3:
      diaSemanaTexto = "Quarta";
      return diaSemanaTexto;
    case 4:
      diaSemanaTexto = "Quinta";
      return diaSemanaTexto;
    case 5:
      diaSemanaTexto = "Sexta";
      return diaSemanaTexto;
    case 6:
      diaSemanaTexto = "Sábado";
      return diaSemanaTexto;
    default:
      diaSemanaTexto = ''
      return diaSemanaTexto;
  }

  return diaSemanaTexto;
}

console.log(
  `Hoje é ${get_dia_da_semana(dataFormatada.diaSemana)} ${dataFormatada.dia}/${dataFormatada.mes}/${dataFormatada.ano}`);
