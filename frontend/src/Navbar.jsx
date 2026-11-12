export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo"><strong>Sistema Monitoria</strong></div>
      <div className="links">
        <a href="/dashboard">Dashboard</a>
        <a href="/monitores">Monitores</a>
        <a href="/disciplina">Disciplinas</a>
        <a href="/materiais">Materiais</a>
        <a href="/duvidas">Dúvidas</a>
        <a href="/avaliacoes">Avaliações</a>
        <a href="/login" onClick={() => localStorage.clear()}>Sair</a>
      </div>
    </div>
  );
}
