/* =========================================================
   Kit de Mapas Mentais de Espanhol — interações da página
   ========================================================= */
(function () {
  'use strict';

  /* ---------------------------------------------------------
     1) BARRA DE URGÊNCIA — data de encerramento da oferta
     ---------------------------------------------------------
     DIAS_ATE_O_FIM = 0  -> a oferta "encerra hoje"
     DIAS_ATE_O_FIM = 2  -> encerra daqui a 2 dias, e assim por diante.
     Para travar uma data fixa, troque por: DATA_FIXA = '31/12/2026';
  --------------------------------------------------------- */
  var DIAS_ATE_O_FIM = 0;
  var DATA_FIXA = null;

  function iniciarDataPromocional() {
    var alvo = document.getElementById('promo-end-date');
    if (!alvo) return;

    if (DATA_FIXA) {
      alvo.textContent = DATA_FIXA;
      return;
    }

    var data = new Date();
    data.setDate(data.getDate() + DIAS_ATE_O_FIM);

    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    alvo.textContent = dia + '/' + mes + '/' + data.getFullYear();
  }

  /* ---------------------------------------------------------
     2) ORGANIZAÇÃO DO KIT — abas de níveis (A1 a C2)
     --------------------------------------------------------- */
  function iniciarNiveis() {
    var botoes = document.querySelectorAll('.curriculum-tab-btn');
    var placeholder = document.getElementById('curriculum-placeholder');
    if (!botoes.length) return;

    botoes.forEach(function (botao) {
      botao.addEventListener('click', function () {
        var nivel = botao.getAttribute('data-level');
        var painel = document.getElementById('pane-' + nivel);
        var jaEstavaAberto = botao.classList.contains('active');

        document.querySelectorAll('.curriculum-tab-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        document.querySelectorAll('.curriculum-pane').forEach(function (p) {
          p.classList.remove('active');
        });

        // Clicar no nível já aberto fecha e volta para o aviso inicial.
        if (jaEstavaAberto) {
          if (placeholder) placeholder.classList.remove('hidden');
          return;
        }

        botao.classList.add('active');
        if (painel) painel.classList.add('active');
        if (placeholder) placeholder.classList.add('hidden');
      });
    });
  }

  /* ---------------------------------------------------------
     3) FAQ — acordeão (abre um e fecha os demais)
     --------------------------------------------------------- */
  function iniciarFaq() {
    var gatilhos = document.querySelectorAll('.faq-trigger');
    if (!gatilhos.length) return;

    gatilhos.forEach(function (gatilho) {
      gatilho.addEventListener('click', function () {
        var item = gatilho.closest('.faq-item');
        var conteudo = item.querySelector('.faq-content');
        var abrindo = !item.classList.contains('active');

        document.querySelectorAll('.faq-item.active').forEach(function (aberto) {
          aberto.classList.remove('active');
          var c = aberto.querySelector('.faq-content');
          if (c) c.style.maxHeight = null;
        });

        if (abrindo) {
          item.classList.add('active');
          if (conteudo) conteudo.style.maxHeight = conteudo.scrollHeight + 40 + 'px';
        }
      });
    });

    // Reajusta a altura do item aberto quando a tela muda de tamanho.
    window.addEventListener('resize', function () {
      var aberto = document.querySelector('.faq-item.active .faq-content');
      if (aberto) aberto.style.maxHeight = aberto.scrollHeight + 40 + 'px';
    });
  }

  /* ---------------------------------------------------------
     4) Rolagem suave dos botões que apontam para a oferta
     --------------------------------------------------------- */
  function iniciarRolagemSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (evento) {
        var alvo = link.getAttribute('href');
        if (!alvo || alvo === '#') return;
        var destino = document.querySelector(alvo);
        if (!destino) return;
        evento.preventDefault();
        destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    iniciarDataPromocional();
    iniciarNiveis();
    iniciarFaq();
    iniciarRolagemSuave();
  });
})();
