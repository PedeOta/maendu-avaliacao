import { useState, useCallback } from 'react';
import { Star, ArrowLeft, RefreshCw, LogOut, CheckCircle2, Trash2 } from 'lucide-react';

const ADMIN_NOME = 'MERCUREMAENDU';
const ADMIN_APARTAMENTO = '0000';

const NOME_HOTEL = 'Mercure Hotels';
const NOME_RESTAURANTE = 'Maendú';

const CORES = {
  verde: '#1E3D2F',
  verdeEscuro: '#152C22',
  sage: '#4A6F58',
  creme: '#F7F5EF',
  linha: '#D9E0D6',
  estrela: '#2A5540',
};

const CATEGORIAS = ['atendimento', 'ambiente', 'espera', 'sabor', 'higiene'];

// Locale usado na formatação de datas (Intl), por idioma detectado do navegador.
const LOCALE_DATA = {
  pt: 'pt-BR',
  en: 'en-US',
  es: 'es-ES',
};

// Textos da interface, adaptados ao idioma padrão do navegador da pessoa.
const IDIOMAS = {
  pt: {
    intro: {
      titulo: 'Como foi sua experiência no Maendú?',
      subtitulo: 'Conte pra gente como foi sua refeição. Leva menos de um minuto.',
      labelNome: 'Nome',
      placeholderNome: 'Seu nome',
      labelApartamento: 'Número do apartamento',
      placeholderApartamento: 'Ex.: 151',
      continuar: 'Continuar',
      anonimo: 'Avaliar anonimamente',
    },
    pesquisa: {
      voltar: 'Voltar',
      titulo: 'Sua avaliação',
      subtituloAnonimo: 'Sua resposta sobre o Maendú será enviada sem identificação.',
      subtituloNomeado: (primeiroNome) => `Obrigado, ${primeiroNome}. Conte como foi sua experiência no Maendú.`,
      notaGeral: 'Nota geral',
      labelAtendente: 'Nome de quem te atendeu (opcional)',
      placeholderAtendente: 'Ex.: João',
      labelComentario: 'Quer contar mais alguma coisa? (opcional)',
      placeholderComentario: 'Escreva aqui',
      enviar: 'Enviar avaliação',
      enviando: 'Enviando...',
    },
    categorias: {
      atendimento: 'Atendimento',
      ambiente: 'Ambiente',
      espera: 'Tempo de espera',
      sabor: 'Sabor',
      higiene: 'Higiene',
    },
    obrigado: {
      titulo: 'Obrigado pela sua avaliação',
      subtitulo: 'Sua opinião ajuda a melhorar a experiência de todos que visitam o Maendú.',
      concluir: 'Concluir',
    },
    admin: {
      painel: 'Painel de avaliações',
      atualizar: 'Atualizar',
      sair: 'Sair',
      recebidas: 'Avaliações recebidas',
      mediaGeral: 'Nota média geral',
      carregando: 'Carregando avaliações...',
      tentarNovamente: 'Tentar novamente',
      vazio: 'As avaliações enviadas pelos hóspedes vão aparecer aqui.',
      anonimo: 'Anônimo',
      semNome: 'Sem nome',
      apartamento: 'Apartamento',
      atendidoPor: (nome) => `Atendido por ${nome}`,
      excluir: 'Excluir',
      excluindo: 'Excluindo...',
      cancelar: 'Cancelar',
      confirmarExclusao: 'Excluir esta avaliação?',
    },
    erros: {
      camposObrigatorios: 'Preencha seu nome e o número do apartamento.',
      quartoInexistente: 'Esse número de apartamento não existe. Confira e tente novamente.',
      notaGeralObrigatoria: 'Selecione uma nota geral para continuar.',
      falhaEnvio: 'Não foi possível enviar sua avaliação. Tente novamente.',
      falhaCarregarAdmin: 'Não foi possível carregar as avaliações agora.',
      falhaExcluir: 'Não foi possível excluir essa avaliação agora.',
    },
  },
  en: {
    intro: {
      titulo: 'How was your experience at Maendú?',
      subtitulo: 'Tell us about your meal. It takes less than a minute.',
      labelNome: 'Name',
      placeholderNome: 'Your name',
      labelApartamento: 'Room number',
      placeholderApartamento: 'E.g.: 151',
      continuar: 'Continue',
      anonimo: 'Rate anonymously',
    },
    pesquisa: {
      voltar: 'Back',
      titulo: 'Your review',
      subtituloAnonimo: 'Your feedback about Maendú will be sent without identification.',
      subtituloNomeado: (primeiroNome) => `Thanks, ${primeiroNome}. Tell us about your experience at Maendú.`,
      notaGeral: 'Overall rating',
      labelAtendente: 'Name of who served you (optional)',
      placeholderAtendente: 'E.g.: John',
      labelComentario: 'Anything else you would like to share? (optional)',
      placeholderComentario: 'Write here',
      enviar: 'Submit review',
      enviando: 'Sending...',
    },
    categorias: {
      atendimento: 'Service',
      ambiente: 'Ambience',
      espera: 'Wait time',
      sabor: 'Taste',
      higiene: 'Cleanliness',
    },
    obrigado: {
      titulo: 'Thank you for your review',
      subtitulo: 'Your feedback helps improve the experience for everyone who visits Maendú.',
      concluir: 'Done',
    },
    admin: {
      painel: 'Reviews panel',
      atualizar: 'Refresh',
      sair: 'Log out',
      recebidas: 'Reviews received',
      mediaGeral: 'Average overall rating',
      carregando: 'Loading reviews...',
      tentarNovamente: 'Try again',
      vazio: 'Reviews submitted by guests will appear here.',
      anonimo: 'Anonymous',
      semNome: 'No name',
      apartamento: 'Room',
      atendidoPor: (nome) => `Served by ${nome}`,
      excluir: 'Delete',
      excluindo: 'Deleting...',
      cancelar: 'Cancel',
      confirmarExclusao: 'Delete this review?',
    },
    erros: {
      camposObrigatorios: 'Please fill in your name and room number.',
      quartoInexistente: 'That room number does not exist. Please check and try again.',
      notaGeralObrigatoria: 'Select an overall rating to continue.',
      falhaEnvio: 'We could not submit your review. Please try again.',
      falhaCarregarAdmin: 'We could not load the reviews right now.',
      falhaExcluir: 'We could not delete this review right now.',
    },
  },
  es: {
    intro: {
      titulo: '¿Cómo fue tu experiencia en Maendú?',
      subtitulo: 'Cuéntanos cómo fue tu comida. Toma menos de un minuto.',
      labelNome: 'Nombre',
      placeholderNome: 'Tu nombre',
      labelApartamento: 'Número de habitación',
      placeholderApartamento: 'Ej.: 151',
      continuar: 'Continuar',
      anonimo: 'Evaluar de forma anónima',
    },
    pesquisa: {
      voltar: 'Volver',
      titulo: 'Tu evaluación',
      subtituloAnonimo: 'Tu respuesta sobre Maendú se enviará sin identificación.',
      subtituloNomeado: (primeiroNome) => `Gracias, ${primeiroNome}. Cuéntanos cómo fue tu experiencia en Maendú.`,
      notaGeral: 'Calificación general',
      labelAtendente: 'Nombre de quien te atendió (opcional)',
      placeholderAtendente: 'Ej.: Juan',
      labelComentario: '¿Quieres contarnos algo más? (opcional)',
      placeholderComentario: 'Escribe aquí',
      enviar: 'Enviar evaluación',
      enviando: 'Enviando...',
    },
    categorias: {
      atendimento: 'Atención',
      ambiente: 'Ambiente',
      espera: 'Tiempo de espera',
      sabor: 'Sabor',
      higiene: 'Higiene',
    },
    obrigado: {
      titulo: 'Gracias por tu evaluación',
      subtitulo: 'Tu opinión ayuda a mejorar la experiencia de todos los que visitan Maendú.',
      concluir: 'Listo',
    },
    admin: {
      painel: 'Panel de evaluaciones',
      atualizar: 'Actualizar',
      sair: 'Salir',
      recebidas: 'Evaluaciones recibidas',
      mediaGeral: 'Calificación general promedio',
      carregando: 'Cargando evaluaciones...',
      tentarNovamente: 'Intentar de nuevo',
      vazio: 'Las evaluaciones enviadas por los huéspedes aparecerán aquí.',
      anonimo: 'Anónimo',
      semNome: 'Sin nombre',
      apartamento: 'Habitación',
      atendidoPor: (nome) => `Atendido por ${nome}`,
      excluir: 'Eliminar',
      excluindo: 'Eliminando...',
      cancelar: 'Cancelar',
      confirmarExclusao: '¿Eliminar esta evaluación?',
    },
    erros: {
      camposObrigatorios: 'Completa tu nombre y el número de habitación.',
      quartoInexistente: 'Ese número de habitación no existe. Verifícalo e inténtalo de nuevo.',
      notaGeralObrigatoria: 'Selecciona una calificación general para continuar.',
      falhaEnvio: 'No pudimos enviar tu evaluación. Inténtalo de nuevo.',
      falhaCarregarAdmin: 'No pudimos cargar las evaluaciones en este momento.',
      falhaExcluir: 'No pudimos eliminar esta evaluación en este momento.',
    },
  },
};

function detectarIdioma() {
  try {
    const preferido =
      (typeof navigator !== 'undefined' &&
        (navigator.language || (navigator.languages && navigator.languages[0]))) ||
      'pt';
    const base = preferido.slice(0, 2).toLowerCase();
    return IDIOMAS[base] ? base : 'pt';
  } catch (_) {
    return 'pt';
  }
}

function criarNotasVazias() {
  return CATEGORIAS.reduce((acc, chave) => ({ ...acc, [chave]: 0 }), {});
}

/**
 * Mapa de quartos existentes no hotel:
 * - Andares 1 a 9: finais 51, 53, 55, 57, ..., 73 (ex.: 151, 153, ..., 973)
 * - Andares 1 e 2 têm também o quarto extra com final 75 (175 e 275)
 * - Andar 10: apenas 1065, 1067, 1069, 1071 e 1073
 */
function gerarQuartosValidos() {
  const finais = [51, 53, 55, 57, 59, 61, 63, 65, 67, 69, 71, 73];
  const validos = new Set();
  for (let andar = 1; andar <= 9; andar++) {
    finais.forEach((final) => validos.add(andar * 100 + final));
  }
  validos.add(175);
  validos.add(275);
  [65, 67, 69, 71, 73].forEach((final) => validos.add(1000 + final));
  return validos;
}

const QUARTOS_VALIDOS = gerarQuartosValidos();

function quartoExiste(valor) {
  const limpo = valor.trim();
  if (!/^\d+$/.test(limpo)) return false;
  return QUARTOS_VALIDOS.has(Number(limpo));
}

// Raminho de alecrim do logo do Maendú: a arte original com o fundo verde
// recortado, recolorida no creme da marca. PNG embutido em base64.
const ALECRIM_SRC =
  'data:image/png;base64,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';

function Alecrim({ largura = 168, style }) {
  return (
    <img
      src={ALECRIM_SRC}
      alt=""
      aria-hidden="true"
      className="alecrim"
      style={{ width: largura, ...style }}
    />
  );
}

function Estrelas({ valor, aoMudar, tamanho = 26, somenteLeitura = false, rotulo }) {
  return (
    <div className="linha-estrelas" role={somenteLeitura ? undefined : 'radiogroup'} aria-label={rotulo}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role={somenteLeitura ? undefined : 'radio'}
          aria-checked={somenteLeitura ? undefined : valor === n}
          aria-label={`${n} de 5`}
          className={`botao-estrela${somenteLeitura ? ' somente-leitura' : ''}`}
          onClick={somenteLeitura ? undefined : () => aoMudar(n)}
          tabIndex={somenteLeitura ? -1 : 0}
        >
          <Star
            size={tamanho}
            fill={n <= valor ? CORES.estrela : 'none'}
            stroke={n <= valor ? CORES.estrela : CORES.linha}
            strokeWidth={1.6}
          />
        </button>
      ))}
    </div>
  );
}

function Marca({ compacta = false }) {
  return (
    <div className={`topo-marca${compacta ? ' compacta' : ''}`}>
      <Alecrim largura={compacta ? 76 : 176} />
      <div className="assinatura">
        <span className="nome-marca">maendú</span>
        {!compacta && (
          <span className="tagline">
            sabores do brasil
            <i className="pontos" aria-hidden="true">
              <b /><b /><b />
            </i>
          </span>
        )}
      </div>
    </div>
  );
}

export default function AvaliacaoHospede() {
  const [tela, setTela] = useState('inicio'); // inicio | pesquisa | obrigado | admin
  const [nome, setNome] = useState('');
  const [apartamento, setApartamento] = useState('');
  const [anonimo, setAnonimo] = useState(false);
  const [erroInicio, setErroInicio] = useState('');

  const [notas, setNotas] = useState(criarNotasVazias());
  const [notaGeral, setNotaGeral] = useState(0);
  const [atendidoPor, setAtendidoPor] = useState('');
  const [comentario, setComentario] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erroPesquisa, setErroPesquisa] = useState('');

  const [avaliacoes, setAvaliacoes] = useState([]);
  const [carregandoAdmin, setCarregandoAdmin] = useState(false);
  const [erroAdmin, setErroAdmin] = useState('');
  const [excluindoChave, setExcluindoChave] = useState(null);
  const [confirmandoChave, setConfirmandoChave] = useState(null);

  const idioma = detectarIdioma();
  const t = IDIOMAS[idioma];

  const carregarAvaliacoes = useCallback(async () => {
    setCarregandoAdmin(true);
    setErroAdmin('');
    try {
      const lista = await window.storage.list('avaliacao:', true);
      const chaves = lista?.keys || [];
      const itens = [];
      for (const chave of chaves) {
        try {
          const resultado = await window.storage.get(chave, true);
          if (resultado?.value) itens.push({ ...JSON.parse(resultado.value), _chave: chave });
        } catch (_) {
          // ignora item corrompido
        }
      }
      itens.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setAvaliacoes(itens);
    } catch (_) {
      setErroAdmin(t.erros.falhaCarregarAdmin);
    } finally {
      setCarregandoAdmin(false);
    }
  }, []);

  async function excluirAvaliacao(chave) {
    setExcluindoChave(chave);
    try {
      await window.storage.delete(chave, true);
      setAvaliacoes((prev) => prev.filter((a) => a._chave !== chave));
    } catch (_) {
      setErroAdmin(t.erros.falhaExcluir);
    } finally {
      setExcluindoChave(null);
      setConfirmandoChave(null);
    }
  }

  function reiniciar() {
    setNome('');
    setApartamento('');
    setAnonimo(false);
    setErroInicio('');
    setNotas(criarNotasVazias());
    setNotaGeral(0);
    setAtendidoPor('');
    setComentario('');
    setErroPesquisa('');
    setConfirmandoChave(null);
    setTela('inicio');
  }

  function aoContinuar() {
    const n = nome.trim();
    const a = apartamento.trim();
    if (!n || !a) {
      setErroInicio(t.erros.camposObrigatorios);
      return;
    }
    if (n.toUpperCase() === ADMIN_NOME && a === ADMIN_APARTAMENTO) {
      setErroInicio('');
      setTela('admin');
      carregarAvaliacoes();
      return;
    }
    if (!quartoExiste(a)) {
      setErroInicio(t.erros.quartoInexistente);
      return;
    }
    setErroInicio('');
    setAnonimo(false);
    setTela('pesquisa');
  }

  function aoClicarAnonimo() {
    setErroInicio('');
    setAnonimo(true);
    setTela('pesquisa');
  }

  async function enviarAvaliacao() {
    if (notaGeral === 0) {
      setErroPesquisa(t.erros.notaGeralObrigatoria);
      return;
    }
    setErroPesquisa('');
    setEnviando(true);
    try {
      const registro = {
        nome: anonimo ? null : nome.trim(),
        apartamento: anonimo ? null : apartamento.trim(),
        anonimo,
        notaGeral,
        notas,
        atendidoPor: atendidoPor.trim() || null,
        comentario: comentario.trim(),
        timestamp: Date.now(),
      };
      const chave = `avaliacao:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const resultado = await window.storage.set(chave, JSON.stringify(registro), true);
      if (!resultado) throw new Error('sem-resultado');
      setTela('obrigado');
    } catch (_) {
      setErroPesquisa(t.erros.falhaEnvio);
    } finally {
      setEnviando(false);
    }
  }

  const totalAvaliacoes = avaliacoes.length;
  const mediaGeral = totalAvaliacoes
    ? (avaliacoes.reduce((s, a) => s + (a.notaGeral || 0), 0) / totalAvaliacoes).toFixed(1)
    : null;

  return (
    <div className="pagina">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,450;9..144,560;9..144,650&family=Inter:wght@400;500;600&family=Jost:wght@200;300;400&display=swap');

        .pagina {
          --tinta: #16241C;
          --papel: #FBFAF5;
          --papel-2: #EDF0E8;
          --verde: #1E3D2F;
          --verde-escuro: #152C22;
          --verde-claro: #2A5540;
          --sage: #4A6F58;
          --linha: #D9E0D6;
          --linha-marca: rgba(247,245,239,0.28);
          --erro: #A8432B;
          --texto-suave: #5B6656;

          min-height: 100vh;
          width: 100%;
          background:
            radial-gradient(120% 90% at 50% 0%, #24493A 0%, var(--verde) 55%, var(--verde-escuro) 100%);
          display: flex;
          justify-content: center;
          padding: 32px 16px;
          font-family: 'Inter', sans-serif;
          color: var(--tinta);
          box-sizing: border-box;
        }
        .pagina, .pagina * { box-sizing: border-box; }

        .cartao {
          width: 100%;
          max-width: 430px;
          background: var(--papel);
          border-radius: 18px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 4px rgba(10,24,18,0.12), 0 26px 60px -24px rgba(10,24,18,0.55);
          overflow: hidden;
          align-self: flex-start;
        }

        /* ---------- assinatura da marca ---------- */
        .topo-marca {
          background: var(--verde);
          color: var(--papel);
          padding: 24px 24px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .topo-marca.compacta {
          flex-direction: row;
          justify-content: center;
          gap: 12px;
          padding: 16px 24px;
        }
        .alecrim { display: block; height: auto; user-select: none; -webkit-user-drag: none; }
        .topo-marca.compacta .alecrim { margin-bottom: 2px; }
        .assinatura { display: flex; flex-direction: column; align-items: center; gap: 7px; }
        .nome-marca {
          font-family: 'Jost', 'Inter', sans-serif;
          font-weight: 200;
          font-size: 30px;
          line-height: 1;
          letter-spacing: 0.2em;
          text-indent: 0.2em;
          color: var(--papel);
        }
        .topo-marca.compacta .nome-marca { font-size: 20px; }
        .tagline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 9px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.34em;
          text-indent: 0.34em;
          color: rgba(247,245,239,0.82);
        }
        .pontos { display: inline-flex; gap: 4px; align-items: center; }
        .pontos b { width: 4px; height: 4px; border-radius: 50%; background: rgba(247,245,239,0.9); display: block; }

        .faixa-progresso {
          height: 3px;
          background: var(--papel-2);
          position: relative;
        }
        .faixa-progresso::after {
          content: '';
          position: absolute;
          inset: 0;
          width: var(--progresso, 50%);
          background: var(--verde-claro);
          transition: width 0.4s ease;
        }

        .conteudo { padding: 30px 28px 30px; }
        h1.titulo {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 27px;
          line-height: 1.18;
          margin: 0 0 8px;
          color: var(--tinta);
        }
        p.subtitulo {
          margin: 0 0 26px;
          color: var(--texto-suave);
          font-size: 15px;
          line-height: 1.5;
        }
        .campo { margin-bottom: 16px; }
        .campo label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--tinta);
          margin-bottom: 6px;
        }
        .campo input, .campo textarea {
          width: 100%;
          border: 1px solid var(--linha);
          background: var(--papel);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 16px;
          font-family: inherit;
          color: var(--tinta);
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .campo input:focus, .campo textarea:focus {
          border-color: var(--verde);
          box-shadow: 0 0 0 3px rgba(30,61,47,0.09);
        }
        .campo textarea { resize: vertical; min-height: 84px; line-height: 1.5; }

        .botao-primario {
          width: 100%;
          background: var(--verde);
          color: var(--papel);
          border: none;
          border-radius: 10px;
          padding: 14px 18px;
          font-size: 15.5px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }
        .botao-primario:hover { background: var(--verde-escuro); }
        .botao-primario:active { transform: scale(0.99); }
        .botao-primario:disabled { opacity: 0.6; cursor: default; }

        .botao-secundario {
          width: 100%;
          background: transparent;
          color: var(--tinta);
          border: 1px solid var(--linha);
          border-radius: 10px;
          padding: 13px 18px;
          font-size: 15px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          margin-top: 10px;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .botao-secundario:hover { border-color: var(--verde); background: rgba(30,61,47,0.06); }

        .botao-texto {
          background: none;
          border: none;
          color: var(--texto-suave);
          font-family: inherit;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 4px 0;
        }
        .botao-texto:hover { color: var(--verde); }

        .erro { color: var(--erro); font-size: 13.5px; margin: -6px 0 16px; }
        .divisor { height: 1px; background: var(--linha); margin: 22px 0; }

        .bloco-nota {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--linha);
        }
        .bloco-nota:last-of-type { border-bottom: none; }
        .bloco-nota span.rotulo { font-size: 14.5px; color: var(--tinta); }

        .linha-estrelas { display: flex; gap: 4px; }
        .botao-estrela { background: none; border: none; padding: 2px; cursor: pointer; line-height: 0; }
        .botao-estrela.somente-leitura { cursor: default; padding: 1px; }
        .botao-estrela:focus-visible { outline: 2px solid var(--verde); outline-offset: 2px; border-radius: 4px; }

        .geral-caixa {
          background: var(--papel-2);
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 4px 0 22px;
        }
        .geral-caixa span.rotulo { font-size: 15px; font-weight: 500; }

        .tela-obrigado { text-align: center; padding: 40px 28px 34px; }
        .selo-obrigado {
          width: 62px; height: 62px; border-radius: 50%;
          background: var(--papel-2); color: var(--verde);
          display: inline-flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }

        .cabecalho-admin {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid var(--linha);
          gap: 10px;
        }
        .cabecalho-admin h2 {
          font-family: 'Fraunces', serif;
          font-weight: 560;
          font-size: 19px;
          margin: 0;
        }
        .marca-admin { font-size: 12.5px; color: var(--texto-suave); margin: 3px 0 0; }
        .icone-botao {
          background: none; border: none; color: var(--texto-suave);
          cursor: pointer; padding: 6px 8px; border-radius: 8px;
          display: inline-flex; align-items: center; gap: 6px; font-family: inherit; font-size: 13px;
          white-space: nowrap;
        }
        .icone-botao:hover { color: var(--verde); background: var(--papel-2); }

        .estatisticas { display: flex; gap: 28px; padding: 18px 24px; border-bottom: 1px solid var(--linha); }
        .estatistica .numero { font-family: 'Fraunces', serif; font-size: 26px; font-weight: 560; color: var(--verde); line-height: 1; }
        .estatistica .rotulo { font-size: 12.5px; color: var(--texto-suave); margin-top: 4px; }

        .lista-avaliacoes { max-height: 62vh; overflow-y: auto; }
        .item-avaliacao { padding: 18px 24px; border-bottom: 1px solid var(--linha); }
        .item-topo { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 10px; }
        .item-hospede { font-size: 14.5px; font-weight: 500; color: var(--tinta); }
        .item-apartamento { font-size: 13px; color: var(--texto-suave); margin-top: 1px; }
        .item-data { font-size: 12.5px; color: var(--texto-suave); white-space: nowrap; margin-top: 4px; }
        .grade-categorias { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; margin: 10px 0; }
        .categoria-mini { display: flex; align-items: center; justify-content: space-between; }
        .categoria-mini span.rotulo-mini { font-size: 12.5px; color: var(--texto-suave); }
        .atendente-item { font-size: 13px; color: var(--texto-suave); margin: 8px 0 0; }
        .comentario-item {
          font-size: 13.5px; color: var(--tinta); background: var(--papel-2);
          border-radius: 8px; padding: 10px 12px; margin-top: 8px; line-height: 1.5;
        }
        .vazio-admin, .erro-admin, .carregando-admin { padding: 48px 24px; text-align: center; color: var(--texto-suave); font-size: 14px; line-height: 1.6; }

        .rodape-item { margin-top: 10px; display: flex; justify-content: flex-end; }
        .botao-excluir-item {
          background: none; border: none; color: var(--texto-suave);
          font-family: inherit; font-size: 12.5px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 6px; border-radius: 6px;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .botao-excluir-item:hover { color: var(--erro); background: rgba(168,67,43,0.08); }

        .confirma-exclusao {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: rgba(168,67,43,0.07);
          border: 1px solid rgba(168,67,43,0.25);
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 12.5px;
          color: var(--tinta);
        }
        .confirma-botoes { display: flex; gap: 6px; flex-shrink: 0; }
        .botao-confirma-nao, .botao-confirma-sim {
          font-family: inherit; font-size: 12px; font-weight: 500;
          border-radius: 6px; padding: 5px 10px; cursor: pointer; border: none;
        }
        .botao-confirma-nao { background: transparent; color: var(--texto-suave); border: 1px solid var(--linha); }
        .botao-confirma-nao:hover { color: var(--tinta); }
        .botao-confirma-sim { background: var(--erro); color: var(--papel); }
        .botao-confirma-sim:hover { background: #8f3a25; }
        .botao-confirma-nao:disabled, .botao-confirma-sim:disabled { opacity: 0.6; cursor: default; }
      `}</style>

      {(tela === 'inicio' || tela === 'pesquisa' || tela === 'obrigado') && (
        <div className="cartao">
          <Marca compacta={tela !== 'inicio'} />

          <div
            className="faixa-progresso"
            style={{ '--progresso': tela === 'inicio' ? '0%' : tela === 'pesquisa' ? '55%' : '100%' }}
          />

          {tela === 'inicio' && (
            <div className="conteudo">
              <h1 className="titulo">{t.intro.titulo}</h1>
              <p className="subtitulo">{t.intro.subtitulo}</p>

              <div className="campo">
                <label htmlFor="campo-nome">{t.intro.labelNome}</label>
                <input
                  id="campo-nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder={t.intro.placeholderNome}
                  autoComplete="name"
                />
              </div>
              <div className="campo">
                <label htmlFor="campo-apartamento">{t.intro.labelApartamento}</label>
                <input
                  id="campo-apartamento"
                  type="text"
                  inputMode="numeric"
                  value={apartamento}
                  onChange={(e) => setApartamento(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') aoContinuar(); }}
                  placeholder={t.intro.placeholderApartamento}
                />
              </div>

              {erroInicio && <p className="erro" role="alert">{erroInicio}</p>}

              <button className="botao-primario" onClick={aoContinuar}>{t.intro.continuar}</button>
              <button className="botao-secundario" onClick={aoClicarAnonimo}>{t.intro.anonimo}</button>
            </div>
          )}

          {tela === 'pesquisa' && (
            <div className="conteudo">
              <button className="botao-texto" onClick={() => setTela('inicio')} style={{ marginBottom: 10 }}>
                <ArrowLeft size={15} /> {t.pesquisa.voltar}
              </button>
              <h1 className="titulo">{t.pesquisa.titulo}</h1>
              <p className="subtitulo">
                {anonimo
                  ? t.pesquisa.subtituloAnonimo
                  : t.pesquisa.subtituloNomeado(nome.trim().split(' ')[0])}
              </p>

              <div className="geral-caixa">
                <span className="rotulo">{t.pesquisa.notaGeral}</span>
                <Estrelas valor={notaGeral} aoMudar={setNotaGeral} tamanho={28} rotulo={t.pesquisa.notaGeral} />
              </div>

              {CATEGORIAS.map((chave) => (
                <div className="bloco-nota" key={chave}>
                  <span className="rotulo">{t.categorias[chave]}</span>
                  <Estrelas
                    valor={notas[chave]}
                    aoMudar={(v) => setNotas((prev) => ({ ...prev, [chave]: v }))}
                    tamanho={20}
                    rotulo={t.categorias[chave]}
                  />
                </div>
              ))}

              <div className="divisor" />

              <div className="campo">
                <label htmlFor="campo-atendente">{t.pesquisa.labelAtendente}</label>
                <input
                  id="campo-atendente"
                  type="text"
                  value={atendidoPor}
                  onChange={(e) => setAtendidoPor(e.target.value)}
                  placeholder={t.pesquisa.placeholderAtendente}
                />
              </div>

              <div className="campo">
                <label htmlFor="campo-comentario">{t.pesquisa.labelComentario}</label>
                <textarea
                  id="campo-comentario"
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  placeholder={t.pesquisa.placeholderComentario}
                />
              </div>

              {erroPesquisa && <p className="erro" role="alert">{erroPesquisa}</p>}

              <button className="botao-primario" onClick={enviarAvaliacao} disabled={enviando}>
                {enviando ? t.pesquisa.enviando : t.pesquisa.enviar}
              </button>
            </div>
          )}

          {tela === 'obrigado' && (
            <div className="tela-obrigado">
              <div className="selo-obrigado">
                <CheckCircle2 size={30} strokeWidth={1.5} />
              </div>
              <h1 className="titulo">{t.obrigado.titulo}</h1>
              <p className="subtitulo">{t.obrigado.subtitulo}</p>
              <button className="botao-primario" onClick={reiniciar}>{t.obrigado.concluir}</button>
            </div>
          )}
        </div>
      )}

      {tela === 'admin' && (
        <div className="cartao" style={{ maxWidth: 480 }}>
          <Marca compacta />

          <div className="cabecalho-admin">
            <div>
              <h2>{t.admin.painel}</h2>
              <p className="marca-admin">{NOME_HOTEL} e {NOME_RESTAURANTE}</p>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="icone-botao" onClick={carregarAvaliacoes}>
                <RefreshCw size={15} /> {t.admin.atualizar}
              </button>
              <button className="icone-botao" onClick={reiniciar}>
                <LogOut size={15} /> {t.admin.sair}
              </button>
            </div>
          </div>

          <div className="estatisticas">
            <div className="estatistica">
              <div className="numero">{totalAvaliacoes}</div>
              <div className="rotulo">{t.admin.recebidas}</div>
            </div>
            <div className="estatistica">
              <div className="numero">{mediaGeral ?? '—'}</div>
              <div className="rotulo">{t.admin.mediaGeral}</div>
            </div>
          </div>

          {carregandoAdmin && <div className="carregando-admin">{t.admin.carregando}</div>}

          {!carregandoAdmin && erroAdmin && (
            <div className="erro-admin">
              {erroAdmin}
              <div style={{ marginTop: 12 }}>
                <button className="botao-secundario" onClick={carregarAvaliacoes}>{t.admin.tentarNovamente}</button>
              </div>
            </div>
          )}

          {!carregandoAdmin && !erroAdmin && totalAvaliacoes === 0 && (
            <div className="vazio-admin">{t.admin.vazio}</div>
          )}

          {!carregandoAdmin && !erroAdmin && totalAvaliacoes > 0 && (
            <div className="lista-avaliacoes">
              {avaliacoes.map((a, i) => (
                <div className="item-avaliacao" key={i}>
                  <div className="item-topo">
                    <div>
                      <div className="item-hospede">{a.anonimo ? t.admin.anonimo : (a.nome || t.admin.semNome)}</div>
                      {!a.anonimo && <div className="item-apartamento">{t.admin.apartamento} {a.apartamento || '—'}</div>}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Estrelas valor={a.notaGeral || 0} aoMudar={() => {}} tamanho={16} somenteLeitura rotulo={t.pesquisa.notaGeral} />
                      <div className="item-data">
                        {a.timestamp
                          ? new Date(a.timestamp).toLocaleString(LOCALE_DATA[idioma], { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
                          : ''}
                      </div>
                    </div>
                  </div>

                  <div className="grade-categorias">
                    {CATEGORIAS.map((chave) => (
                      <div className="categoria-mini" key={chave}>
                        <span className="rotulo-mini">{t.categorias[chave]}</span>
                        <Estrelas valor={(a.notas && a.notas[chave]) || 0} aoMudar={() => {}} tamanho={13} somenteLeitura rotulo={t.categorias[chave]} />
                      </div>
                    ))}
                  </div>

                  {a.atendidoPor && (
                    <p className="atendente-item">{t.admin.atendidoPor(a.atendidoPor)}</p>
                  )}
                  {a.comentario && <div className="comentario-item">{a.comentario}</div>}

                  <div className="rodape-item">
                    {confirmandoChave === a._chave ? (
                      <div className="confirma-exclusao">
                        <span>{t.admin.confirmarExclusao}</span>
                        <div className="confirma-botoes">
                          <button
                            className="botao-confirma-nao"
                            onClick={() => setConfirmandoChave(null)}
                            disabled={excluindoChave === a._chave}
                          >
                            {t.admin.cancelar}
                          </button>
                          <button
                            className="botao-confirma-sim"
                            onClick={() => excluirAvaliacao(a._chave)}
                            disabled={excluindoChave === a._chave}
                          >
                            {excluindoChave === a._chave ? t.admin.excluindo : t.admin.excluir}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="botao-excluir-item"
                        onClick={() => setConfirmandoChave(a._chave)}
                      >
                        <Trash2 size={13} /> {t.admin.excluir}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
