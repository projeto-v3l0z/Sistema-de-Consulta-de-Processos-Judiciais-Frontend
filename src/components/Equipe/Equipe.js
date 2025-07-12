import styles from './Equipe.module.css';

const membrosEquipe = [
  {
    id: 1,
    nome: 'Carlos',
    papel: 'Team Leader',
    especialidade: '???',
    avatar: '👨‍💻'
  },
  {
    id: 2,
    nome: 'Beatriz',
    papel: 'Full Stack',
    especialidade: '???',
    avatar: '🎨'
  },
  {
    id: 3,
    nome: 'Arthur',
    papel: 'Full Stack',
    especialidade: '???',
    avatar: '🎨'
  },
  {
    id: 4,
    nome: 'Suzane',
    papel: 'Full Stack',
    especialidade: '???',
    avatar: '🎨'
  },
  {
    id: 5,
    nome: 'Lozano',
    papel: 'Desenvolvedor Backend',
    especialidade: '???',
    avatar: '🎨'
  },
  {
    id: 6,
    nome: 'Lucas',
    papel: 'Desenvolvedor Backend',
    especialidade: '???',
    avatar: '🎨'
  }
];

export default function Equipe() {
  return (
    <section className={styles.equipeSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.titulo}>Nossa Equipe</h2>
          <p className={styles.descricao}>
            Conheça os profissionais dedicados que desenvolveram este sistema
          </p>
        </div>
        
        <div className={styles.equipeGrid}>
          {membrosEquipe.map((membro) => (
            <div key={membro.id} className={styles.membroCard}>
              <div className={styles.avatar}>
                {membro.avatar}
              </div>
              <div className={styles.membroInfo}>
                <h3 className={styles.nome}>{membro.nome}</h3>
                <p className={styles.papel}>{membro.papel}</p>
                <p className={styles.especialidade}>{membro.especialidade}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
