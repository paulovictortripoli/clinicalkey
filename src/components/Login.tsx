import React, { useState } from 'react';
import { sapLoginClient } from '../api/sapClient'; // Importa a função sapLoginClient
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Limpa a mensagem de erro

    try {
      const response = await sapLoginClient(cpf, password); // Chama a função de login

      if (response) { // Se a resposta não for vazia ou não houver erro
        alert('Login bem-sucedido!'); // Mensagem de sucesso
        setIsAuthenticated(true); // Atualiza o estado de autenticação
        navigate('/dashboard'); // Redireciona para a página do dashboard
      }
    } catch (error) {
      setErrorMessage(errorMessage); // Exibe a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibe mensagem de erro */}
        <button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
